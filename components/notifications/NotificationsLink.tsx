import { styled } from 'stitches.config';
import NextLink from 'next/link';
import { useAccount } from 'wagmi';

import Box from 'components/base/Box';
import Link from 'components/base/Link';
import Text from 'components/base/Text';

import { useUserLastReadNotificationTimestamp } from 'graphql/hasura/queries/user-last-read-notification.generated';
import useNotificationsCount from 'hooks/queries/hasura/notifications/use-notifications-count';

import LightningIcon from 'assets/icons/lightning.svg';

export default function NotificationsLink(): JSX.Element {
  const [{ data: user }] = useAccount();
  const publicKey = user?.address;

  const {
    data: lastReadNotificationTimestampData,
    isSuccess: lastReadNotificationTimestampSuccess,
  } = useUserLastReadNotificationTimestamp(
    { publicKey },
    { enabled: Boolean(publicKey) }
  );

  const lastReadTimestamp =
    lastReadNotificationTimestampData?.user?.lastReadNotificationsAt;

  const { data: notificationsCountData } = useNotificationsCount(
    { publicKey, lastReadTimestamp },
    { enabled: lastReadNotificationTimestampSuccess }
  );

  const unreadCount =
    notificationsCountData?.notificationsCount?.aggregate?.count;
  const hasUnread = unreadCount > 0;

  return (
    <Box
      css={{
        position: 'relative',
        marginLeft: hasUnread ? '$8' : '$6',
        marginRight: '$5',
      }}
    >
      <NextLink href="/notifications" passHref>
        <NotificationWrapper>
          {hasUnread && (
            <NotificationStatus
              css={{ left: unreadCount > 99 ? '-60%' : '-50%' }}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </NotificationStatus>
          )}
          <LightningIcon
            width={18}
            style={{ display: 'block' }}
            alt="notifications"
          />
        </NotificationWrapper>
      </NextLink>
    </Box>
  );
}

const NotificationWrapper = styled(Link, {
  display: 'flex',
  textDecoration: 'none',
  color: 'inherit',
  backgroundColor: '$white100',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: 44,
  height: 44,
  boxShadow: '$0',
  transition: 'transform $1 $ease, box-shadow $1 $ease',
  borderRadius: '$round',
  '@hover': {
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '$1',
    },
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '$1',
  },
});

const NotificationStatus = styled(Text, {
  display: 'flex',
  gridRow: 1,
  gridColumn: 1,
  minWidth: 32,
  height: 32,
  fontWeight: '$semibold',
  alignItems: 'center',
  justifyContent: 'center',
  paddingX: 6,
  backgroundColor: '$red100',
  borderRadius: '$round',
  color: '$white100',
  position: 'absolute',
  left: '50%',
});
