import { getFirstValue } from 'utils/helpers';

import { fndHasuraClient } from 'lib/clients/graphql';

import {
  UserByPublicKey,
  UserByPublicKeyDocument,
  UserByPublicKeyVariables,
} from 'graphql/hasura/queries/user-by-public-key.generated';

import {
  UserByUsernameDocument,
  UserByUsername,
  UserByUsernameVariables,
} from 'graphql/hasura/queries/user-by-username.generated';

export async function getUserByPublicKey(variables: UserByPublicKeyVariables) {
  const client = fndHasuraClient();
  return await client.request<UserByPublicKey, UserByPublicKeyVariables>(
    UserByPublicKeyDocument,
    variables
  );
}

export async function getUserByUsername(variables: UserByUsernameVariables) {
  const client = fndHasuraClient();
  const query = await client.request<UserByUsername, UserByUsernameVariables>(
    UserByUsernameDocument,
    variables
  );
  return getFirstValue(query.users);
}
