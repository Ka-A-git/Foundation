import { groupBy } from 'ramda';
import { styled } from 'stitches.config';
import { useAccount } from 'wagmi';
import format from 'date-fns/format';

import Page from 'components/Page';
import Heading from 'components/base/Heading';
import Box from 'components/base/Box';
import Text from 'components/base/Text';
import InfiniteScrollButton from 'components/feed/InfiniteScrollButton';
import NotificationFollowSkeleton from 'components/notifications/NotificationFollowSkeleton';
import GraySquare from 'components/base/GraySquare';
import NotificationFollow from 'components/notifications/NotificationFollow';
import { WithLayout } from 'components/layouts/Layout';

import { useUpdateUserLastReadNotificationAt } from 'graphql/server/mutations/update-user-last-read-notification-at.generated';
import { useUserLastReadNotificationTimestamp } from 'graphql/hasura/queries/user-last-read-notification.generated';
import useNotificationsFollows from 'hooks/queries/hasura/notifications/use-notifications-followers';
import useAuthToken from 'hooks/queries/use-auth-token';
import useModal from 'hooks/use-modal';
import useInfiniteData from 'hooks/use-infinite-data';

import { isAnyTrue } from 'utils/helpers';

import { ModalKey } from 'types/modal';

const Container = styled(Box, {
  maxWidth: 680,
  marginX: 'auto',
  paddingY: '$9',
  width: '100%',
});

const PageHeader = styled(Heading, {
  textAlign: 'center',
  marginBottom: '$7',
});

const MonthHeader = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$semibold',
  fontSize: '$2',
  textAlign: 'center',
  marginBottom: '$7',
});

const MonthWrapper = styled(Box, {
  marginBottom: '$9',
});

function SkeletonArray() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <NotificationFollowSkeleton
          key={i}
          css={{
            marginBottom: '$4',
          }}
        />
      ))}
    </>
  );
}

export default function NotificationsPage(): JSX.Element {
  const { setCurrentModal } = useModal();
  const [{ data: user }] = useAccount();
  const { data: authToken, isLoading: isAuthTokenLoading } = useAuthToken({
    onError: () => {
      setCurrentModal(ModalKey.AUTH_MAIN);
    },
  });

  const publicKey = user?.address;
  const { mutate: updateUserLastReadNotificationAt } =
    useUpdateUserLastReadNotificationAt();

  const { data: lastReadNotificationTimestampData } =
    useUserLastReadNotificationTimestamp(
      { publicKey },
      {
        enabled: Boolean(publicKey),
        onSuccess: () => {
          if (authToken) {
            updateUserLastReadNotificationAt(null);
          }
        },
      }
    );

  const lastReadNotificationTimestamp =
    lastReadNotificationTimestampData?.user?.lastReadNotificationsAt;

  const {
    data,
    fetchNextPage,
    isLoading: isNotificationsLoading,
    isFetching,
    hasNextPage,
  } = useNotificationsFollows({ publicKey });

  const followingUsers = useInfiniteData(data, 'user');

  const groupedFollowersByMonth = groupBy((user) => {
    const eventDate = new Date(`${user.updatedAt}Z`);
    return format(eventDate, 'MMMM y');
  }, followingUsers);

  const isLoading = isAnyTrue([isAuthTokenLoading, isNotificationsLoading]);

  if (isLoading) {
    return (
      <Page title="Notifications">
        <Container>
          <PageHeader size={5}>Notifications</PageHeader>
          <Box
            css={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '$7',
            }}
          >
            <GraySquare />
          </Box>
          <SkeletonArray />
        </Container>
      </Page>
    );
  }

  return (
    <Page title="Notifications">
      <Container>
        <PageHeader size={5}>Notifications</PageHeader>
        {Object.entries(groupedFollowersByMonth)?.map(([key, users]) => {
          return (
            <MonthWrapper key={key}>
              <MonthHeader>{key}</MonthHeader>
              {users.map((user) => (
                <NotificationFollow
                  key={user?.user?.publicKey}
                  followerUser={user}
                  currentUserPublicKey={publicKey}
                  lastReadNotificationTimestamp={lastReadNotificationTimestamp}
                />
              ))}
            </MonthWrapper>
          );
        })}
        <InfiniteScrollButton
          handleNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
        />
      </Container>
    </Page>
  );
}

NotificationsPage.getLayout = WithLayout({ backgroundColor: '$black5' });
