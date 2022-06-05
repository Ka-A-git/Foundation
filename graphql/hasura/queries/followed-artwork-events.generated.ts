import * as Types from '../types-hasura.generated';

import { ArtworkFragmentExtended, ArtworkEventFragment, UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type FollowedArtworkEventsVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  eventsSince: Types.Scalars['timestamp'];
  offset: Types.Scalars['Int'];
  limit: Types.Scalars['Int'];
}>;


export type FollowedArtworkEvents = { events: Array<(
    Pick<Types.Event, 'publicKey' | 'eventType' | 'data' | 'tokenId' | 'tokenCreator' | 'blockTimestamp'>
    & { user: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>, artwork?: Types.Maybe<(
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


export const FollowedArtworkEventsDocument = /*#__PURE__*/ `
    query FollowedArtworkEvents($publicKey: String!, $eventsSince: timestamp!, $offset: Int!, $limit: Int!) {
  events: event(
    where: {blockTimestamp: {_gt: $eventsSince}, follower: {user: {_eq: $publicKey}, isFollowing: {_eq: true}}, artwork: {isIndexed: {_eq: true}}, eventType: {_in: ["MINT", "LIST", "PRICE_CHANGE", "BID", "BUY_NOW_PRICE_SET", "BUY_NOW_PRICE_CHANGE", "BUY_NOW_PRICE_CANCEL", "BUY_NOW_PRICE_ACCEPT", "OFFER_CREATE", "OFFER_ACCEPT"]}}
    order_by: {blockTimestamp: desc}
    limit: $limit
    offset: $offset
  ) {
    publicKey
    eventType
    data
    tokenId
    tokenCreator
    blockTimestamp
    user {
      userIndex
      publicKey
      username
      profileImageUrl
      coverImageUrl
      name
      bio
      isApprovedCreator
      moderationStatus
      joinedWaitlistAt
      createdAt
      isApprovedForMigrationAt
      isAdmin
      links
    }
    artwork {
      ...ArtworkFragmentExtended
    }
  }
}
    ${ArtworkFragmentExtended}`;
export const useFollowedArtworkEvents = <
      TData = FollowedArtworkEvents,
      TError = Error
    >(
      variables: FollowedArtworkEventsVariables,
      options?: UseQueryOptions<FollowedArtworkEvents, TError, TData>
    ) =>
    useQuery<FollowedArtworkEvents, TError, TData>(
      ['FollowedArtworkEvents', variables],
      hasuraFetcher<FollowedArtworkEvents, FollowedArtworkEventsVariables>(FollowedArtworkEventsDocument, variables),
      options
    );

useFollowedArtworkEvents.getKey = (variables: FollowedArtworkEventsVariables) => ['FollowedArtworkEvents', variables];
;
