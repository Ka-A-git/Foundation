import React from 'react';

import MetaMaskGradientLink from 'components/auth/MetaMaskGradientLink';
import WalletConnectGradientLink from 'components/auth/WalletConnectGradientLink';
import LoadingButtonV2 from 'components/buttons/LoadingButtonV2';
import Heading from 'components/base/Heading';
import Paragraph from 'components/base/Paragraph';
import TextLink from 'components/base/TextLink';
import Grid from 'components/base/Grid';
import Box from 'components/base/Box';
import Text from 'components/base/Text';
import Flex from 'components/base/Flex';

import { WalletConnector } from 'types/Wallet';

import { styled } from 'stitches.config';

const WALLET_LEARN_LINK =
  'https://help.foundation.app/hc/en-us/articles/4418980937627-A-complete-guide-to-setting-up-a-wallet-and-getting-ETH';

interface AuthConnectProps {
  isConnectInjectedLoading: boolean;
  isConnectWalletConnectLoading: boolean;
  isConnected: boolean;
  isSignMessageLoading: boolean;
  onConnect: (provider: WalletConnector) => void;
  isInjectedSupported: boolean;
  onSign: () => void;
  onDisconnect: () => void;
}

export default function AuthConnect(props: AuthConnectProps): JSX.Element {
  const {
    isConnectInjectedLoading,
    isConnectWalletConnectLoading,
    isConnected,
    isSignMessageLoading,
    onConnect,
    isInjectedSupported,
    onSign,
    onDisconnect,
  } = props;

  // TODO: move this into separate component
  if (isConnected) {
    return (
      <Container.Loading>
        <Heading
          size={3}
          css={{
            marginBottom: '$7',
            textAlign: 'center',
            maxWidth: 260,
          }}
        >
          Sign the message in your wallet to continue
        </Heading>
        <Grid css={{ gap: '$7', width: '100%' }}>
          <Paragraph
            css={{
              textAlign: 'center',
              maxWidth: 260,
              marginX: 'auto',
            }}
          >
            Foundation uses this signature to verify that you’re the owner of
            this Ethereum address.
          </Paragraph>
          <Grid css={{ gap: '$4' }}>
            <LoadingButtonV2
              onClick={() => onSign()}
              isError={false}
              isSuccess={false}
              isLoading={isSignMessageLoading}
              label={{
                default: 'Continue',
                loading: 'Sign message in wallet',
              }}
            />

            <TextLink onClick={() => onDisconnect()} css={{ marginX: 'auto' }}>
              Disconnect
            </TextLink>
          </Grid>
        </Grid>
      </Container.Loading>
    );
  }

  // TODO: move this into separate component
  return (
    <Container.Default>
      <Heading
        size={4}
        css={{
          marginBottom: '$4',
          textAlign: 'center',
        }}
      >
        Select a wallet
      </Heading>
      <Grid
        css={{
          gap: '$6',
          marginBottom: '$6',
          textAlign: 'center',
          '@bp0': {
            gap: '$7',
            marginBottom: '$7',
          },
        }}
      >
        <Paragraph>
          By connecting your wallet, you agree to our{` `}
          <TextLink css={{ display: 'inline' }} href="/terms">
            Terms of Service
          </TextLink>
          {` `}and our{` `}
          <TextLink css={{ display: 'inline' }} href="/privacy">
            Privacy Policy
          </TextLink>
          .
        </Paragraph>
        <Grid css={{ gap: '$3' }}>
          {isInjectedSupported && (
            <MetaMaskGradientLink
              onClick={() => onConnect(WalletConnector.Injected)}
              isLoading={isConnectInjectedLoading}
            />
          )}

          <WalletConnectGradientLink
            onClick={() => onConnect(WalletConnector.WalletConnect)}
            isLoading={isConnectWalletConnectLoading}
          />
        </Grid>
      </Grid>
      <Grid css={{ justifyContent: 'center', textAlign: 'center', gap: '$2' }}>
        <Text>New to Ethereum?</Text>
        <Text>
          <TextLink href={WALLET_LEARN_LINK}>Learn about wallets</TextLink>
        </Text>
      </Grid>
    </Container.Default>
  );
}

const Container = {
  Default: styled(Box, {
    padding: '$7',
    '@bp0': {
      padding: '$8',
    },
  }),
  Loading: styled(Flex, {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '$7',
    paddingTop: '$8',
    '@bp0': {
      paddingX: 40,
      paddingTop: '$9',
      paddingBottom: 40,
    },
  }),
};
