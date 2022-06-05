import {
  CollectionByContractSlugDocument,
  CollectionByContractSlug,
  CollectionByContractSlugVariables,
} from 'graphql/hasura/queries/collection-by-contract-slug.generated';

import {
  CollectionsBySlugs,
  CollectionsBySlugsDocument,
  CollectionsBySlugsVariables,
} from 'graphql/hasura/queries/collections-by-slugs.generated';

import {
  CollectionStats,
  CollectionStatsDocument,
  CollectionStatsVariables,
} from 'graphql/hasura/queries/collection-stats.generated';
import {
  CollectionUniqueness,
  CollectionUniquenessDocument,
  CollectionUniquenessVariables,
} from 'graphql/hasura/queries/collection-uniqueness.generated';

import {
  CollectionsVariables,
  CollectionsDocument,
  Collections,
} from 'graphql/hasura/queries/collections.generated';

import { fndHasuraClient } from 'lib/clients/graphql';
import { getFirstValue } from 'utils/helpers';

export async function getCollectionByContractSlug(
  variables: CollectionByContractSlugVariables
) {
  const client = fndHasuraClient();
  const query = await client.request<
    CollectionByContractSlug,
    CollectionByContractSlugVariables
  >(CollectionByContractSlugDocument, variables);
  return getFirstValue(query.collections);
}

export async function getCollectionStats(variables: CollectionStatsVariables) {
  const client = fndHasuraClient();
  return await client.request<CollectionStats, CollectionStatsVariables>(
    CollectionStatsDocument,
    variables
  );
}

export async function getCollections(
  variables: Omit<CollectionsVariables, 'excludeSlugs'>
) {
  const client = fndHasuraClient();
  const query = await client.request<Collections, CollectionsVariables>(
    CollectionsDocument,
    { ...variables, excludeSlugs: ['~', 'foundation'] }
  );
  return query.collections;
}

export async function getUniqueCollectionByContractSlug(
  variables: CollectionUniquenessVariables
) {
  const client = fndHasuraClient();
  const query = await client.request<
    CollectionUniqueness,
    CollectionUniquenessVariables
  >(CollectionUniquenessDocument, variables);
  return getFirstValue(query.collections);
}

export async function getCollectionsBySlugs(
  variables: CollectionsBySlugsVariables
) {
  const client = fndHasuraClient();
  const query = await client.request<
    CollectionsBySlugs,
    CollectionsBySlugsVariables
  >(CollectionsBySlugsDocument, variables);
  return query.collections;
}
