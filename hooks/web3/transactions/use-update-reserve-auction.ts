import { UseMutationOptions } from 'react-query';
import { BigNumberish } from '@ethersproject/bignumber';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { toBNFixed } from 'utils/numbers';
import { getNFTMarketContract } from 'lib/contracts';
import { TransactionError } from 'components/transactions/generic/types';

type UpdateReserveAuctionArgs = [BigNumberish, BigNumberish];

export interface UpdateReserveAuctionVariables {
  auctionId: BigNumberish;
  reservePrice: number;
}

export default function useUpdateReserveAuction<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    UpdateReserveAuctionVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, auctionId } = variables;

    const reservePrice = toBNFixed(variables.reservePrice);

    const nftMarketContract = getNFTMarketContract(signer);

    const txArgs: UpdateReserveAuctionArgs = [auctionId, reservePrice];

    const estimatedGas =
      await nftMarketContract.estimateGas.updateReserveAuction(...txArgs);

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nftMarketContract.updateReserveAuction(...txArgs, txOptions);
  }, options);
}
