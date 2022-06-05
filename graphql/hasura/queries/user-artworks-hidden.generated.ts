import * as Types from '../types-hasura.generated';

import { ArtworkFragmentExtended, ArtworkEventFragment, UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserArtworksHiddenVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  indexedStates: Array<Types.Scalars['Boolean']> | Types.Scalars['Boolean'];
}>;


export type UserArtworksHidden = { artworks: Array<(
    Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
    & { artworkUserVisibilities: Array<Pick<Types.Artwork_User_Visibility, 'hiddenAt'>>, owner?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'symbol' | 'contractAddress' | 'slug' | 'name' | 'collectionImageUrl' | 'coverImageUrl' | 'contractType' | 'moderationStatus'>>, privateSales: Array<(
      Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
      & { price: Types.Private_Sale['saleAmountInETH'] }
    )>, latestEvents: Array<Pick<Types.Event, 'id' | 'eventType' | 'data'>>, splitRecipients: { aggregate?: Types.Maybe<Pick<Types.Split_Recipient_Aggregate_Fields, 'count'>> }, auctions: Array<(
      Pick<Types.Auction, 'auctionId' | 'canceledAt' | 'createdAt' | 'endsAt' | 'finalizedAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'isPrimarySale' | 'reservePriceInETH' | 'seller' | 'startsAt' | 'status' | 'tokenId' | 'updatedAt'>
      & { highestBidderUser?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'>> }
    )>, offers: Array<(
      Pick<Types.Offer, 'id' | 'status' | 'amountInETH' | 'acceptedAt' | 'expiresAt' | 'seller' | 'buyer'>
      & { userBuyer: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'> }
    )>, buyNows: Array<Pick<Types.Buy_Now, 'id' | 'status' | 'amountInETH' | 'acceptedAt' | 'seller' | 'buyer'>>, mostRecentPrivateSales: Array<Pick<Types.Private_Sale, 'id' | 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'saleAmountInETH' | 'seller' | 'buyer'>> }
  )> };


export const UserArtworksHiddenDocument = /*#__PURE__*/ `
    query UserArtworksHidden($publicKey: String!, $limit: Int, $offset: Int, $indexedStates: [Boolean!]!) {
  artworks: artwork(
    where: {_or: [{ownerPublicKey: {_eq: $publicKey}}, {splitRecipients: {user: {publicKey: {_eq: $publicKey}}}}], isIndexed: {_in: $indexedStates}, tokenId: {_is_null: false}, deletedAt: {_is_null: true}, artworkUserVisibilities: {hiddenAt: {_is_null: false}, publicKey: {_eq: $publicKey}}}
    limit: $limit
    offset: $offset
  ) {
    ...ArtworkFragmentExtended
    artworkUserVisibilities(
      where: {publicKey: {_eq: $publicKey}, hiddenAt: {_is_null: false}}
    ) {
      hiddenAt
    }
  }
}
    ${ArtworkFragmentExtended}`;
export const useUserArtworksHidden = <
      TData = UserArtworksHidden,
      TError = Error
    >(
      variables: UserArtworksHiddenVariables,
      options?: UseQueryOptions<UserArtworksHidden, TError, TData>
    ) =>
    useQuery<UserArtworksHidden, TError, TData>(
      ['UserArtworksHidden', variables],
      hasuraFetcher<UserArtworksHidden, UserArtworksHiddenVariables>(UserArtworksHiddenDocument, variables),
      options
    );

useUserArtworksHidden.getKey = (variables: UserArtworksHiddenVariables) => ['UserArtworksHidden', variables];
;
