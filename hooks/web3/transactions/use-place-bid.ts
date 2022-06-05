import { UseMutationOptions } from 'react-query';
import { BigNumberish } from 'ethers';
import {
  ContractTransaction,
  PayableOverrides,
} from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { toBNFixed } from 'utils/numbers';
import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketContract } from 'lib/contracts';

import { TransactionError } from 'components/transactions/generic/types';

export interface PlaceBidVariables {
  auctionId: number;
  amount: BigNumberish;
}

export default function usePlaceBid<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    PlaceBidVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, auctionId, amount } = variables;

    const txArg = auctionId;
    const txValue = toBNFixed(amount);

    const nftMarketContract = getNFTMarketContract(signer);

    const estimatedGas = await nftMarketContract.estimateGas.placeBid(txArg, {
      value: txValue,
    });

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: PayableOverrides = {
      gasLimit: gasLimit.toString(),
      value: txValue,
    };

    return await nftMarketContract.placeBid(txArg, txOptions);
  }, options);
}
