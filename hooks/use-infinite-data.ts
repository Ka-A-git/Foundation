import { useMemo } from 'react';
import { compose, propOr, uniqBy } from 'ramda';
import { InfiniteData } from 'react-query';

type KeyOf<T> = Extract<keyof T, string>;

export default function useInfiniteData<T>(
  data: InfiniteData<T[]>,
  uniqKey: KeyOf<T>
) {
  return useMemo(
    () =>
      compose<InfiniteData<T[]>, InfiniteData<T[]>['pages'], T[], T[]>(
        uniqBy((data) => data[uniqKey]),
        (pages) => pages.flat(),
        propOr([], 'pages')
      )(data),
    [data, uniqKey]
  );
}

export function useFlattenedInfiniteData<T>(data: InfiniteData<T[]>) {
  return useMemo(
    () =>
      compose<InfiniteData<T[]>, InfiniteData<T[]>['pages'], T[]>(
        (pages) => pages.flat(),
        propOr([], 'pages')
      )(data),
    [data]
  );
}
