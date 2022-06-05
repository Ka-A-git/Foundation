import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

import { getNotificationsFollows } from 'queries/hasura/notifications';
import { getNextPageParam } from 'utils/artwork/artwork';

import { isAllTrue } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

import { OmitPagination } from 'types/utils';

import {
  UserNotificationsFollows,
  UserNotificationsFollowsVariables,
} from 'graphql/hasura/queries/user-notifications-follows.generated';

export default function useNotificationsFollows(
  variables: OmitPagination<UserNotificationsFollowsVariables>,
  options?: UseInfiniteQueryOptions<
    UserNotificationsFollows,
    Error,
    UserNotificationsFollows['follow']
  >
) {
  return useInfiniteQuery(
    useNotificationsFollows.getKey(variables),
    ({ pageParam = 0 }) =>
      getNotificationsFollows({
        publicKey: variables.publicKey,
        limit: 20,
        offset: 20 * pageParam,
      }),
    {
      ...options,
      refetchOnWindowFocus: false,
      getNextPageParam: getNextPageParam,
      enabled: isAllTrue([variables.publicKey, isQueryEnabled(options)]),
    }
  );
}

useNotificationsFollows.getKey = (
  variables: OmitPagination<UserNotificationsFollowsVariables>
) => ['UserNotificationsFollows', variables];
