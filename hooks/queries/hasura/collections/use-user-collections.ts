import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from 'react-query';
import { ClientError } from 'graphql-request';

import {
  UserCollections,
  UserCollectionsDocument,
  UserCollectionsVariables,
} from 'graphql/hasura/queries/user-collections.generated';

import {
  UserAvailableCollections,
  UserAvailableCollectionsVariables,
  useUserAvailableCollections as useUserAvailableCollectionsBaseHook,
} from 'graphql/hasura/queries/user-available-collections.generated';

import { CollectionFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { PUBLIC_FEED_PER_PAGE_COUNT } from 'lib/constants';
import { fndHasuraClient } from 'lib/clients/graphql';

import { maybeGetAddress } from 'utils/users';
import { getNextPageParam } from 'utils/artwork/artwork';
import { OmitPagination } from 'types/utils';
import { isAllTrue } from 'utils/helpers';

export async function getUserCollections(variables: UserCollectionsVariables) {
  const client = fndHasuraClient();
  const data = await client.request<UserCollections, UserCollectionsVariables>(
    UserCollectionsDocument,
    variables
  );
  return data.collections;
}

export default function useUserCollections(
  variables: OmitPagination<UserCollectionsVariables>,
  options?: UseInfiniteQueryOptions<CollectionFragmentExtended[], ClientError>
) {
  const { publicKey } = variables;
  return useInfiniteQuery(
    ['UserCollections', variables],
    ({ pageParam = 0 }) =>
      getUserCollections({
        ...variables,
        publicKey: maybeGetAddress(publicKey),
        limit: PUBLIC_FEED_PER_PAGE_COUNT,
        offset: PUBLIC_FEED_PER_PAGE_COUNT * pageParam,
      }),
    { ...options, enabled: Boolean(publicKey), getNextPageParam }
  );
}

export type MintableCollection = UserAvailableCollections['collections'][0];

export function useUserAvailableCollections(
  variables: Pick<UserAvailableCollectionsVariables, 'publicKey'>,
  options?: UseQueryOptions<
    UserAvailableCollections,
    ClientError,
    MintableCollection[]
  >
) {
  const { publicKey } = variables;
  return useUserAvailableCollectionsBaseHook(
    { publicKey },
    {
      ...options,
      enabled: isAllTrue([publicKey]),
      select: (res) => res.collections,
    }
  );
}

useUserAvailableCollections.getKey = (
  variables: Pick<UserAvailableCollectionsVariables, 'publicKey'>
) => ['UserMintableCollections', variables];
