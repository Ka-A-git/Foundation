import { useMutation, UseMutationOptions } from 'react-query';
import { Connector } from 'wagmi';

import { connectWalletSession } from 'lib/auth';

interface ConnectWalletSessionVariables {
  token: string;
  connector: Connector;
}

interface UseConnectWalletSessionData {
  done: boolean;
  token: string;
}

// TODO: update wallet user cache or refetch session
export default function useConnectWalletSession(
  options?: UseMutationOptions<
    UseConnectWalletSessionData,
    Error,
    ConnectWalletSessionVariables,
    unknown
  >
) {
  return useMutation(
    async (variables) => {
      const { token, connector } = variables;

      return await connectWalletSession({ token, connector });
    },
    {
      ...options,
    }
  );
}
