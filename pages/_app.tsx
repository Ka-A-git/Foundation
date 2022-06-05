import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { WagmiProvider } from 'wagmi';

import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import type { AppProps } from 'next/app';

import 'minireset.css/minireset.css';

import 'assets/css/fonts.css';
import 'assets/css/global.css';
import 'assets/css/progress.css';
import 'assets/css/tooltip.css';
import 'react-toggle/style.css';
import 'assets/css/toggle.css';

import { connectors, getProvider } from 'lib/connectors';
import { queryClient } from 'lib/reactQueryClient';
import useSegment from 'hooks/analytics/use-segment';

import MarketApprovalModal from 'components/modals/MarketApprovalModal';
import AuthModal from 'components/modals/auth/AuthModal';

import ProgressBar from 'components/TopProgressBar';

import { globalStyles } from 'utils/styles';

type AppPropsComponent = AppProps['Component'];

type ComponentExtension = {
  getLayout: (page: ReactNode, props: unknown) => ReactNode;
};

type CustomComponent = ComponentExtension & AppPropsComponent;

type CustomAppProps = {
  err: unknown;
  Component: CustomComponent;
  pageProps: AppProps['pageProps'];
};

export default function App({
  Component,
  pageProps,
  err,
}: CustomAppProps): JSX.Element {
  // https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  globalStyles();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider
          autoConnect
          connectorStorageKey="fnd.wallet"
          connectors={connectors}
          provider={getProvider}
        >
          <ProgressBar />
          <PageAnalytics />
          <>
            <MarketApprovalModal />
            <AuthModal />
            <div id="portal" />
            {getLayout(<Component {...pageProps} err={err} />, pageProps)}
          </>
        </WagmiProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

function PageAnalytics() {
  const router = useRouter();
  const analytics = useSegment();

  useEffect(
    () => {
      analytics?.page(null, router.pathname, router.query);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.pathname]
  );

  return null;
}
