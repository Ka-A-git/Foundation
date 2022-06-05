import { useMutation, UseMutationOptions } from 'react-query';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

import { disconnectWalletSession } from 'lib/auth';

import { isAuthenticatedRoute } from 'utils/auth';

interface DisconnectWallet {
  done: boolean;
}

export default function useDisconnectWallet(
  options?: UseMutationOptions<DisconnectWallet, Error>
) {
  const [, disconnect] = useAccount();

  const router = useRouter();

  return useMutation(
    async () => {
      disconnect();
      return await disconnectWalletSession();
    },
    {
      ...options,
      onSuccess: async () => {
        const isAuthRoute = isAuthenticatedRoute(router.pathname);

        if (isAuthRoute) {
          await router.push('/');
        }
      },
    }
  );
}
