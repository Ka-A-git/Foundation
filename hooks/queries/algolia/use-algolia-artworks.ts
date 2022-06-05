import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import { SearchOptions, SearchResponse } from '@algolia/client-search';
import { always, cond, includes, T } from 'ramda';
import { BigNumberish } from 'ethers';

import { AlgoliaArtwork, AlgoliaSearchIndex } from 'types/Algolia';
import { getAlgoliaSearchResults } from './shared';

import { PUBLIC_FEED_PER_PAGE_COUNT } from 'lib/constants';
import { isAnyTrue, notEmptyOrNil } from 'utils/helpers';

interface AlgoliaArtworksVariables {
  contractAddress: string;
  searchIndex: AlgoliaSearchIndex;
  options?: SearchOptions;
}

export type AlgoliaArtworksSearch = SearchResponse<AlgoliaArtwork>;

export function useAlgoliaArtworksAggregates(
  variables: Omit<AlgoliaArtworksVariables, 'contractAddress'>,
  options?: UseQueryOptions<AlgoliaArtworksSearch, Error>
) {
  return useQuery(
    useAlgoliaArtworksAggregates.getKey(variables),
    () =>
      getAlgoliaSearchResults<AlgoliaArtwork>({
        index: variables.searchIndex,
        query: variables.searchTerm,
        options: variables.options,
      }),
    options
  );
}

useAlgoliaArtworksAggregates.getKey = (
  variables: Omit<AlgoliaArtworksVariables, 'contractAddress'>
) => ['AlgoliaArtworksAggregates', variables];

export default function useAlgoliaArtworks(
  variables: AlgoliaArtworksVariables,
  options?: UseInfiniteQueryOptions<
    AlgoliaArtworksSearch,
    Error,
    AlgoliaArtworksSearch
  >
) {
  const [, setFilters] = useAlgoliaArtworksFilters({
    contractAddress: variables.contractAddress,
  });

  return useInfiniteQuery(
    useAlgoliaArtworks.getKey(variables),
    ({ pageParam = 0 }) =>
      getAlgoliaSearchResults<AlgoliaArtwork>({
        index: variables.searchIndex,
        query: variables.searchTerm,
        options: {
          ...variables.options,
          page: pageParam,
          hitsPerPage: PUBLIC_FEED_PER_PAGE_COUNT,
        },
      }),
    {
      ...options,
      onSuccess: (res) => {
        const [firstResult] = res.pages;
        const flatResults = res.pages.flatMap((page) =>
          page.hits.map((hit) => hit.objectID)
        );

        setFilters({
          resultCount: flatResults.length,
          totalCount: firstResult.nbHits,
          searchStats: firstResult,
        });
      },
      getNextPageParam: (lastPage) => {
        const lastPageNumber = lastPage.page;
        const totalPageCount = lastPage.nbPages;
        const nextPageIndex = lastPageNumber + 1;

        return lastPageNumber < totalPageCount ? nextPageIndex : undefined;
      },
    }
  );
}

useAlgoliaArtworks.getKey = (variables: AlgoliaArtworksVariables) => [
  'AlgoliaArtworks',
  variables,
];

interface AlgoliaArtworksVariables {
  searchTerm: string;
  searchIndex: AlgoliaSearchIndex;
}

export type MarketAvailability =
  | 'RESERVE_NOT_MET'
  | 'HAS_ACTIVE_BUY_NOW'
  | 'HAS_ACTIVE_OFFER'
  | 'LIVE_AUCTION';

type AlgoliaArtworksFilters = {
  marketAvailability: MarketAvailability[];
  searchTerm: string;
  searchIndex: AlgoliaSearchIndex;
  resultCount: number;
  totalCount: number;
  hasFilters: boolean;
  searchStats: AlgoliaArtworksSearch;
  priceFilterAttribute: string;
  minPrice: BigNumberish;
  maxPrice: BigNumberish;
  attributes: string[];
};

export type AlgoliaArtworksFiltersVariables = {
  contractAddress: string;
};

// use react-query as a cache for the search variables
export function useAlgoliaArtworksFilters(
  variables: AlgoliaArtworksFiltersVariables
): [AlgoliaArtworksFilters, (arg0: Partial<AlgoliaArtworksFilters>) => void] {
  const queryClient = useQueryClient();

  // a hook that returns a function that sets the search filters
  const setArtworkFilters = (newVariables: Partial<AlgoliaArtworksFilters>) => {
    queryClient.setQueryData<AlgoliaArtworksFilters>(
      useAlgoliaArtworksFilters.getKey(variables),
      (prev) => {
        const filters = { ...prev, ...newVariables };
        const hasFilters = isAnyTrue([
          filters.marketAvailability.length > 0,
          filters.searchIndex !== 'artworks_sort_latest_buy_now_desc',
          filters.minPrice,
          filters.maxPrice,
          notEmptyOrNil(filters.attributes),
        ]);

        return {
          ...filters,
          hasFilters,
          priceFilterAttribute: getSelectedAttribute(
            filters.marketAvailability
          ),
        };
      }
    );
  };

  const filtersQuery = useQuery<AlgoliaArtworksFilters, Error>(
    useAlgoliaArtworksFilters.getKey(variables),
    {
      enabled: false,
      initialData: {
        marketAvailability: [],
        searchTerm: '',
        searchIndex: 'artworks_sort_latest_buy_now_desc',
        resultCount: 0,
        totalCount: 0,
        hasFilters: false,
        searchStats: null,
        priceFilterAttribute: getSelectedAttribute([]),
        minPrice: null,
        maxPrice: null,
        attributes: [],
      },
    }
  );

  return [filtersQuery.data, setArtworkFilters];
}

useAlgoliaArtworksFilters.getKey = (
  variables: AlgoliaArtworksFiltersVariables
) => ['AlgoliaArtworksFilters', variables];

export function useSetArtworkMarketAvailability(
  variables: AlgoliaArtworksFiltersVariables
) {
  const queryClient = useQueryClient();
  return (marketAvailability: MarketAvailability) => {
    queryClient.setQueryData<AlgoliaArtworksFilters>(
      useAlgoliaArtworksFilters.getKey(variables),
      (prev) => {
        const hasAppliedFilter =
          prev.marketAvailability.includes(marketAvailability);

        return {
          ...prev,
          // conditionally add/remove value from the marketAvailability array
          marketAvailability: hasAppliedFilter ? [] : [marketAvailability],
        };
      }
    );
  };
}

export function useResetFilters(props: AlgoliaArtworksFiltersVariables) {
  const { contractAddress } = props;
  const [, setFilters] = useAlgoliaArtworksFilters({ contractAddress });
  return () =>
    setFilters({
      searchIndex: 'artworks_sort_latest_buy_now_desc',
      marketAvailability: [],
      priceFilterAttribute: null,
      minPrice: null,
      maxPrice: null,
      attributes: [],
    });
}

export function mapFacet<T extends string, U = keyof AlgoliaArtworksFilters>(
  facetName: U,
  facetValue: T
) {
  // coverts into algolia-friendly facet strings
  // e.g. `marketAvailability:LIVE_AUCTION`
  return `${facetName}:${facetValue}`;
}

const getSelectedAttribute = cond<MarketAvailability[], string>([
  [includes('HAS_ACTIVE_BUY_NOW'), always('latestBuyNow.amountInETH')],
  [includes('RESERVE_NOT_MET'), always('auction.currentPrice')],
  [includes('LIVE_AUCTION'), always('auction.currentPrice')],
  [includes('HAS_ACTIVE_OFFER'), always('latestOffer.amountInETH')],
  [T, always('latestBuyNow.amountInETH')],
]);
