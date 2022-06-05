import { useQueryClient, UseMutationOptions } from 'react-query';
import * as Sentry from '@sentry/nextjs';

import { getError } from 'utils/helpers';
import { disconnectWalletSession } from 'lib/auth';

import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';

import {
  useUpsertUser as useUpsertUserBaseHook,
  UpsertUser,
  UpsertUserVariables,
} from 'graphql/server/mutations/upsert-user.generated';

import {
  useUserWithEmailByPublicKey,
  UserWithEmailByPublicKey,
} from 'graphql/server/queries/user-with-email-by-public-key.generated';

export default function useUpsertUser(
  options?: UseMutationOptions<UpsertUser, Error, UpsertUserVariables>
) {
  const queryClient = useQueryClient();

  return useUpsertUserBaseHook({
    ...options,
    onSuccess: async (data) => {
      const publicKey = data.upsertUser.publicKey;

      queryClient.setQueryData<UserWithEmailByPublicKey>(
        useUserWithEmailByPublicKey.getKey({ publicKey }),
        { user: data.upsertUser }
      );
      await queryClient.invalidateQueries(
        useUserByPublicKey.getKey({ publicKey })
      );
    },
    onError: async (error) => {
      await disconnectWalletSession();
      Sentry.captureException(getError(error));
    },
  });
}
