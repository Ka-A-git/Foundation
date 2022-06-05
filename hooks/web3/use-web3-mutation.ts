import { useMutation, UseMutationOptions } from 'react-query';
import { BaseProvider } from '@ethersproject/providers';
import { useProvider, useSigner } from 'wagmi';
import { Signer } from 'ethers';

type WithProvider<T> = T & {
  signer: Signer;
  provider: BaseProvider;
};

export default function useWeb3Mutation<
  TData,
  TError,
  TVariables,
  TContext = unknown
>(
  mutateAsync: (arg0: WithProvider<TVariables>) => Promise<TData>,
  options?: UseMutationOptions<
    TData,
    TError,
    WithProvider<TVariables>,
    TContext
  >
) {
  const [{ data: signer }] = useSigner();
  const provider = useProvider();

  return useMutation<TData, TError, TVariables>(async (variables) => {
    // re-activate the provider when it’s not found
    if (!signer) {
      throw Error('No Provider Error');
    }
    return await mutateAsync({
      ...variables,
      signer,
      provider,
    });
  }, options);
}
