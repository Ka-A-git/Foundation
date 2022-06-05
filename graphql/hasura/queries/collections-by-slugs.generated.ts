import * as Types from '../types-hasura.generated';

import { CollectionFragmentExtended, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, UserFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type CollectionsBySlugsVariables = Types.Exact<{
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
  slugs: Array<Types.Scalars['citext']> | Types.Scalars['citext'];
}>;


export type CollectionsBySlugs = { collections: Array<(
    Pick<Types.Collection, 'collectionImageUrl' | 'contractAddress' | 'slug' | 'coverImageUrl' | 'createdAt' | 'creatorAddress' | 'description' | 'id' | 'name' | 'symbol' | 'updatedAt' | 'contractType' | 'moderationStatus' | 'hiddenAt' | 'deletedAt'>
    & { artworks: Array<(
      Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
      & { privateSales: Array<(
        Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
        & { price: Types.Private_Sale['saleAmountInETH'] }
      )> }
    )>, artworks_aggregate: { aggregate?: Types.Maybe<Pick<Types.Artwork_Aggregate_Fields, 'count'>> }, creator: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'> }
  )> };


export const CollectionsBySlugsDocument = /*#__PURE__*/ `
    query CollectionsBySlugs($limit: Int!, $offset: Int!, $slugs: [citext!]!) {
  collections: collection(
    limit: $limit
    offset: $offset
    where: {slug: {_in: $slugs}}
  ) {
    ...CollectionFragmentExtended
    artworks: artworks(
      limit: 3
      offset: 0
      where: {isIndexed: {_eq: true}, status: {_eq: "MINTED"}}
      order_by: {tokenId: desc_nulls_last}
    ) {
      ...ArtworkFragment
    }
    artworks_aggregate {
      aggregate {
        count
      }
    }
  }
}
    ${CollectionFragmentExtended}
${ArtworkFragment}`;
export const useCollectionsBySlugs = <
      TData = CollectionsBySlugs,
      TError = Error
    >(
      variables: CollectionsBySlugsVariables,
      options?: UseQueryOptions<CollectionsBySlugs, TError, TData>
    ) =>
    useQuery<CollectionsBySlugs, TError, TData>(
      ['CollectionsBySlugs', variables],
      hasuraFetcher<CollectionsBySlugs, CollectionsBySlugsVariables>(CollectionsBySlugsDocument, variables),
      options
    );

useCollectionsBySlugs.getKey = (variables: CollectionsBySlugsVariables) => ['CollectionsBySlugs', variables];
;
