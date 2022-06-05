import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type MadeOffersCountVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  currentDate: Types.Scalars['timestamp'];
}>;


export type MadeOffersCount = { madeOffersCount: { aggregate?: Types.Maybe<Pick<Types.Offer_Aggregate_Fields, 'count'>> } };


export const MadeOffersCountDocument = /*#__PURE__*/ `
    query MadeOffersCount($publicKey: String!, $currentDate: timestamp!) {
  madeOffersCount: offer_aggregate(
    where: {buyer: {_eq: $publicKey}, acceptedAt: {_is_null: true}, canceledAt: {_is_null: true}, status: {_nin: ["EXPIRED", "CANCELED"]}, expiresAt: {_gt: $currentDate}}
  ) {
    aggregate {
      count
    }
  }
}
    `;
export const useMadeOffersCount = <
      TData = MadeOffersCount,
      TError = Error
    >(
      variables: MadeOffersCountVariables,
      options?: UseQueryOptions<MadeOffersCount, TError, TData>
    ) =>
    useQuery<MadeOffersCount, TError, TData>(
      ['MadeOffersCount', variables],
      hasuraFetcher<MadeOffersCount, MadeOffersCountVariables>(MadeOffersCountDocument, variables),
      options
    );

useMadeOffersCount.getKey = (variables: MadeOffersCountVariables) => ['MadeOffersCount', variables];
;
