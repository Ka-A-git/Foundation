import {
  TrendingCreatorsDocument,
  TrendingCreators,
  TrendingCreatorsVariables,
} from 'graphql/hasura/queries/trending-creators.generated';

import { fndHasuraClient } from 'lib/clients/graphql';

export async function getTrendingCreators(
  variables: TrendingCreatorsVariables
) {
  const client = fndHasuraClient();

  const query = await client.request<
    TrendingCreators,
    TrendingCreatorsVariables
  >(TrendingCreatorsDocument, variables);

  return query.trendingCreators;
}
