import * as Types from '../types-hasura.generated';

import { OfferFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type OffersByStatusVariables = Types.Exact<{
  contractAddress: Types.Scalars['String'];
  tokenId: Types.Scalars['Int'];
  status: Types.Scalars['offer_status_enum'];
}>;


export type OffersByStatus = { artworks: Array<{ offers: Array<(
      Pick<Types.Offer, 'amountInETH' | 'status' | 'expiresAt'>
      & { buyer: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>, artwork?: Types.Maybe<(
        Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
        & { creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'collectionImageUrl' | 'coverImageUrl' | 'slug'>>, privateSales: Array<(
          Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
          & { price: Types.Private_Sale['saleAmountInETH'] }
        )> }
      )> }
    )> }> };


export const OffersByStatusDocument = /*#__PURE__*/ `
    query OffersByStatus($contractAddress: String!, $tokenId: Int!, $status: offer_status_enum!) {
  artworks: artwork(
    where: {contractAddress: {_eq: $contractAddress}, tokenId: {_eq: $tokenId}}
  ) {
    offers(where: {status: {_eq: $status}}, order_by: {placedAt: desc}) {
      ...OfferFragment
    }
  }
}
    ${OfferFragment}`;
export const useOffersByStatus = <
      TData = OffersByStatus,
      TError = Error
    >(
      variables: OffersByStatusVariables,
      options?: UseQueryOptions<OffersByStatus, TError, TData>
    ) =>
    useQuery<OffersByStatus, TError, TData>(
      ['OffersByStatus', variables],
      hasuraFetcher<OffersByStatus, OffersByStatusVariables>(OffersByStatusDocument, variables),
      options
    );

useOffersByStatus.getKey = (variables: OffersByStatusVariables) => ['OffersByStatus', variables];
;
