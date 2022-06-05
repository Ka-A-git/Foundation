import { UseMutationOptions } from 'react-query';
import { BigNumberish } from '@ethersproject/bignumber';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketContract } from 'lib/contracts';
import { toBNFixed } from 'utils/numbers';
import { TransactionError } from 'components/transactions/generic/types';

type SetBuyNowPriceArgs = [string, BigNumberish, BigNumberish];

export interface SetBuyNowPriceVariables {
  contractAddress: string;
  tokenId: BigNumberish;
  buyNowPrice: BigNumberish;
}

export default function useSetBuyNowPrice<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    SetBuyNowPriceVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, tokenId, contractAddress } = variables;

    const buyNowPrice = toBNFixed(variables.buyNowPrice);

    const nftMarketContract = getNFTMarketContract(signer);

    const txArgs: SetBuyNowPriceArgs = [contractAddress, tokenId, buyNowPrice];

    const estimatedGas = await nftMarketContract.estimateGas.setBuyPrice(
      ...txArgs
    );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nftMarketContract.setBuyPrice(...txArgs, txOptions);
  }, options);
}
