import LogoLink from 'components/links/LogoLink';
import UserDropdown from 'components/headers/UserDropdown';
import HeaderContainer from 'components/headers/HeaderContainer';
import LoadingHeader from 'components/headers/LoadingHeader';
import Box from 'components/base/Box';
import InnerHeaderContainer from './InnerHeaderContainer';
import ConnectWalletButton from './ConnectWalletButton';

import { SharedHeaderProps } from 'components/headers/types';

interface MinimalLoggedInHeaderProps extends SharedHeaderProps {
  isApprovedCreator: boolean;
  isLoading: boolean;
  isConnected: boolean;
  isDark?: boolean;
}

export default function MinimalLoggedInHeader(
  props: MinimalLoggedInHeaderProps
): JSX.Element {
  const { color, absolute, isLoading, isConnected, isDark } = props;

  return (
    <Box css={{ position: 'relative' }}>
      <HeaderContainer absolute={absolute}>
        <InnerHeaderContainer className="header-inner">
          <LogoLink color={color} />
          {isLoading ? (
            <LoadingHeader />
          ) : isConnected ? (
            <UserDropdown minLoggedIn />
          ) : (
            <ConnectWalletButton isDark={isDark} />
          )}
        </InnerHeaderContainer>
      </HeaderContainer>
    </Box>
  );
}
