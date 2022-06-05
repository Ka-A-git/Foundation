import * as Types from '../types-hasura.generated';

import { UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment, CollectionFragment, ArtworkFragmentExtended, ArtworkEventFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type TrendingCreatorsVariables = Types.Exact<{
  orderBy: Types.Trending_Creator_Order_By;
  offset: Types.Scalars['Int'];
  limit: Types.Scalars['Int'];
}>;


export type TrendingCreators = { trendingCreators: Array<(
    Pick<Types.Trending_Creator, 'oneDayVol' | 'oneDayNumSold' | 'oneDayCollectors' | 'oneDayPrimaryVol' | 'oneDaySecondaryVol' | 'oneWeekVol' | 'oneWeekNumSold' | 'oneWeekCollectors' | 'oneWeekPrimaryVol' | 'oneWeekSecondaryVol' | 'oneMonthVol' | 'oneMonthNumSold' | 'oneMonthCollectors' | 'oneMonthPrimaryVol' | 'oneMonthSecondaryVol' | 'totalVol' | 'totalNumSold' | 'totalCollectors' | 'totalPrimaryVol' | 'totalSecondaryVol'>
    & { user?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>> }
  )> };


export const TrendingCreatorsDocument = /*#__PURE__*/ `
    query TrendingCreators($orderBy: trending_creator_order_by!, $offset: Int!, $limit: Int!) @cached(ttl: 300) {
  trendingCreators: trending_creator(
    order_by: [$orderBy]
    offset: $offset
    limit: $limit
  ) {
    oneDayVol
    oneDayNumSold
    oneDayCollectors
    oneDayPrimaryVol
    oneDaySecondaryVol
    oneWeekVol
    oneWeekNumSold
    oneWeekCollectors
    oneWeekPrimaryVol
    oneWeekSecondaryVol
    oneMonthVol
    oneMonthNumSold
    oneMonthCollectors
    oneMonthPrimaryVol
    oneMonthSecondaryVol
    totalVol
    totalNumSold
    totalCollectors
    totalPrimaryVol
    totalSecondaryVol
    user {
      ...UserFragment
    }
  }
}
    ${UserFragment}`;
export const useTrendingCreators = <
      TData = TrendingCreators,
      TError = Error
    >(
      variables: TrendingCreatorsVariables,
      options?: UseQueryOptions<TrendingCreators, TError, TData>
    ) =>
    useQuery<TrendingCreators, TError, TData>(
      ['TrendingCreators', variables],
      hasuraFetcher<TrendingCreators, TrendingCreatorsVariables>(TrendingCreatorsDocument, variables),
      options
    );

useTrendingCreators.getKey = (variables: TrendingCreatorsVariables) => ['TrendingCreators', variables];
;
