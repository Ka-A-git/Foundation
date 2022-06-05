import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useAccount, useConnect, useSignMessage } from 'wagmi';

import ModalContainer from 'components/modals/common/ModalContainer';
import ModalContent from 'components/modals/common/ModalContent';
import AuthConnect from 'components/auth/AuthConnect';

import useModal from 'hooks/use-modal';
import useSegment from 'hooks/analytics/use-segment';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import useConnectWalletSession from 'hooks/web3/wallet/use-connect-wallet-session';
import useAuthToken from 'hooks/queries/use-auth-token';
import useDisconnectWallet from 'hooks/web3/wallet/use-disconnect-wallet';

import { WalletConnector } from 'types/Wallet';
import { ModalKey } from 'types/modal';
import { QueryCacheKey } from 'types/Queries';

import { isAllTrue, isAnyTrue } from 'utils/helpers';

export default function AuthModal(): JSX.Element {
  const analytics = useSegment();
  const queryClient = useQueryClient();
  const [{ data: accountData }] = useAccount();
  const [{ data: connectData, loading: isConnectLoading }, connect] =
    useConnect();
  const [{ loading: isSignMessageLoading }, signMessage] = useSignMessage();

  const injectedConnector = connectData.connectors.find(
    (c) => c.name === 'MetaMask'
  );
  const walletConnectConnector = connectData.connectors.find(
    (c) => c.name === 'WalletConnect'
  );

  const isInjectedSupported = injectedConnector?.ready;

  const publicAddress = accountData?.address;
  const connector = accountData?.connector?.id;
  useEffect(() => {
    if (publicAddress) {
      analytics?.identify(publicAddress, {
        publicAddress: publicAddress,
        provider: connector,
      });
    }
  }, [publicAddress, connector, analytics]);

  useUserByPublicKey(
    { publicKey: accountData?.address },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        if (!res.user) {
          return;
        }
        // Set user information, as well as tags and further extras
        Sentry.configureScope((scope) => {
          scope.setUser({
            id: res.user.publicKey,
            username: res.user.username,
          });
        });
      },
    }
  );

  const { resetModal } = useModal();

  const {
    mutateAsync: connectWalletSession,
    isLoading: isConnectSessionLoading,
  } = useConnectWalletSession({
    onSuccess: (data) => {
      // After the user connects and signs for the first time we store the token data in the cache
      queryClient.setQueryData(QueryCacheKey.AuthToken, data.token);
    },
  });

  // On fresh page load fetch the token cookie and store in cache
  useAuthToken();

  const { mutateAsync: disconnectWallet } = useDisconnectWallet();

  const handleConnect = async (connectorType: WalletConnector) => {
    try {
      if (connectorType === WalletConnector.Injected) {
        await connect(injectedConnector);
      }

      if (connectorType === WalletConnector.WalletConnect) {
        await connect(walletConnectConnector);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignMessage = async () => {
    try {
      const message = `Please sign this message to connect to Foundation.`;
      const signature = await signMessage({ message });

      // If there is no signature because of rejecting sign return early
      if (!signature.data) {
        return;
      }

      // Order of args must be {message}.{signature}
      const token = `${btoa(message)}.${signature.data}`;

      const connector = accountData.connector;
      await connectWalletSession({ token, connector });
      resetModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisconnect = async () => {
    resetModal();
    await disconnectWallet();
  };

  const selectedWalletType = connectData?.connector?.id;

  const isConnectInjectedLoading = isAllTrue([
    selectedWalletType === 'injected',
    isConnectLoading,
  ]);
  const isConnectWalletConnectLoading = isAllTrue([
    selectedWalletType === 'walletConnect',
    isConnectLoading,
  ]);

  const isSigningMessageLoading = isAnyTrue([
    isSignMessageLoading,
    isConnectSessionLoading,
  ]);

  return (
    <ModalContainer modalKey={ModalKey.AUTH_MAIN}>
      <ModalContent
        css={{
          maxWidth: 440,
          padding: 0,
          '@bp0': {
            borderRadius: 24,
          },
        }}
      >
        <AuthConnect
          isConnectInjectedLoading={isConnectInjectedLoading}
          isConnectWalletConnectLoading={isConnectWalletConnectLoading}
          isConnected={Boolean(accountData)}
          isSignMessageLoading={isSigningMessageLoading}
          onConnect={handleConnect}
          isInjectedSupported={isInjectedSupported}
          onSign={handleSignMessage}
          onDisconnect={handleDisconnect}
        />
      </ModalContent>
    </ModalContainer>
  );
}
