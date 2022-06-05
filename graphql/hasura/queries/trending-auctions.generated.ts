import * as Types from '../types-hasura.generated';

import { ArtworkFragmentExtended, ArtworkEventFragment, UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type TrendingAuctionsVariables = Types.Exact<{
  limit: Types.Scalars['Int'];
}>;


export type TrendingAuctions = { auctions: Array<(
    Pick<Types.Auction, 'id' | 'auctionId' | 'highestBidder' | 'endsAt'>
    & { bidCount: { aggregate?: Types.Maybe<Pick<Types.Bid_Aggregate_Fields, 'count'>> }, bidVolumeInETH: { aggregate?: Types.Maybe<{ sum?: Types.Maybe<Pick<Types.Bid_Sum_Fields, 'bidAmount'>> }> }, artwork?: Types.Maybe<(
      Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
      & { owner?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'symbol' | 'contractAddress' | 'slug' | 'name' | 'collectionImageUrl' | 'coverImageUrl' | 'contractType' | 'moderationStatus'>>, privateSales: Array<(
        Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
        & { price: Types.Private_Sale['saleAmountInETH'] }
      )>, latestEvents: Array<Pick<Types.Event, 'id' | 'eventType' | 'data'>>, splitRecipients: { aggregate?: Types.Maybe<Pick<Types.Split_Recipient_Aggregate_Fields, 'count'>> }, auctions: Array<(
        Pick<Types.Auction, 'auctionId' | 'canceledAt' | 'createdAt' | 'endsAt' | 'finalizedAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'isPrimarySale' | 'reservePriceInETH' | 'seller' | 'startsAt' | 'status' | 'tokenId' | 'updatedAt'>
        & { highestBidderUser?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'>> }
      )>, offers: Array<(
        Pick<Types.Offer, 'id' | 'status' | 'amountInETH' | 'acceptedAt' | 'expiresAt' | 'seller' | 'buyer'>
        & { userBuyer: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'> }
      )>, buyNows: Array<Pick<Types.Buy_Now, 'id' | 'status' | 'amountInETH' | 'acceptedAt' | 'seller' | 'buyer'>>, mostRecentPrivateSales: Array<Pick<Types.Private_Sale, 'id' | 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'saleAmountInETH' | 'seller' | 'buyer'>> }
    )> }
  )> };


export const TrendingAuctionsDocument = /*#__PURE__*/ `
    query TrendingAuctions($limit: Int!) {
  auctions: auction(
    where: {status: {_in: ["OPEN"]}, artwork: {isIndexed: {_eq: true}, hiddenAt: {_is_null: true}}, highestBidder: {_is_null: false}}
    order_by: {highestBidAmount: desc}
    limit: $limit
  ) {
    id
    auctionId
    highestBidder
    endsAt
    bidCount: bids_aggregate {
      aggregate {
        count
      }
    }
    bidVolumeInETH: bids_aggregate {
      aggregate {
        sum {
          bidAmount
        }
      }
    }
    artwork {
      ...ArtworkFragmentExtended
    }
  }
}
    ${ArtworkFragmentExtended}`;
export const useTrendingAuctions = <
      TData = TrendingAuctions,
      TError = Error
    >(
      variables: TrendingAuctionsVariables,
      options?: UseQueryOptions<TrendingAuctions, TError, TData>
    ) =>
    useQuery<TrendingAuctions, TError, TData>(
      ['TrendingAuctions', variables],
      hasuraFetcher<TrendingAuctions, TrendingAuctionsVariables>(TrendingAuctionsDocument, variables),
      options
    );

useTrendingAuctions.getKey = (variables: TrendingAuctionsVariables) => ['TrendingAuctions', variables];
;
