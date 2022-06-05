import * as Types from '../types-hasura.generated';

import { UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment, CollectionFragment, ArtworkFragmentExtended, ArtworkEventFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type TrendingCollectorsVariables = Types.Exact<{
  orderBy: Types.Trending_Collector_Order_By;
  offset: Types.Scalars['Int'];
  limit: Types.Scalars['Int'];
}>;


export type TrendingCollectors = { trendingCollectors: Array<(
    Pick<Types.Trending_Collector, 'oneDayCreatorsSupported' | 'oneDayNumBought' | 'oneDaySpent' | 'oneWeekCreatorsSupported' | 'oneWeekNumBought' | 'oneWeekSpent' | 'oneMonthCreatorsSupported' | 'oneMonthNumBought' | 'oneMonthSpent' | 'totalCreatorsSupported' | 'totalNumBought' | 'totalSpent'>
    & { user?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>> }
  )> };


export const TrendingCollectorsDocument = /*#__PURE__*/ `
    query TrendingCollectors($orderBy: trending_collector_order_by!, $offset: Int!, $limit: Int!) @cached(ttl: 300) {
  trendingCollectors: trending_collector(
    order_by: [$orderBy]
    offset: $offset
    limit: $limit
  ) {
    oneDayCreatorsSupported
    oneDayNumBought
    oneDaySpent
    oneWeekCreatorsSupported
    oneWeekNumBought
    oneWeekSpent
    oneMonthCreatorsSupported
    oneMonthNumBought
    oneMonthSpent
    totalCreatorsSupported
    totalNumBought
    totalSpent
    user {
      ...UserFragment
    }
  }
}
    ${UserFragment}`;
export const useTrendingCollectors = <
      TData = TrendingCollectors,
      TError = Error
    >(
      variables: TrendingCollectorsVariables,
      options?: UseQueryOptions<TrendingCollectors, TError, TData>
    ) =>
    useQuery<TrendingCollectors, TError, TData>(
      ['TrendingCollectors', variables],
      hasuraFetcher<TrendingCollectors, TrendingCollectorsVariables>(TrendingCollectorsDocument, variables),
      options
    );

useTrendingCollectors.getKey = (variables: TrendingCollectorsVariables) => ['TrendingCollectors', variables];
;
