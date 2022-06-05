import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserCountVariables = Types.Exact<{ [key: string]: never; }>;


export type UserCount = { userCount: { aggregate?: Types.Maybe<Pick<Types.User_Aggregate_Fields, 'count'>> } };


export const UserCountDocument = /*#__PURE__*/ `
    query UserCount {
  userCount: user_aggregate(where: {isIndexed: {_eq: true}}) {
    aggregate {
      count
    }
  }
}
    `;
export const useUserCount = <
      TData = UserCount,
      TError = Error
    >(
      variables?: UserCountVariables,
      options?: UseQueryOptions<UserCount, TError, TData>
    ) =>
    useQuery<UserCount, TError, TData>(
      variables === undefined ? ['UserCount'] : ['UserCount', variables],
      hasuraFetcher<UserCount, UserCountVariables>(UserCountDocument, variables),
      options
    );

useUserCount.getKey = (variables?: UserCountVariables) => variables === undefined ? ['UserCount'] : ['UserCount', variables];
;
