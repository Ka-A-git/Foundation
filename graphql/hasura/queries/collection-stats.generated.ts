import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type CollectionStatsVariables = Types.Exact<{
  contractSlug: Types.Scalars['citext'];
  indexedStates: Array<Types.Scalars['Boolean']> | Types.Scalars['Boolean'];
}>;


export type CollectionStats = { collection: Array<{ owners: Array<{ owner?: Types.Maybe<Pick<Types.User, 'publicKey' | 'profileImageUrl' | 'userIndex'>> }>, ownersCount: { aggregate?: Types.Maybe<Pick<Types.Artwork_Aggregate_Fields, 'count'>> }, privateSaleAggregates: { aggregate?: Types.Maybe<{ sum?: Types.Maybe<Pick<Types.Private_Sale_Sum_Fields, 'saleAmountInETH'>>, min?: Types.Maybe<Pick<Types.Private_Sale_Min_Fields, 'saleAmountInETH'>> }> }, artworkAggregates: { aggregate?: Types.Maybe<(
        Pick<Types.Artwork_Aggregate_Fields, 'count'>
        & { min?: Types.Maybe<Pick<Types.Artwork_Min_Fields, 'lastSalePriceInETH' | 'activeSalePriceInETH'>> }
      )> }, auctionAggregates: { aggregate?: Types.Maybe<{ sum?: Types.Maybe<Pick<Types.Auction_Sum_Fields, 'highestBidAmount'>> }> }, floorPriceAggregates: { aggregate?: Types.Maybe<{ min?: Types.Maybe<Pick<Types.Auction_Min_Fields, 'reservePriceInETH' | 'highestBidAmount'>> }> }, lastSoldBuyNowAggregates: { aggregate?: Types.Maybe<{ min?: Types.Maybe<Pick<Types.Buy_Now_Min_Fields, 'amountInETH'>>, sum?: Types.Maybe<Pick<Types.Buy_Now_Sum_Fields, 'amountInETH'>> }> }, activeBuyNowAggregates: { aggregate?: Types.Maybe<{ min?: Types.Maybe<Pick<Types.Buy_Now_Min_Fields, 'amountInETH'>> }> }, acceptedOfferAggregates: { aggregate?: Types.Maybe<{ min?: Types.Maybe<Pick<Types.Offer_Min_Fields, 'amountInETH'>>, sum?: Types.Maybe<Pick<Types.Offer_Sum_Fields, 'amountInETH'>> }> } }> };


export const CollectionStatsDocument = /*#__PURE__*/ `
    query CollectionStats($contractSlug: citext!, $indexedStates: [Boolean!]!) @cached(ttl: 180) {
  collection(where: {slug: {_eq: $contractSlug}}) {
    owners: artworks(
      limit: 4
      distinct_on: ownerPublicKey
      where: {isIndexed: {_in: $indexedStates}, status: {_eq: "MINTED"}}
    ) {
      owner {
        publicKey
        profileImageUrl
        userIndex
      }
    }
    ownersCount: artworks_aggregate(
      distinct_on: ownerPublicKey
      where: {isIndexed: {_in: $indexedStates}, status: {_eq: "MINTED"}}
    ) {
      aggregate {
        count
      }
    }
    privateSaleAggregates: privateSales_aggregate(
      where: {soldAt: {_is_null: false}}
    ) {
      aggregate {
        sum {
          saleAmountInETH
        }
        min {
          saleAmountInETH
        }
      }
    }
    artworkAggregates: artworks_aggregate(
      where: {isIndexed: {_in: $indexedStates}, status: {_eq: "MINTED"}}
    ) {
      aggregate {
        count
        min {
          lastSalePriceInETH
        }
        min {
          activeSalePriceInETH
        }
      }
    }
    auctionAggregates: auctions_aggregate(
      where: {status: {_in: ["FINALIZED", "ENDED"]}}
    ) {
      aggregate {
        sum {
          highestBidAmount
        }
      }
    }
    floorPriceAggregates: auctions_aggregate(
      where: {endsAt: {_is_null: true}, status: {_eq: "OPEN"}}
    ) {
      aggregate {
        min {
          reservePriceInETH
        }
        min {
          highestBidAmount
        }
      }
    }
    lastSoldBuyNowAggregates: buyNows_aggregate(where: {status: {_eq: ACCEPTED}}) {
      aggregate {
        min {
          amountInETH
        }
        sum {
          amountInETH
        }
      }
    }
    activeBuyNowAggregates: buyNows_aggregate(
      where: {acceptedAt: {_is_null: true}, canceledAt: {_is_null: true}, invalidatedAt: {_is_null: true}}
    ) {
      aggregate {
        min {
          amountInETH
        }
      }
    }
    acceptedOfferAggregates: offers_aggregate(
      where: {acceptedAt: {_is_null: false}}
    ) {
      aggregate {
        min {
          amountInETH
        }
        sum {
          amountInETH
        }
      }
    }
  }
}
    `;
export const useCollectionStats = <
      TData = CollectionStats,
      TError = Error
    >(
      variables: CollectionStatsVariables,
      options?: UseQueryOptions<CollectionStats, TError, TData>
    ) =>
    useQuery<CollectionStats, TError, TData>(
      ['CollectionStats', variables],
      hasuraFetcher<CollectionStats, CollectionStatsVariables>(CollectionStatsDocument, variables),
      options
    );

useCollectionStats.getKey = (variables: CollectionStatsVariables) => ['CollectionStats', variables];
;
