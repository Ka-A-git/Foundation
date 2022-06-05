import { useQuery, UseQueryOptions } from 'react-query';
import { BigNumberish, BigNumber } from '@ethersproject/bignumber';
import { useProvider } from 'wagmi';

import { getNFTMarketContractToRead } from 'lib/contracts';

import { isQueryEnabled } from 'hooks/queries/shared';

import { isAllTrue } from 'utils/helpers';
import { fromBNDec } from 'utils/numbers';

type GetMinOfferAmountArgs = [string, BigNumberish];

export interface GetMinOfferAmountVariables {
  contractAddress: string;
  tokenId: BigNumberish;
}

export default function useGetMinOfferAmount<TError = Error>(
  variables: GetMinOfferAmountVariables,
  options?: UseQueryOptions<BigNumber, TError, number>
) {
  const provider = useProvider();

  const { tokenId, contractAddress } = variables;

  return useQuery(
    useGetMinOfferAmount.getKey(variables),
    async () => {
      const nftMarketContract = getNFTMarketContractToRead(provider);
      const txArgs: GetMinOfferAmountArgs = [contractAddress, tokenId];
      return await nftMarketContract.getMinOfferAmount(...txArgs);
    },
    {
      ...options,
      select: (res) => {
        return res.eq(1) ? 0 : fromBNDec(res);
      },
      enabled: isAllTrue([
        ...Object.values(variables),
        isQueryEnabled(options),
        provider,
      ]),
      retry: false,
    }
  );
}

useGetMinOfferAmount.getKey = (variables: GetMinOfferAmountVariables) => [
  'GetMinOfferAmount',
  variables,
];
