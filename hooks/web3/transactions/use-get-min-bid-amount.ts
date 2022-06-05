import { useQuery, UseQueryOptions } from 'react-query';
import { BigNumber } from '@ethersproject/bignumber';
import { useProvider } from 'wagmi';

import { getNFTMarketContractToRead } from 'lib/contracts';

import { isQueryEnabled } from 'hooks/queries/shared';

import { isAllTrue } from 'utils/helpers';
import { fromBNDec } from 'utils/numbers';

export interface GetMinBidAmountVariables {
  auctionId: number;
}

export default function useGetMinBidAmount<TError = Error>(
  variables: GetMinBidAmountVariables,
  options?: UseQueryOptions<BigNumber, TError, number>
) {
  const provider = useProvider();

  const { auctionId } = variables;

  return useQuery(
    useGetMinBidAmount.getKey(variables),
    async () => {
      const nftMarketContract = getNFTMarketContractToRead(provider);
      return await nftMarketContract.getMinBidAmount(auctionId);
    },
    {
      ...options,
      select: fromBNDec,
      enabled: isAllTrue([
        ...Object.values(variables),
        isQueryEnabled(options),
        provider,
      ]),
    }
  );
}

useGetMinBidAmount.getKey = (variables: GetMinBidAmountVariables) => [
  'GetMinBidAmount',
  variables,
];
