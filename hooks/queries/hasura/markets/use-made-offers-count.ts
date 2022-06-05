import { UseQueryOptions } from 'react-query';

import {
  useMadeOffersCount as useMadeOffersCountBaseHook,
  MadeOffersCount,
  MadeOffersCountVariables,
} from 'graphql/hasura/queries/made-offers-count.generated';

import { isAllTrue } from 'utils/helpers';

const currentDate = new Date().toISOString();

export default function useMadeOffersCount(
  variables: Pick<MadeOffersCountVariables, 'publicKey'>,
  options?: UseQueryOptions<MadeOffersCount, Error, number>
) {
  return useMadeOffersCountBaseHook(
    { ...variables, currentDate },
    {
      ...options,
      enabled: isAllTrue(Object.values(variables)),
      select: (res) => {
        return res.madeOffersCount.aggregate.count;
      },
    }
  );
}
