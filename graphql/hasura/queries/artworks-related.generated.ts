import * as Types from '../types-hasura.generated';

import { ArtworkFragmentExtended, ArtworkEventFragment, UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type ArtworksRelatedVariables = Types.Exact<{
  contractSlug: Types.Scalars['citext'];
  tokenId: Types.Scalars['Int'];
  publicKey: Types.Scalars['String'];
}>;


export type ArtworksRelated = { artworkUser?: Types.Maybe<(
    Pick<Types.User, 'bio'>
    & { relatedArtworks: Array<(
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
    )>, artworksCount: { aggregate?: Types.Maybe<Pick<Types.Artwork_Aggregate_Fields, 'count'>> } }
  )> };


export const ArtworksRelatedDocument = /*#__PURE__*/ `
    query ArtworksRelated($contractSlug: citext!, $tokenId: Int!, $publicKey: String!) {
  artworkUser: user_by_pk(publicKey: $publicKey) {
    bio
    relatedArtworks: artworks(
      where: {tokenId: {_neq: $tokenId}, isIndexed: {_eq: true}, collection: {slug: {_eq: $contractSlug}}, status: {_eq: "MINTED"}}
      limit: 3
      order_by: {tokenId: desc_nulls_last}
    ) {
      ...ArtworkFragmentExtended
    }
    artworksCount: artworks_aggregate(
      where: {isIndexed: {_eq: true}, status: {_eq: "MINTED"}, collection: {slug: {_eq: $contractSlug}}}
    ) {
      aggregate {
        count
      }
    }
  }
}
    ${ArtworkFragmentExtended}`;
export const useArtworksRelated = <
      TData = ArtworksRelated,
      TError = Error
    >(
      variables: ArtworksRelatedVariables,
      options?: UseQueryOptions<ArtworksRelated, TError, TData>
    ) =>
    useQuery<ArtworksRelated, TError, TData>(
      ['ArtworksRelated', variables],
      hasuraFetcher<ArtworksRelated, ArtworksRelatedVariables>(ArtworksRelatedDocument, variables),
      options
    );

useArtworksRelated.getKey = (variables: ArtworksRelatedVariables) => ['ArtworksRelated', variables];
;
