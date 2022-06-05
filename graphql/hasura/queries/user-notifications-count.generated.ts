import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserNotificationsCountVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  lastReadTimestamp?: Types.InputMaybe<Types.Scalars['timestamp']>;
}>;


export type UserNotificationsCount = { notificationsCount: { aggregate?: Types.Maybe<Pick<Types.Follow_Aggregate_Fields, 'count'>> } };


export const UserNotificationsCountDocument = /*#__PURE__*/ `
    query UserNotificationsCount($publicKey: String!, $lastReadTimestamp: timestamp) {
  notificationsCount: follow_aggregate(
    where: {followedUser: {_eq: $publicKey}, updatedAt: {_gte: $lastReadTimestamp}, isFollowing: {_eq: true}}
  ) {
    aggregate {
      count
    }
  }
}
    `;
export const useUserNotificationsCount = <
      TData = UserNotificationsCount,
      TError = Error
    >(
      variables: UserNotificationsCountVariables,
      options?: UseQueryOptions<UserNotificationsCount, TError, TData>
    ) =>
    useQuery<UserNotificationsCount, TError, TData>(
      ['UserNotificationsCount', variables],
      hasuraFetcher<UserNotificationsCount, UserNotificationsCountVariables>(UserNotificationsCountDocument, variables),
      options
    );

useUserNotificationsCount.getKey = (variables: UserNotificationsCountVariables) => ['UserNotificationsCount', variables];
;
