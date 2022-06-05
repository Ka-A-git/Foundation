import { UseQueryOptions } from 'react-query';

import {
  useUserSocialVerificationsCount,
  UserSocialVerificationsCount,
  UserSocialVerificationsCountVariables,
} from 'graphql/hasura/queries/user-social-verifications-count.generated';
import { isAllTrue } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

export default function useHasSocialVerification(
  variables: UserSocialVerificationsCountVariables,
  options?: UseQueryOptions<UserSocialVerificationsCount, Error, boolean>
) {
  return useUserSocialVerificationsCount(variables, {
    ...options,
    enabled: isAllTrue([isQueryEnabled(options), ...Object.values(variables)]),
    select: (res) => res.socialVerificationsCount.aggregate.count > 0,
  });
}
