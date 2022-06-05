import { useQuery, UseQueryOptions } from 'react-query';
import { QueryCacheKey } from 'types/Queries';

async function getAuthToken() {
  const res = await fetch('/api/token');
  const data = await res.json();

  if (res.ok) {
    return data.token;
  }
  throw Error(data.error);
}

export default function useAuthToken(options?: UseQueryOptions) {
  return useQuery(QueryCacheKey.AuthToken, getAuthToken, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
    keepPreviousData: true,
    retry: false,
    // 12 hours
    staleTime: 12 * 60 * 60 * 1000,
    cacheTime: 12 * 60 * 60 * 1000,
    ...options,
  });
}
