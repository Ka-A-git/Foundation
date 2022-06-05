import { UseQueryOptions } from 'react-query';
import {
  useBuyNow as useBuyNowBaseHook,
  BuyNowVariables,
  BuyNow,
} from 'graphql/hasura/queries/buy-now.generated';

import { getFirstValue, isAllTrue } from 'utils/helpers';

import { isQueryEnabled } from 'hooks/queries/shared';
import { BuyNowStatus } from 'types/BuyNow';

export default function useBuyNow(
  variables: BuyNowVariables,
  options?: UseQueryOptions<BuyNow, Error, BuyNow['buyNow'][0]>
) {
  return useBuyNowBaseHook(variables, {
    ...options,
    enabled: isAllTrue([isQueryEnabled(options), ...Object.values(variables)]),
    select: (res) => getFirstValue(res.buyNow),
  });
}

export function useOpenBuyNow(
  variables: BuyNowVariables,
  options?: UseQueryOptions<BuyNow, Error, BuyNow['buyNow'][0]>
) {
  return useBuyNowBaseHook(variables, {
    ...options,
    enabled: isAllTrue([isQueryEnabled(options), ...Object.values(variables)]),
    select: (res) => {
      const openBuyNows = res.buyNow.filter(
        (buyNow) => buyNow.status === BuyNowStatus.Open
      );
      return getFirstValue(openBuyNows);
    },
  });
}
