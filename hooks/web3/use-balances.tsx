import { BigNumber } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query'; 
import { useProvider } from 'wagmi';
import { CallOverrides } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';

import { getMiddlewareContractToRead } from 'lib/contracts';
import { fromBNDec } from 'utils/numbers';

import { QueryCacheKey } from 'types/Queries';

export interface GetBalancesVariables { 
  publicKey: string;
  overrides?: CallOverrides;
}
 
type GetBalances = [BigNumber, BigNumber, BigNumber, string];

type UserBalances = {
  ethBalance: number;
  availableFethBalance: number;
  lockedFethBalance: number;
};

export default function useBalances<TError = Error>(
  variables: GetBalancesVariables,
  options?: UseQueryOptions<GetBalances, TError, UserBalances>
) {
  const provider = useProvider();

  return useQuery(
    useBalances.getKey(variables),
    () =>
      getBalances({
        publicKey: variables?.publicKey,
        provider,
        overrides: variables?.overrides,
      }),
    {
      ...options,
      enabled: Boolean(variables?.publicKey),
      select: (res) => {
        return {
          ethBalance: fromBNDec(res[0]),
          availableFethBalance: fromBNDec(res[1]),
          lockedFethBalance: fromBNDec(res[2]),
        };
      },
    }
  );
}

useBalances.getKey = (variables: GetBalancesVariables) => [
  QueryCacheKey.Balances,
  variables,
];

interface GetBalancesArgs {
  publicKey: string;
  provider: BaseProvider;
  overrides?: CallOverrides;
}

async function getBalances({
  publicKey,
  provider,
  overrides,
}: GetBalancesArgs) {
  const fndMiddlewareContract = getMiddlewareContractToRead(provider);

  return overrides
    ? await fndMiddlewareContract.getAccountInfo(publicKey, overrides)
    : await fndMiddlewareContract.getAccountInfo(publicKey);
}
