import { UseMutationOptions } from 'react-query';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';
import { BigNumberish } from '@ethersproject/bignumber';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketContract } from 'lib/contracts';

import { TransactionError } from 'components/transactions/generic/types';

export interface FinalizeReserveAuctionVariables {
  auctionId: BigNumberish;
}

export default function useFinalizeReserveAuction<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    FinalizeReserveAuctionVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, auctionId } = variables;

    const nftMarketContract = getNFTMarketContract(signer);

    const estimatedGas =
      await nftMarketContract.estimateGas.finalizeReserveAuction(auctionId);

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nftMarketContract.finalizeReserveAuction(auctionId, txOptions);
  }, options);
}
