import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

import { getNextPageParam } from 'utils/artwork/artwork';
import { isAllTrue } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

import { getTrendingCollectors } from 'queries/hasura/trending-collectors';

import {
  TrendingCollectorsVariables as ITrendingCollectorsVariables,
  TrendingCollectors,
} from 'graphql/hasura/queries/trending-collectors.generated';

type TrendingCollectorsVariables = {
  orderByField: keyof ITrendingCollectorsVariables['orderBy'];
};
export default function useTrendingCollectors(
  variables: TrendingCollectorsVariables,
  options?: UseInfiniteQueryOptions<
    TrendingCollectors,
    Error,
    TrendingCollectors['trendingCollectors']
  >
) {
  return useInfiniteQuery(
    useTrendingCollectors.getKey(variables),
    ({ pageParam = 0 }) =>
      getTrendingCollectors({
        limit: 100,
        offset: 100 * pageParam,
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

useTrendingCollectors.getKey = (variables: TrendingCollectorsVariables) => [
  'TrendingCollectors',
  variables,
];
