import { useAccount } from 'wagmi';
import { useToggle, useClickAway } from 'react-use';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { buildAvatarUrl } from 'utils/assets';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';

import Box from 'components/base/Box';
import UserDropdownButton from './UserDropdownButton';
import UserDropdownDetails from './UserDropdownDetails';

import { useUserInviteCount } from 'graphql/hasura/queries/user-invite-count.generated';
import { isAllTrue, isAnyTrue } from 'utils/helpers';
import useBalances from 'hooks/web3/use-balances';

interface UserDropdownProps {
  activityCount?: number;
  minLoggedIn?: boolean;
}

export default function UserDropdown(props: UserDropdownProps): JSX.Element {
  const { activityCount = 0, minLoggedIn = false } = props;

  const router = useRouter();
  const ref = useRef(null);
  const [isOpen, toggleNav] = useToggle(false);

  // close the nav on route change
  useEffect(() => {
    toggleNav(false);
  }, [toggleNav, router.asPath]);

  useClickAway(ref, () => {
    toggleNav(false);
  });

  const [{ data: initialUser, loading: isUserLoading }] = useAccount();
  const { data: balancesData, isLoading: isBalancesLoading } = useBalances({
    publicKey: initialUser?.address,
  });

  const publicAddress = initialUser?.address;

  const { data: userData, isLoading: isCurrentUserLoading } =
    useUserByPublicKey(
      { publicKey: publicAddress },
      { refetchOnWindowFocus: false }
    );

  const onChainOnlyUser = { publicKey: publicAddress, username: null };

  const user = userData?.user ?? onChainOnlyUser;
  const publicKey = user?.publicKey;
  const profileImageUrl = userData?.user?.profileImageUrl;
  const avatarUrl = buildAvatarUrl(90, profileImageUrl);

  const { data: userInviteData } = useUserInviteCount(
    { publicKey: publicAddress },
    { enabled: isAllTrue([publicAddress, isOpen]) }
  );

  const inviteCount = userInviteData?.inviteCount?.aggregate?.count ?? 0;

  const isLoading = isAnyTrue([isCurrentUserLoading, isUserLoading]);

  return (
    <Box ref={ref} css={{ '@bp0': { position: 'relative' } }}>
      <UserDropdownButton
        onClick={toggleNav}
        isLoading={isLoading}
        avatarUrl={avatarUrl}
        publicKey={publicKey}
      />

      {isOpen && (
        <Box>
          <UserDropdownDetails
            user={user}
            avatarUrl={avatarUrl}
            activityCount={activityCount}
            canInviteCreators={inviteCount > 0}
            publicKey={publicKey}
            minLoggedIn={minLoggedIn}
            ethBalance={balancesData?.ethBalance}
            fethBalance={balancesData?.availableFethBalance}
            balancesLoading={isBalancesLoading}
          />
        </Box>
      )}
    </Box>
  );
}
