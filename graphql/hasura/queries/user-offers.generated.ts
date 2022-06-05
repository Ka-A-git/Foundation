import * as Types from '../types-hasura.generated';

import { OfferFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserOffersVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  currentDate: Types.Scalars['timestamp'];
}>;


export type UserOffers = { offersMade: Array<(
    Pick<Types.Offer, 'amountInETH' | 'status' | 'expiresAt'>
    & { buyer: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>, artwork?: Types.Maybe<(
      Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
      & { creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'collectionImageUrl' | 'coverImageUrl' | 'slug'>>, privateSales: Array<(
        Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
        & { price: Types.Private_Sale['saleAmountInETH'] }
      )> }
    )> }
  )>, offersReceived: Array<(
    Pick<Types.Offer, 'amountInETH' | 'status' | 'expiresAt'>
    & { buyer: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>, artwork?: Types.Maybe<(
      Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
      & { creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'collectionImageUrl' | 'coverImageUrl' | 'slug'>>, privateSales: Array<(
        Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
        & { price: Types.Private_Sale['saleAmountInETH'] }
      )> }
    )> }
  )> };


export const UserOffersDocument = /*#__PURE__*/ `
    query UserOffers($publicKey: String!, $currentDate: timestamp!) {
  offersMade: offer(
    where: {buyer: {_eq: $publicKey}, acceptedAt: {_is_null: true}, canceledAt: {_is_null: true}, status: {_nin: ["EXPIRED", "CANCELED"]}, expiresAt: {_gt: $currentDate}}
    order_by: {expiresAt: asc_nulls_last}
  ) {
    ...OfferFragment
  }
  offersReceived: offer(
    where: {artwork: {ownerPublicKey: {_eq: $publicKey}}, acceptedAt: {_is_null: true}, canceledAt: {_is_null: true}, status: {_eq: HIGHEST}, expiresAt: {_gt: $currentDate}}
    order_by: {expiresAt: asc_nulls_last}
  ) {
    ...OfferFragment
  }
}
    ${OfferFragment}`;
export const useUserOffers = <
      TData = UserOffers,
      TError = Error
    >(
      variables: UserOffersVariables,
      options?: UseQueryOptions<UserOffers, TError, TData>
    ) =>
    useQuery<UserOffers, TError, TData>(
      ['UserOffers', variables],
      hasuraFetcher<UserOffers, UserOffersVariables>(UserOffersDocument, variables),
      options
    );

useUserOffers.getKey = (variables: UserOffersVariables) => ['UserOffers', variables];
;
