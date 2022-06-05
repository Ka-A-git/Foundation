import { fndHasuraClient } from 'lib/clients/graphql';

import {
  UserCollectorsVariables,
  UserCollectors,
  UserCollectorsDocument,
} from 'graphql/hasura/queries/user-collectors.generated';

export async function getUserCollectors(variables: UserCollectorsVariables) {
  const client = fndHasuraClient();

  const query = await client.request<UserCollectors, UserCollectorsVariables>(
    UserCollectorsDocument,
    variables
  );
  return query.collectors;
}
