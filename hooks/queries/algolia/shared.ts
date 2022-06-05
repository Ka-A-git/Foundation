import {
  SearchForFacetValuesResponse,
  MultipleQueriesQuery,
  SearchOptions,
  SearchResponse,
} from '@algolia/client-search';
import { SearchIndex } from 'algoliasearch/lite';

import algoliaClient from 'lib/clients/algolia';
import { AlgoliaSearchIndex } from 'types/Algolia';

const searchIndexes: Map<AlgoliaSearchIndex, SearchIndex> = new Map([
  ['users', algoliaClient.initIndex('users')],
  ['collections', algoliaClient.initIndex('collections')],
  [
    'collections_sort_date_created_asc',
    algoliaClient.initIndex('collections_sort_date_created_asc'),
  ],
  [
    'collections_sort_date_created_desc',
    algoliaClient.initIndex('collections_sort_date_created_desc'),
  ],
  [
    'collections_sort_date_last_minted_to_asc',
    algoliaClient.initIndex('collections_sort_date_last_minted_to_asc'),
  ],
  [
    'collections_sort_date_last_minted_to_desc',
    algoliaClient.initIndex('collections_sort_date_last_minted_to_desc'),
  ],
  [
    'artworks_sort_date_listed_asc',
    algoliaClient.initIndex('artworks_sort_date_listed_asc'),
  ],
  [
    'artworks_sort_date_listed_desc',
    algoliaClient.initIndex('artworks_sort_date_listed_desc'),
  ],
  [
    'artworks_sort_date_sold_asc',
    algoliaClient.initIndex('artworks_sort_date_sold_asc'),
  ],
  [
    'artworks_sort_date_sold_desc',
    algoliaClient.initIndex('artworks_sort_date_sold_desc'),
  ],
  [
    'artworks_sort_latest_buy_now_asc',
    algoliaClient.initIndex('artworks_sort_latest_buy_now_asc'),
  ],
  [
    'artworks_sort_latest_buy_now_desc',
    algoliaClient.initIndex('artworks_sort_latest_buy_now_desc'),
  ],
  [
    'artworks_sort_latest_offer_asc',
    algoliaClient.initIndex('artworks_sort_latest_offer_asc'),
  ],
  [
    'artworks_sort_latest_offer_desc',
    algoliaClient.initIndex('artworks_sort_latest_offer_desc'),
  ],
  [
    'artworks_sort_price_asc',
    algoliaClient.initIndex('artworks_sort_price_asc'),
  ],
  [
    'artworks_sort_price_desc',
    algoliaClient.initIndex('artworks_sort_price_desc'),
  ],
]);

export const defaultSearchIndexes: Record<'collections', AlgoliaSearchIndex> = {
  collections: 'collections_sort_date_last_minted_to_desc',
};

interface AlgoliaSearchResultsArgs {
  index: AlgoliaSearchIndex;
  query: string;
  options: SearchOptions;
}

export async function getAlgoliaSearchResults<T>({
  index,
  query,
  options,
}: AlgoliaSearchResultsArgs): Promise<SearchResponse<T>> {
  const searchIndex = searchIndexes.get(index);
  return await searchIndex.search(query, options);
}

interface AlgoliaFacetResultsArgs {
  index: AlgoliaSearchIndex;
  facetName: string;
  facetQuery: string;
  options: SearchOptions;
}

export async function getAlgoliaFacetResults({
  index,
  facetName,
  facetQuery,
  options,
}: AlgoliaFacetResultsArgs): Promise<SearchForFacetValuesResponse> {
  const searchIndex = searchIndexes.get(index);
  return await searchIndex.searchForFacetValues(facetName, facetQuery, options);
}

export async function getAlgoliaMultipleSearchResults<T>(
  query: MultipleQueriesQuery[]
): Promise<T> {
  // algolia’s types can only handle results from a
  // single index so we need to manually override it
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return await algoliaClient.search(query);
}
