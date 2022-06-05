import * as Types from '../types-hasura.generated';

import { ArtworkFragmentExtended, ArtworkEventFragment, UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type ArtworksByContractTokenIdsVariables = Types.Exact<{
  tokenIds: Array<Types.Scalars['Int']> | Types.Scalars['Int'];
  contractSlug: Types.Scalars['citext'];
}>;


export type ArtworksByContractTokenIds = { artworks: Array<(
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
  )> };


export const ArtworksByContractTokenIdsDocument = /*#__PURE__*/ `
    query ArtworksByContractTokenIds($tokenIds: [Int!]!, $contractSlug: citext!) @cached(ttl: 300) {
  artworks: artwork(
    where: {collection: {slug: {_eq: $contractSlug}}, tokenId: {_in: $tokenIds}, isIndexed: {_eq: true}}
  ) {
    ...ArtworkFragmentExtended
  }
}
    ${ArtworkFragmentExtended}`;
export const useArtworksByContractTokenIds = <
      TData = ArtworksByContractTokenIds,
      TError = Error
    >(
      variables: ArtworksByContractTokenIdsVariables,
      options?: UseQueryOptions<ArtworksByContractTokenIds, TError, TData>
    ) =>
    useQuery<ArtworksByContractTokenIds, TError, TData>(
      ['ArtworksByContractTokenIds', variables],
      hasuraFetcher<ArtworksByContractTokenIds, ArtworksByContractTokenIdsVariables>(ArtworksByContractTokenIdsDocument, variables),
      options
    );

useArtworksByContractTokenIds.getKey = (variables: ArtworksByContractTokenIdsVariables) => ['ArtworksByContractTokenIds', variables];
;
