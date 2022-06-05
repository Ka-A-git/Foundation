import { UseMutationOptions } from 'react-query';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketContract } from 'lib/contracts';
import { TransactionError } from 'components/transactions/generic/types';

export interface CancelReserveAuctionVariables {
  auctionId: number;
}

export default function useCancelReserveAuction<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    CancelReserveAuctionVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, auctionId } = variables;

    const nftMarketContract = getNFTMarketContract(signer);

    const estimatedGas =
      await nftMarketContract.estimateGas.cancelReserveAuction(auctionId);

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nftMarketContract.cancelReserveAuction(auctionId, txOptions);
  }, options);
}
