import * as Types from '../types-hasura.generated';

import { CollectionFragmentExtended, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, UserFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserCollectionsVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  indexedStates: Array<Types.Scalars['Boolean']> | Types.Scalars['Boolean'];
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type UserCollections = { collections: Array<(
    Pick<Types.Collection, 'collectionImageUrl' | 'contractAddress' | 'slug' | 'coverImageUrl' | 'createdAt' | 'creatorAddress' | 'description' | 'id' | 'name' | 'symbol' | 'updatedAt' | 'contractType' | 'moderationStatus' | 'hiddenAt' | 'deletedAt'>
    & { creator: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'> }
  )> };


export const UserCollectionsDocument = /*#__PURE__*/ `
    query UserCollections($publicKey: String!, $indexedStates: [Boolean!]!, $limit: Int!, $offset: Int!) {
  collections: collection(
    where: {user: {publicKey: {_eq: $publicKey}}, contractType: {_nin: [SHARED, FND]}, isIndexed: {_in: $indexedStates}, hiddenAt: {_is_null: true}, deletedAt: {_is_null: true}}
    order_by: {createdAt: desc}
    limit: $limit
    offset: $offset
  ) {
    ...CollectionFragmentExtended
  }
}
    ${CollectionFragmentExtended}`;
export const useUserCollections = <
      TData = UserCollections,
      TError = Error
    >(
      variables: UserCollectionsVariables,
      options?: UseQueryOptions<UserCollections, TError, TData>
    ) =>
    useQuery<UserCollections, TError, TData>(
      ['UserCollections', variables],
      hasuraFetcher<UserCollections, UserCollectionsVariables>(UserCollectionsDocument, variables),
      options
    );

useUserCollections.getKey = (variables: UserCollectionsVariables) => ['UserCollections', variables];
;
