import * as Types from '../types-hasura.generated';

import { CollectionFragmentExtended, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, UserFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type CollectionByUuidVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
}>;


export type CollectionByUuid = { collections: Array<(
    Pick<Types.Collection, 'collectionImageUrl' | 'contractAddress' | 'slug' | 'coverImageUrl' | 'createdAt' | 'creatorAddress' | 'description' | 'id' | 'name' | 'symbol' | 'updatedAt' | 'contractType' | 'moderationStatus' | 'hiddenAt' | 'deletedAt'>
    & { creator: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'> }
  )> };


export const CollectionByUuidDocument = /*#__PURE__*/ `
    query CollectionByUuid($id: uuid!) {
  collections: collection(where: {id: {_eq: $id}}) {
    ...CollectionFragmentExtended
  }
}
    ${CollectionFragmentExtended}`;
export const useCollectionByUuid = <
      TData = CollectionByUuid,
      TError = Error
    >(
      variables: CollectionByUuidVariables,
      options?: UseQueryOptions<CollectionByUuid, TError, TData>
    ) =>
    useQuery<CollectionByUuid, TError, TData>(
      ['CollectionByUuid', variables],
      hasuraFetcher<CollectionByUuid, CollectionByUuidVariables>(CollectionByUuidDocument, variables),
      options
    );

useCollectionByUuid.getKey = (variables: CollectionByUuidVariables) => ['CollectionByUuid', variables];
;
