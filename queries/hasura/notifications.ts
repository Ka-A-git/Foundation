import { fndHasuraClient } from 'lib/clients/graphql';

import {
  UserNotificationsFollowsDocument,
  UserNotificationsFollows,
  UserNotificationsFollowsVariables,
} from 'graphql/hasura/queries/user-notifications-follows.generated';

export async function getNotificationsFollows(
  variables: UserNotificationsFollowsVariables
) {
  const { publicKey, limit, offset } = variables;

  const client = fndHasuraClient();

  const query = await client.request<
    UserNotificationsFollows,
    UserNotificationsFollowsVariables
  >(UserNotificationsFollowsDocument, { publicKey, limit, offset });

  return query.follow;
}
