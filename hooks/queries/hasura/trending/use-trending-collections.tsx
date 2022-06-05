import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

import { getNextPageParam } from 'utils/artwork/artwork';
import { isAllTrue } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

import { getTrendingCollections } from 'queries/hasura/trending-collections';

import {
  TrendingCollectionsVariables as ITrendingCollectionsVariables,
  TrendingCollections,
} from 'graphql/hasura/queries/trending-collections.generated';

import { getNFT721Address } from 'lib/addresses';

type TrendingCollectionsVariables = {
  orderByField: keyof ITrendingCollectionsVariables['orderBy'];
};
export default function useTrendingCollections(
  variables: TrendingCollectionsVariables,
  options?: UseInfiniteQueryOptions<
    TrendingCollections,
    Error,
    TrendingCollections['trendingCollections']
  >
) {
  return useInfiniteQuery(
    useTrendingCollections.getKey(variables),
    ({ pageParam = 0 }) =>
      getTrendingCollections({
        limit: 100,
        offset: 100 * pageParam,
        foundationAddress: getNFT721Address(),
        orderBy: {
          [variables.orderByField]: 'desc',
        },
      }),
    {
      ...options,
      enabled: isAllTrue([
        isQueryEnabled(options),
        ...Object.values(variables),
      ]),
      getNextPageParam,
      refetchOnWindowFocus: false,
    }
  );
}

useTrendingCollections.getKey = (variables: TrendingCollectionsVariables) => [
  'TrendingCollections',
  variables,
];
