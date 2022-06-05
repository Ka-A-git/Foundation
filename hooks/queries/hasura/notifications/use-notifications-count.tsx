import { UseQueryOptions } from 'react-query';

import { isAllTrue } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

import {
  UserNotificationsCount,
  UserNotificationsCountVariables,
  useUserNotificationsCount,
} from 'graphql/hasura/queries/user-notifications-count.generated';

export default function useNotificationsCount(
  variables: UserNotificationsCountVariables,
  options?: UseQueryOptions<UserNotificationsCount, Error>
) {
  return useUserNotificationsCount(variables, {
    ...options,
    enabled: isAllTrue([isQueryEnabled(options), ...Object.values(variables)]),
  });
}
