import { UseMutationOptions } from 'react-query';
import { BigNumberish } from '@ethersproject/bignumber';
import {
  ContractTransaction,
  PayableOverrides,
} from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketContract } from 'lib/contracts';
import { toBNFixed } from 'utils/numbers';
import { TransactionError } from 'components/transactions/generic/types';

type BuyNowArgs = [string, BigNumberish, BigNumberish, string];

export interface BuyNowVariables {
  contractAddress: string;
  tokenId: BigNumberish;
  buyNowPrice: number;
  payableAddress: string;
}

export default function useBuyNow<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    BuyNowVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, tokenId, contractAddress, payableAddress } = variables;

    const buyNowPrice = toBNFixed(variables.buyNowPrice);

    const nftMarketContract = getNFTMarketContract(signer);

    const txArgs: BuyNowArgs = [
      contractAddress,
      tokenId,
      buyNowPrice,
      payableAddress,
    ];

    const estimatedGas = await nftMarketContract.estimateGas.buyV2(...txArgs, {
      value: buyNowPrice,
    });

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: PayableOverrides = {
      gasLimit: gasLimit.toString(),
      value: buyNowPrice,
    };

    return await nftMarketContract.buyV2(...txArgs, txOptions);
  }, options);
}
