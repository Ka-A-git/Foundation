import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserAvailableCollectionsVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
}>;


export type UserAvailableCollections = { collections: Array<(
    Pick<Types.Collection, 'id' | 'name' | 'symbol' | 'contractAddress' | 'collectionImageUrl'>
    & { artworkCount: { aggregate?: Types.Maybe<Pick<Types.Artwork_Aggregate_Fields, 'count'>> } }
  )> };


export const UserAvailableCollectionsDocument = /*#__PURE__*/ `
    query UserAvailableCollections($publicKey: String!) {
  collections: collection(
    where: {user: {publicKey: {_eq: $publicKey}}, deletedAt: {_is_null: true}, hiddenAt: {_is_null: true}}
    order_by: {createdAt: desc}
  ) {
    id
    name
    symbol
    contractAddress
    collectionImageUrl
    artworkCount: artworks_aggregate(
      where: {isIndexed: {_eq: true}, status: {_eq: "MINTED"}}
    ) {
      aggregate {
        count
      }
    }
  }
}
    `;
export const useUserAvailableCollections = <
      TData = UserAvailableCollections,
      TError = Error
    >(
      variables: UserAvailableCollectionsVariables,
      options?: UseQueryOptions<UserAvailableCollections, TError, TData>
    ) =>
    useQuery<UserAvailableCollections, TError, TData>(
      ['UserAvailableCollections', variables],
      hasuraFetcher<UserAvailableCollections, UserAvailableCollectionsVariables>(UserAvailableCollectionsDocument, variables),
      options
    );

useUserAvailableCollections.getKey = (variables: UserAvailableCollectionsVariables) => ['UserAvailableCollections', variables];
;
