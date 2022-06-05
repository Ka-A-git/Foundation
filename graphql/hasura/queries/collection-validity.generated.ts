import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type CollectionValidityVariables = Types.Exact<{
  contractAddress: Types.Scalars['String'];
}>;


export type CollectionValidity = { collectionValidation: Array<Pick<Types.Collection_Validation, 'isErc721' | 'hasRoyalties' | 'hasSingleOwner' | 'hasValidMetadata' | 'status' | 'totalTokenCount'>>, nftValidation: Array<Pick<Types.Nft_Validation, 'status' | 'tokenId' | 'hasValidMimeType' | 'hasValidMetadata' | 'hasValidAssetSize' | 'hasRoyalties' | 'data'>> };


export const CollectionValidityDocument = /*#__PURE__*/ `
    query CollectionValidity($contractAddress: String!) {
  collectionValidation: collection_validation(
    where: {contractAddress: {_eq: $contractAddress}}
  ) {
    isErc721
    hasRoyalties
    hasSingleOwner
    hasValidMetadata
    status
    totalTokenCount
  }
  nftValidation: nft_validation(where: {contractAddress: {_eq: $contractAddress}}) {
    status
    tokenId
    hasValidMimeType
    hasValidMetadata
    hasValidAssetSize
    hasRoyalties
    data
  }
}
    `;
export const useCollectionValidity = <
      TData = CollectionValidity,
      TError = Error
    >(
      variables: CollectionValidityVariables,
      options?: UseQueryOptions<CollectionValidity, TError, TData>
    ) =>
    useQuery<CollectionValidity, TError, TData>(
      ['CollectionValidity', variables],
      hasuraFetcher<CollectionValidity, CollectionValidityVariables>(CollectionValidityDocument, variables),
      options
    );

useCollectionValidity.getKey = (variables: CollectionValidityVariables) => ['CollectionValidity', variables];
;
