import { theme } from 'stitches.config';
import { any } from 'ramda';
import { useAccount } from 'wagmi';

import useBodyColor from 'hooks/use-body-color';

import InstagramContainer from 'components/verify/instagram/InstagramContainer';
import WalletAuthBlock from 'components/auth/WalletAuthBlock';
import LoadingPage from 'components/LoadingPage';
import Page from 'components/Page';

import { PageColorMode } from 'types/page';

export default function Instagram(): JSX.Element {
  const [{ data: user, loading: isUserLoading }] = useAccount();
  useBodyColor(theme.colors.black5.value);

  const loadingStates = [isUserLoading];

  const isLoading = any(Boolean, loadingStates);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <WalletAuthBlock />;
  }

  return (
    <Page
      title="Verify Instagram"
      mode={PageColorMode.light}
      footerCss={{ display: 'none' }}
    >
      <InstagramContainer />
    </Page>
  );
}
