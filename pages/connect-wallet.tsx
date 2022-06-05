import { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

import { useRouter } from 'next/router';

import Page from 'components/Page';
import LoadingPage from 'components/LoadingPage';
import { WithLayout } from 'components/layouts/Layout';
import { isAnyTrue } from 'utils/helpers';
import AuthRequiredPage from 'components/auth/AuthRequiredPage';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import { getUsernameOrAddress } from 'utils/helpers';

export default function ConnectWalletPage(): JSX.Element {
  const router = useRouter();
  const [{ data: user, loading: isUserLoading }] = useAccount();
  const [{ loading: isConnectLoading }] = useConnect();
  const publicKey = user?.address;
  const isConnected = Boolean(publicKey);

  const { data: userData, isLoading: userLoading } = useUserByPublicKey({
    publicKey,
  });

  const isLoading = isAnyTrue([isConnectLoading, isUserLoading, userLoading]);
  const userNameOrAddress = getUsernameOrAddress(userData?.user);

  useEffect(() => {
    if (isConnected && !isLoading) {
      router.push(`/${userNameOrAddress}?tab=owned`);
    }
  }, [isConnected, userNameOrAddress, router, isLoading]);

  if (isConnected || isLoading) {
    return (
      <Page title="Connect wallet">
        <LoadingPage />
      </Page>
    );
  }

  return (
    <Page title="Connect wallet">
      <AuthRequiredPage
        heading="Start selling"
        subheading="To get started, first you need to connect your wallet."
      />
    </Page>
  );
}

ConnectWalletPage.getLayout = WithLayout({ backgroundColor: '$black5' });
