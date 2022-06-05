import { UseInfiniteQueryOptions, useInfiniteQuery } from 'react-query';

import { fndHasuraClient } from 'lib/clients/graphql';

import { QueryCacheKey } from 'types/Queries';
import { OmitPagination } from 'types/utils';

import { maybeGetAddressOrEmpty } from 'utils/users';
import { getNextPageParam } from 'utils/artwork/artwork';

import { PUBLIC_FEED_PER_PAGE_COUNT } from 'lib/constants';

import {
  FeedUsersByPublicKeysDocument,
  FeedUsersByPublicKeys,
  FeedUsersByPublicKeysVariables,
} from 'graphql/hasura/queries/feed-users-by-public-keys.generated';

async function getCreatorsFeed(variables: FeedUsersByPublicKeysVariables) {
  const { publicKey, publicKeys, limit, offset } = variables;

  const client = fndHasuraClient();

  const query = await client.request<
    FeedUsersByPublicKeys,
    FeedUsersByPublicKeysVariables
  >(FeedUsersByPublicKeysDocument, { publicKey, publicKeys, limit, offset });

  return query.users;
}

export default function useCreatorsFeed(
  variables: OmitPagination<FeedUsersByPublicKeysVariables>,
  options?: UseInfiniteQueryOptions<
    FeedUsersByPublicKeys,
    Error,
    FeedUsersByPublicKeys['users']
  >
) {
  const { publicKey, publicKeys } = variables;

  const publicAddress = maybeGetAddressOrEmpty(publicKey);

  return useInfiniteQuery(
    useCreatorsFeed.getKey(variables),
    ({ pageParam = 0 }) =>
      getCreatorsFeed({
        publicKey: publicAddress,
        publicKeys,
        limit: PUBLIC_FEED_PER_PAGE_COUNT,
        offset: PUBLIC_FEED_PER_PAGE_COUNT * pageParam,
      }),
    { ...options, refetchOnWindowFocus: false, getNextPageParam }
  );
}

useCreatorsFeed.getKey = (
  variables: OmitPagination<FeedUsersByPublicKeysVariables>
) => [QueryCacheKey.FeedFeaturedCreators, variables];
