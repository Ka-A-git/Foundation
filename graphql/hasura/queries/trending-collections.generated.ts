import * as Types from '../types-hasura.generated';

import { CollectionFragmentExtended, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, UserFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type TrendingCollectionsVariables = Types.Exact<{
  orderBy: Types.Trending_Collection_Order_By;
  offset: Types.Scalars['Int'];
  limit: Types.Scalars['Int'];
  foundationAddress: Types.Scalars['String'];
}>;


export type TrendingCollections = { trendingCollections: Array<(
    Pick<Types.Trending_Collection, 'oneDayVol' | 'oneDayNumSold' | 'oneDayCollectors' | 'oneDayPrimaryVol' | 'oneDaySecondaryVol' | 'oneWeekVol' | 'oneWeekNumSold' | 'oneWeekCollectors' | 'oneWeekPrimaryVol' | 'oneWeekSecondaryVol' | 'oneMonthVol' | 'oneMonthNumSold' | 'oneMonthCollectors' | 'oneMonthPrimaryVol' | 'oneMonthSecondaryVol' | 'totalVol' | 'totalNumSold' | 'totalCollectors' | 'totalPrimaryVol' | 'totalSecondaryVol'>
    & { collection?: Types.Maybe<(
      Pick<Types.Collection, 'collectionImageUrl' | 'contractAddress' | 'slug' | 'coverImageUrl' | 'createdAt' | 'creatorAddress' | 'description' | 'id' | 'name' | 'symbol' | 'updatedAt' | 'contractType' | 'moderationStatus' | 'hiddenAt' | 'deletedAt'>
      & { creator: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'> }
    )> }
  )> };


export const TrendingCollectionsDocument = /*#__PURE__*/ `
    query TrendingCollections($orderBy: trending_collection_order_by!, $offset: Int!, $limit: Int!, $foundationAddress: String!) @cached(ttl: 300) {
  trendingCollections: trending_collection(
    order_by: [$orderBy]
    offset: $offset
    limit: $limit
    where: {collection: {isIndexed: {_eq: true}, contractAddress: {_neq: $foundationAddress}}}
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
    collection {
      ...CollectionFragmentExtended
    }
  }
}
    ${CollectionFragmentExtended}`;
export const useTrendingCollections = <
      TData = TrendingCollections,
      TError = Error
    >(
      variables: TrendingCollectionsVariables,
      options?: UseQueryOptions<TrendingCollections, TError, TData>
    ) =>
    useQuery<TrendingCollections, TError, TData>(
      ['TrendingCollections', variables],
      hasuraFetcher<TrendingCollections, TrendingCollectionsVariables>(TrendingCollectionsDocument, variables),
      options
    );

useTrendingCollections.getKey = (variables: TrendingCollectionsVariables) => ['TrendingCollections', variables];
;
