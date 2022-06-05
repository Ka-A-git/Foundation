import { useAccount, useConnect } from 'wagmi';

import HeaderComposed from 'components/headers/HeaderComposed';
import MinimalLoggedInHeader from './MinimalLoggedInHeader';

import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import useUserActivityCount from 'hooks/queries/hasura/notifications/use-user-activity-count';

import { isAllTrue, isAnyTrue } from 'utils/helpers';

import { PageColorMode, PageType } from 'types/page';

interface HeaderProps {
  mode: PageColorMode;
  headerMode: PageColorMode;
  absolute: boolean;
  type: PageType;
}

export default function Header(props: HeaderProps): JSX.Element {
  const {
    mode = PageColorMode.light,
    headerMode = PageColorMode.light,
    absolute = false,
    type,
  } = props;

  const isDark = [mode, headerMode].includes(PageColorMode.dark);

  const color = isDark ? '#fff' : '#000';

  const [{ data: user, loading: isUserLoading }] = useAccount();
  const [{ loading: isConnectLoading }] = useConnect();

  const publicAddress = user?.address;

  const { data: serverUserData } = useUserByPublicKey(
    { publicKey: publicAddress },
    { refetchOnWindowFocus: false }
  );

  const { data: activityCount, isLoading: isActivityCountLoading } =
    useUserActivityCount(
      { publicKey: publicAddress },
      { enabled: Boolean(publicAddress) }
    );

  const isApprovedCreator = serverUserData?.user?.isApprovedCreator;

  const sharedHeaderProps = {
    absolute,
    color,
    mode: headerMode,
    isDark,
  };

  const isLoading = isAnyTrue([
    isConnectLoading,
    isActivityCountLoading,
    isUserLoading,
  ]);

  // TODO: glue this into HeaderComposed
  if (type === PageType.minimalLoggedIn) {
    return (
      <MinimalLoggedInHeader
        isConnected={Boolean(publicAddress)}
        isLoading={isLoading}
        isApprovedCreator={isApprovedCreator}
        {...sharedHeaderProps}
      />
    );
  }

  return (
    <HeaderComposed
      {...sharedHeaderProps}
      isLoading={isLoading}
      isConnected={isAllTrue([serverUserData, publicAddress])}
      isApprovedCreator={isApprovedCreator}
      activityCount={activityCount}
    />
  );
}
