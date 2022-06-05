import { compose, flatten, isNil, map, paths, reject, uniq } from 'ramda';

import { ArtworkEvent } from 'types/Event';

import { getUsersByPublicKeys } from './hasura/users-v2';

export const getPublicKeysFromHistoryEvents = compose<
  ArtworkEvent[],
  string[][],
  string[],
  string[],
  string[]
>(
  reject(isNil),
  uniq,
  flatten,
  map<ArtworkEvent, string[]>(
    paths([
      ['data', 'fromAddress'],
      ['data', 'toAddress'],
    ])
  )
);

interface UsersFromHistoryEventsVariables {
  events: ArtworkEvent[];
}

export async function getUsersFromHistoryEvents(
  variables: UsersFromHistoryEventsVariables
) {
  return await getUsersByPublicKeys({
    publicKeys: getPublicKeysFromHistoryEvents(variables.events),
  });
}
