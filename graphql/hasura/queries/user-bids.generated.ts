import * as Types from '../types-hasura.generated';

import { ActivityBidFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserBidsVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
}>;


export type UserBids = { bidsPlacedOpen: Array<(
    Pick<Types.Bid, 'auctionId' | 'bidAmount' | 'bidder' | 'contractAddress' | 'createdAt' | 'datePlaced' | 'id' | 'seller' | 'status' | 'tokenId' | 'updatedAt'>
    & { auction: (
      Pick<Types.Auction, 'auctionId' | 'canceledAt' | 'createdAt' | 'endsAt' | 'finalizedAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'isPrimarySale' | 'reservePriceInETH' | 'seller' | 'startsAt' | 'status' | 'tokenId' | 'updatedAt'>
      & { highestBidderUser?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'>> }
    ), artwork?: Types.Maybe<(
      Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
      & { creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'collectionImageUrl' | 'coverImageUrl' | 'slug'>>, privateSales: Array<(
        Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
        & { price: Types.Private_Sale['saleAmountInETH'] }
      )> }
    )> }
  )>, bidsPlacedEnded: Array<(
    Pick<Types.Bid, 'auctionId' | 'bidAmount' | 'bidder' | 'contractAddress' | 'createdAt' | 'datePlaced' | 'id' | 'seller' | 'status' | 'tokenId' | 'updatedAt'>
    & { auction: (
      Pick<Types.Auction, 'auctionId' | 'canceledAt' | 'createdAt' | 'endsAt' | 'finalizedAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'isPrimarySale' | 'reservePriceInETH' | 'seller' | 'startsAt' | 'status' | 'tokenId' | 'updatedAt'>
      & { highestBidderUser?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'>> }
    ), artwork?: Types.Maybe<(
      Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
      & { creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'collectionImageUrl' | 'coverImageUrl' | 'slug'>>, privateSales: Array<(
        Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
        & { price: Types.Private_Sale['saleAmountInETH'] }
      )> }
    )> }
  )>, bidsReceived: Array<(
    Pick<Types.Bid, 'auctionId' | 'bidAmount' | 'bidder' | 'contractAddress' | 'createdAt' | 'datePlaced' | 'id' | 'seller' | 'status' | 'tokenId' | 'updatedAt'>
    & { auction: (
      Pick<Types.Auction, 'auctionId' | 'canceledAt' | 'createdAt' | 'endsAt' | 'finalizedAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'isPrimarySale' | 'reservePriceInETH' | 'seller' | 'startsAt' | 'status' | 'tokenId' | 'updatedAt'>
      & { highestBidderUser?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'>> }
    ), artwork?: Types.Maybe<(
      Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
      & { creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'collectionImageUrl' | 'coverImageUrl' | 'slug'>>, privateSales: Array<(
        Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
        & { price: Types.Private_Sale['saleAmountInETH'] }
      )> }
    )> }
  )> };


export const UserBidsDocument = /*#__PURE__*/ `
    query UserBids($publicKey: String!) {
  bidsPlacedOpen: bid(
    order_by: {datePlaced: desc}
    where: {bidder: {_eq: $publicKey}, auction: {status: {_eq: "OPEN"}}}
  ) {
    ...ActivityBidFragment
  }
  bidsPlacedEnded: bid(
    order_by: {datePlaced: desc}
    where: {status: {_eq: "HIGHEST"}, auction: {status: {_eq: "ENDED"}, highestBidder: {_eq: $publicKey}}}
  ) {
    ...ActivityBidFragment
  }
  bidsReceived: bid(
    order_by: {datePlaced: desc}
    where: {seller: {_eq: $publicKey}, auction: {status: {_in: ["OPEN", "ENDED"]}}, status: {_in: ["HIGHEST", "FINALIZED_WINNER"]}}
  ) {
    ...ActivityBidFragment
  }
}
    ${ActivityBidFragment}`;
export const useUserBids = <
      TData = UserBids,
      TError = Error
    >(
      variables: UserBidsVariables,
      options?: UseQueryOptions<UserBids, TError, TData>
    ) =>
    useQuery<UserBids, TError, TData>(
      ['UserBids', variables],
      hasuraFetcher<UserBids, UserBidsVariables>(UserBidsDocument, variables),
      options
    );

useUserBids.getKey = (variables: UserBidsVariables) => ['UserBids', variables];
;
