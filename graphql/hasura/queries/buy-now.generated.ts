import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type BuyNowVariables = Types.Exact<{
  contractAddress: Types.Scalars['String'];
  tokenId: Types.Scalars['Int'];
}>;


export type BuyNow = { buyNow: Array<Pick<Types.Buy_Now, 'acceptedAt' | 'amountInETH' | 'blockCreatedAt' | 'buyer' | 'canceledAt' | 'contractAddress' | 'createdAt' | 'id' | 'invalidatedAt' | 'seller' | 'status' | 'tokenId' | 'updatedAt'>> };


export const BuyNowDocument = /*#__PURE__*/ `
    query BuyNow($contractAddress: String!, $tokenId: Int!) {
  buyNow: buy_now(
    where: {contractAddress: {_eq: $contractAddress}, tokenId: {_eq: $tokenId}, status: {_in: ["OPEN", "ACCEPTED"]}}
  ) {
    acceptedAt
    amountInETH
    blockCreatedAt
    buyer
    canceledAt
    contractAddress
    createdAt
    id
    invalidatedAt
    seller
    status
    tokenId
    updatedAt
  }
}
    `;
export const useBuyNow = <
      TData = BuyNow,
      TError = Error
    >(
      variables: BuyNowVariables,
      options?: UseQueryOptions<BuyNow, TError, TData>
    ) =>
    useQuery<BuyNow, TError, TData>(
      ['BuyNow', variables],
      hasuraFetcher<BuyNow, BuyNowVariables>(BuyNowDocument, variables),
      options
    );

useBuyNow.getKey = (variables: BuyNowVariables) => ['BuyNow', variables];
;
