import { config } from 'stitches.config';

import { useMedia } from 'react-use';

import useDisconnectWallet from 'hooks/web3/wallet/use-disconnect-wallet';

import LogOutIcon from 'assets/icons/log-out-icon.svg';
import SupportIcon from 'assets/icons/support-icon.svg';
import BidsIcon from 'assets/icons/bids-icon.svg';
import SettingsIcon from 'assets/icons/settings-icon.svg';
import InviteIcon from 'assets/icons/invite-icon.svg';

import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import ViewBalances from './ViewBalances';
import ViewProfileLink from './ViewProfileLink';
import UserDropdownLink from './UserDropdownLink';

import Account from 'types/Account';

interface UserDropdownDetailsProps {
  user: Pick<Account, 'publicKey' | 'username'>;
  avatarUrl?: string;
  activityCount: number;
  canInviteCreators: boolean;
  publicKey: string;
  minLoggedIn: boolean;
  ethBalance: number;
  fethBalance: number;
  balancesLoading: boolean;
}

export default function UserDropdownDetails(
  props: UserDropdownDetailsProps
): JSX.Element {
  const {
    user,
    avatarUrl,
    canInviteCreators = true,
    activityCount,
    publicKey,
    minLoggedIn,
    ethBalance,
    fethBalance,
    balancesLoading,
  } = props;

  const isMobile = !useMedia(config.media.bp1);

  const { mutate: disconnectWallet } = useDisconnectWallet();

  return (
    <Box
      css={{
        minWidth: 'calc(100vw - 48px)',
        boxShadow: '$2',
        position: 'absolute',
        top: 'calc(100% + 10px)',
        zIndex: 9999,
        background: '$white100',
        borderRadius: '$2',
        right: minLoggedIn ? 0 : 'unset',
        left: minLoggedIn ? 'unset' : '50%',
        transform: minLoggedIn ? 'unset' : 'translateX(-50%)',
        padding: '$3',
        '@bp0': {
          minWidth: 300,
        },
      }}
    >
      <ViewProfileLink user={user} avatarUrl={avatarUrl} />

      <ViewBalances
        publicKey={publicKey}
        ethBalance={ethBalance}
        fethBalance={fethBalance}
        balancesLoading={balancesLoading}
      />

      {isMobile && (
        <UserDropdownLink
          href="/activity"
          icon={<BidsIcon width={22} height={14} />}
        >
          <Flex css={{ alignItems: 'center', flex: 1 }}>
            <Flex css={{ flex: 0 }}>Activity</Flex>
            {activityCount > 0 && (
              <Box
                css={{
                  marginLeft: '$3',
                  width: 8,
                  height: 8,
                  backgroundColor: '$red100',
                  borderRadius: '$round',
                }}
              />
            )}
          </Flex>
        </UserDropdownLink>
      )}
      {canInviteCreators && (
        <UserDropdownLink
          href="/invite"
          icon={<InviteIcon width={20} height={21} sx={{ display: 'block' }} />}
        >
          Invite a Creator
        </UserDropdownLink>
      )}
      <UserDropdownLink
        href="/settings"
        icon={
          <SettingsIcon width={24} height={29} style={{ display: 'block' }} />
        }
      >
        Settings
      </UserDropdownLink>
      <UserDropdownLink
        href="https://help.foundation.app"
        icon={
          <SupportIcon width={24} height={29} style={{ display: 'block' }} />
        }
      >
        Help
      </UserDropdownLink>
      <UserDropdownLink
        onClick={disconnectWallet}
        icon={
          <LogOutIcon width={24} height={24} style={{ display: 'block' }} />
        }
      >
        Disconnect
      </UserDropdownLink>
    </Box>
  );
}
