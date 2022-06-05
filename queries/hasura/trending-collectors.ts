import {
  TrendingCollectorsDocument,
  TrendingCollectors,
  TrendingCollectorsVariables,
} from 'graphql/hasura/queries/trending-collectors.generated';

import { fndHasuraClient } from 'lib/clients/graphql';

export async function getTrendingCollectors(
  variables: TrendingCollectorsVariables
) {
  const client = fndHasuraClient();

  const query = await client.request<
    TrendingCollectors,
    TrendingCollectorsVariables
  >(TrendingCollectorsDocument, variables);

  return query.trendingCollectors;
}
