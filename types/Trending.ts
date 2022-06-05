import { TrendingCollections } from 'graphql/hasura/queries/trending-collections.generated';
import { TrendingCollectors } from 'graphql/hasura/queries/trending-collectors.generated';
import { TrendingCreators } from 'graphql/hasura/queries/trending-creators.generated';

export type TrendingCreator = TrendingCreators['trendingCreators'][0];
export type TrendingCollector = TrendingCollectors['trendingCollectors'][0];
export type TrendingCollection = TrendingCollections['trendingCollections'][0];

export enum TimeFilter {
  OneDay,
  SevenDay,
  ThirtyDay,
  AllTime,
}

export enum TrendingCreatorColumn {
  UniqueCollectors = 'UniqueCollectors',
  NftsSold = 'NftsSold',
  PrimarySales = 'PrimarySales',
  SecondarySales = 'SecondarySales',
  TotalVolume = 'TotalVolume',
}

export enum TrendingCollectorColumn {
  CreatorsSupported = 'CreatorsSupported',
  NftsBought = 'NftsBought',
  TotalSpent = 'TotalSpent',
}

export enum TrendingCollectionColumn {
  Owners = 'Owners',
  NftsSold = 'NftsSold',
  PrimarySales = 'PrimarySales',
  SecondarySales = 'SecondarySales',
  TotalSales = 'TotalSales',
}
