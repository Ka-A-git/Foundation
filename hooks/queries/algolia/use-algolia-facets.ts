import { useQuery, UseQueryOptions } from 'react-query';
import { SearchOptions } from '@algolia/client-search';

import { AlgoliaArtwork, AlgoliaSearchIndex } from 'types/Algolia';
import { getAlgoliaSearchResults } from './shared';
import { AlgoliaArtworksSearch } from './use-algolia-artworks';

interface AlgoliaArtworksVariables {
  searchTerm: string;
  searchIndex: AlgoliaSearchIndex;
  options?: SearchOptions;
}

export default function useAlgoliaFacets<TData = AlgoliaArtworksSearch>(
  variables: AlgoliaArtworksVariables,
  options?: UseQueryOptions<AlgoliaArtworksSearch, Error, TData>
) {
  return useQuery(
    ['AlgoliaFacets', variables],
    () =>
      getAlgoliaSearchResults<AlgoliaArtwork>({
        index: variables.searchIndex,
        query: variables.searchTerm,
        options: { facets: ['*'], ...variables.options },
      }),
    { ...options }
  );
}
