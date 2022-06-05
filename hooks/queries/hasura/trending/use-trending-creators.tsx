import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

import { getNextPageParam } from 'utils/artwork/artwork';
import { isAllTrue } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

import { getTrendingCreators } from 'queries/hasura/trending-creators';

import {
  TrendingCreatorsVariables as ITrendingCreatorsVariables,
  TrendingCreators,
} from 'graphql/hasura/queries/trending-creators.generated';

type TrendingCreatorsVariables = {
  orderByField: keyof ITrendingCreatorsVariables['orderBy'];
};
export default function useTrendingCreators(
  variables: TrendingCreatorsVariables,
  options?: UseInfiniteQueryOptions<
    TrendingCreators,
    Error,
    TrendingCreators['trendingCreators']
  >
) {
  return useInfiniteQuery(
    useTrendingCreators.getKey(variables),
    ({ pageParam = 0 }) =>
      getTrendingCreators({
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

useTrendingCreators.getKey = (variables: TrendingCreatorsVariables) => [
  'TrendingCreators',
  variables,
];
