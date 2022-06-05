import * as Types from '../types-hasura.generated';

import { CollectionFragmentExtended, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, UserFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type CollectionByContractAddressVariables = Types.Exact<{
  contractAddress: Types.Scalars['String'];
}>;


export type CollectionByContractAddress = { collections: Array<(
    Pick<Types.Collection, 'collectionImageUrl' | 'contractAddress' | 'slug' | 'coverImageUrl' | 'createdAt' | 'creatorAddress' | 'description' | 'id' | 'name' | 'symbol' | 'updatedAt' | 'contractType' | 'moderationStatus' | 'hiddenAt' | 'deletedAt'>
    & { creator: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'> }
  )> };


export const CollectionByContractAddressDocument = /*#__PURE__*/ `
    query CollectionByContractAddress($contractAddress: String!) {
  collections: collection(where: {contractAddress: {_eq: $contractAddress}}) {
    ...CollectionFragmentExtended
  }
}
    ${CollectionFragmentExtended}`;
export const useCollectionByContractAddress = <
      TData = CollectionByContractAddress,
      TError = Error
    >(
      variables: CollectionByContractAddressVariables,
      options?: UseQueryOptions<CollectionByContractAddress, TError, TData>
    ) =>
    useQuery<CollectionByContractAddress, TError, TData>(
      ['CollectionByContractAddress', variables],
      hasuraFetcher<CollectionByContractAddress, CollectionByContractAddressVariables>(CollectionByContractAddressDocument, variables),
      options
    );

useCollectionByContractAddress.getKey = (variables: CollectionByContractAddressVariables) => ['CollectionByContractAddress', variables];
;
