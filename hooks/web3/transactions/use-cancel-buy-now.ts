import { UseMutationOptions } from 'react-query';
import { BigNumberish } from '@ethersproject/bignumber';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketContract } from 'lib/contracts';
import { TransactionError } from 'components/transactions/generic/types';

type CancelBuyNowArgs = [string, BigNumberish];

export interface CancelBuyNowVariables {
  contractAddress: string;
  tokenId: BigNumberish;
}

export default function useCancelBuyNow<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    CancelBuyNowVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, tokenId, contractAddress } = variables;

    const nftMarketContract = getNFTMarketContract(signer);

    const txArgs: CancelBuyNowArgs = [contractAddress, tokenId];

    const estimatedGas = await nftMarketContract.estimateGas.cancelBuyPrice(
      ...txArgs
    );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nftMarketContract.cancelBuyPrice(...txArgs, txOptions);
  }, options);
}
