import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserLastReadNotificationTimestampVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
}>;


export type UserLastReadNotificationTimestamp = { user?: Types.Maybe<Pick<Types.User, 'lastReadNotificationsAt'>> };


export const UserLastReadNotificationTimestampDocument = /*#__PURE__*/ `
    query UserLastReadNotificationTimestamp($publicKey: String!) {
  user: user_by_pk(publicKey: $publicKey) {
    lastReadNotificationsAt
  }
}
    `;
export const useUserLastReadNotificationTimestamp = <
      TData = UserLastReadNotificationTimestamp,
      TError = Error
    >(
      variables: UserLastReadNotificationTimestampVariables,
      options?: UseQueryOptions<UserLastReadNotificationTimestamp, TError, TData>
    ) =>
    useQuery<UserLastReadNotificationTimestamp, TError, TData>(
      ['UserLastReadNotificationTimestamp', variables],
      hasuraFetcher<UserLastReadNotificationTimestamp, UserLastReadNotificationTimestampVariables>(UserLastReadNotificationTimestampDocument, variables),
      options
    );

useUserLastReadNotificationTimestamp.getKey = (variables: UserLastReadNotificationTimestampVariables) => ['UserLastReadNotificationTimestamp', variables];
;
