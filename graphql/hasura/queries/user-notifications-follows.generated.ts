import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserNotificationsFollowsVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  offset: Types.Scalars['Int'];
  limit: Types.Scalars['Int'];
}>;


export type UserNotificationsFollows = { follow: Array<(
    Pick<Types.Follow, 'updatedAt'>
    & { user: (
      Pick<Types.User, 'name' | 'username' | 'profileImageUrl' | 'userIndex' | 'publicKey'>
      & { follows: Array<Pick<Types.Follow, 'isFollowing'>> }
    ) }
  )> };


export const UserNotificationsFollowsDocument = /*#__PURE__*/ `
    query UserNotificationsFollows($publicKey: String!, $offset: Int!, $limit: Int!) {
  follow(
    where: {followedUser: {_eq: $publicKey}, isFollowing: {_eq: true}}
    order_by: {updatedAt: desc}
    limit: $limit
    offset: $offset
  ) {
    user: userByFollowingUser {
      name
      username
      profileImageUrl
      userIndex
      publicKey
      follows(where: {user: {_eq: $publicKey}, isFollowing: {_eq: true}}) {
        isFollowing
      }
    }
    updatedAt
  }
}
    `;
export const useUserNotificationsFollows = <
      TData = UserNotificationsFollows,
      TError = Error
    >(
      variables: UserNotificationsFollowsVariables,
      options?: UseQueryOptions<UserNotificationsFollows, TError, TData>
    ) =>
    useQuery<UserNotificationsFollows, TError, TData>(
      ['UserNotificationsFollows', variables],
      hasuraFetcher<UserNotificationsFollows, UserNotificationsFollowsVariables>(UserNotificationsFollowsDocument, variables),
      options
    );

useUserNotificationsFollows.getKey = (variables: UserNotificationsFollowsVariables) => ['UserNotificationsFollows', variables];
;
