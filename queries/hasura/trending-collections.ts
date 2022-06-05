import {
  TrendingCollectionsDocument,
  TrendingCollections,
  TrendingCollectionsVariables,
} from 'graphql/hasura/queries/trending-collections.generated';

import { fndHasuraClient } from 'lib/clients/graphql';

export async function getTrendingCollections(
  variables: TrendingCollectionsVariables
) {
  const client = fndHasuraClient();

  const query = await client.request<
    TrendingCollections,
    TrendingCollectionsVariables
  >(TrendingCollectionsDocument, variables);

  return query.trendingCollections;
}
