import * as Sentry from '@sentry/nextjs';

import {
  UsersByPublicKeysDocument,
  UsersByPublicKeys,
  UsersByPublicKeysVariables,
} from 'graphql/hasura/queries/users-by-public-keys.generated';

import {
  UsersByUsernamesDocument,
  UsersByUsernames,
  UsersByUsernamesVariables,
} from 'graphql/hasura/queries/users-by-usernames.generated';

import { getUserByPublicKey } from './users';

import { fndHasuraClient } from 'lib/clients/graphql';
import { getPublicKeyAndMessageFromToken } from 'lib/api/auth';
import {
  UserCount,
  UserCountDocument,
} from 'graphql/hasura/queries/user-count.generated';

export async function getUsersByPublicKeys(
  variables: UsersByPublicKeysVariables
) {
  const client = fndHasuraClient();
  const query = await client.request<
    UsersByPublicKeys,
    UsersByPublicKeysVariables
  >(UsersByPublicKeysDocument, variables);
  return query.users;
}

export async function getUsersByUsernames(
  variables: UsersByUsernamesVariables
) {
  const client = fndHasuraClient();
  const query = await client.request<
    UsersByUsernames,
    UsersByUsernamesVariables
  >(UsersByUsernamesDocument, variables);
  return query.users;
}

interface UserByAuthTokenVariables {
  token: string;
}

export async function getUserByAuthToken(variables: UserByAuthTokenVariables) {
  try {
    const { publicKey } = await getPublicKeyAndMessageFromToken(
      variables.token
    );

    const query = await getUserByPublicKey({ publicKey });
    return query.user;
  } catch (err) {
    Sentry.captureException(err, {
      tags: { section: 'auth-flow', function: 'getUserByAuthToken' },
    });
    return null;
  }
}

export async function getUserCount() {
  const client = fndHasuraClient();
  const query = await client.request<UserCount>(UserCountDocument);
  return query.userCount.aggregate.count;
}
