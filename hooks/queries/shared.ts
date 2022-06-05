import { allPass, is, lt, gt } from 'ramda';
import { UseQueryOptions } from 'react-query';

export const isQueryEnabled = <T extends Pick<UseQueryOptions, 'enabled'>>(
  options: T
) => options?.enabled ?? true;

export const isValidTokenId: (arg0: number) => boolean = allPass([
  // is it a number
  is(Number),
  // is it greater than zero?
  (num: number) => gt(num, 0),
  // is it less than the safest integer (9007199254740991)?
  (num: number) => lt(num, Number.MAX_SAFE_INTEGER),
]);
