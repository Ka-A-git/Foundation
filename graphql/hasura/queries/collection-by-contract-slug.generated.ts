import * as Types from '../types-hasura.generated';

import { CollectionFragmentExtended, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, UserFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type CollectionByContractSlugVariables = Types.Exact<{
  contractSlug: Types.Scalars['citext'];
  indexedStates: Array<Types.Scalars['Boolean']> | Types.Scalars['Boolean'];
}>;


export type CollectionByContractSlug = { collections: Array<(
    Pick<Types.Collection, 'collectionImageUrl' | 'contractAddress' | 'slug' | 'coverImageUrl' | 'createdAt' | 'creatorAddress' | 'description' | 'id' | 'name' | 'symbol' | 'updatedAt' | 'contractType' | 'moderationStatus' | 'hiddenAt' | 'deletedAt'>
    & { creator: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'> }
  )> };


export const CollectionByContractSlugDocument = /*#__PURE__*/ `
    query CollectionByContractSlug($contractSlug: citext!, $indexedStates: [Boolean!]!) {
  collections: collection(
    where: {slug: {_eq: $contractSlug}, isIndexed: {_in: $indexedStates}}
  ) {
    ...CollectionFragmentExtended
  }
}
    ${CollectionFragmentExtended}`;
export const useCollectionByContractSlug = <
      TData = CollectionByContractSlug,
      TError = Error
    >(
      variables: CollectionByContractSlugVariables,
      options?: UseQueryOptions<CollectionByContractSlug, TError, TData>
    ) =>
    useQuery<CollectionByContractSlug, TError, TData>(
      ['CollectionByContractSlug', variables],
      hasuraFetcher<CollectionByContractSlug, CollectionByContractSlugVariables>(CollectionByContractSlugDocument, variables),
      options
    );

useCollectionByContractSlug.getKey = (variables: CollectionByContractSlugVariables) => ['CollectionByContractSlug', variables];
;
