import { UseMutationOptions } from 'react-query';
import { BigNumberish } from '@ethersproject/bignumber';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketContract } from 'lib/contracts';
import { toBNFixed } from 'utils/numbers';
import { TransactionError } from 'components/transactions/generic/types';

type CreateReserveAuctionArgs = [string, BigNumberish, BigNumberish];

export interface CreateReserveAuctionVariables {
  contractAddress: string;
  tokenId: BigNumberish;
  reservePrice: BigNumberish;
}

export default function useCreateReserveAuction<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    CreateReserveAuctionVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, tokenId, contractAddress } = variables;

    const reservePrice = toBNFixed(variables.reservePrice);

    const nftMarketContract = getNFTMarketContract(signer);

    const txArgs: CreateReserveAuctionArgs = [
      contractAddress,
      tokenId,
      reservePrice,
    ];

    const estimatedGas =
      await nftMarketContract.estimateGas.createReserveAuction(...txArgs);

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nftMarketContract.createReserveAuction(...txArgs, txOptions);
  }, options);
}
