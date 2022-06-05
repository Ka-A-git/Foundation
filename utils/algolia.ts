import qs, { ParsedQs } from 'qs';
import { NextRouter } from 'next/router';
import { map, lensPath, over, ifElse, hasPath, always } from 'ramda';

export function createUrl(state): string {
  return `?${qs.stringify(state)}`;
}

export function searchStateToUrl(searchState): string {
  return qs.stringify(searchState);
}

const currentPriceRangePath = ['range', 'auction.currentPrice'];
const currentPriceLens = lensPath(currentPriceRangePath);

export function urlToSearchState(router: NextRouter): ParsedQs {
  const searchIndex = router.asPath.indexOf('?');
  // If url has no search param default to empty state
  if (searchIndex === -1) {
    return {};
  }
  const search = router.asPath.substring(searchIndex + 1);
  const searchParams = qs.parse(search);

  const updatedSearchParams = ifElse(
    hasPath(currentPriceRangePath),
    over(
      currentPriceLens,
      map((v) => Number(v))
    ),
    always(searchParams)
  )(searchParams);

  return updatedSearchParams;
}
