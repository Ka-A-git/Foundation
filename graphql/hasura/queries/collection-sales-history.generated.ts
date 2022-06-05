import * as Types from '../types-hasura.generated';

import { UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment, CollectionFragment, ArtworkFragmentExtended, ArtworkEventFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type CollectionSalesHistoryVariables = Types.Exact<{
  contractAddress: Types.Scalars['String'];
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type CollectionSalesHistory = { collectionSalesHistory: Array<(
    Pick<Types.Collection_Sales_History, 'tokenId' | 'dateSold' | 'eventType' | 'name' | 'priceLastSoldFor'>
    & { buyer?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, seller?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, artwork?: Types.Maybe<(
      Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
      & { collection?: Types.Maybe<Pick<Types.Collection, 'collectionImageUrl' | 'contractAddress' | 'slug' | 'coverImageUrl' | 'createdAt' | 'creatorAddress' | 'description' | 'id' | 'name' | 'symbol' | 'updatedAt' | 'contractType' | 'moderationStatus' | 'hiddenAt' | 'deletedAt'>>, creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, privateSales: Array<(
        Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
        & { price: Types.Private_Sale['saleAmountInETH'] }
      )> }
    )> }
  )> };


export const CollectionSalesHistoryDocument = /*#__PURE__*/ `
    query CollectionSalesHistory($contractAddress: String!, $limit: Int!, $offset: Int!) {
  collectionSalesHistory: collection_sales_history(
    where: {contractAddress: {_eq: $contractAddress}}
    order_by: {dateSold: desc}
    limit: $limit
    offset: $offset
  ) {
    tokenId
    dateSold
    eventType
    name
    priceLastSoldFor
    buyer {
      ...UserFragment
    }
    seller {
      ...UserFragment
    }
    artwork {
      ...ArtworkFragment
      collection {
        ...CollectionFragment
      }
      creator: user {
        ...UserFragment
      }
    }
  }
}
    ${UserFragment}
${ArtworkFragment}
${CollectionFragment}`;
export const useCollectionSalesHistory = <
      TData = CollectionSalesHistory,
      TError = Error
    >(
      variables: CollectionSalesHistoryVariables,
      options?: UseQueryOptions<CollectionSalesHistory, TError, TData>
    ) =>
    useQuery<CollectionSalesHistory, TError, TData>(
      ['CollectionSalesHistory', variables],
      hasuraFetcher<CollectionSalesHistory, CollectionSalesHistoryVariables>(CollectionSalesHistoryDocument, variables),
      options
    );

useCollectionSalesHistory.getKey = (variables: CollectionSalesHistoryVariables) => ['CollectionSalesHistory', variables];
;
