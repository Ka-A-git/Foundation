import { UseMutationOptions } from 'react-query';
import { BigNumberish } from '@ethersproject/bignumber';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFT721Contract } from 'lib/contracts';
import { TransactionError } from 'components/transactions/generic/types';

type TransferArgs = [string, string, BigNumberish];

export interface TransferVariables {
  contractAddress: string;
  transferTo: string;
  tokenId: number;
}

export default function useTransfer<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    TransferVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, contractAddress, transferTo, tokenId } = variables;

    const nftMarketContract = getNFT721Contract({ signer, contractAddress });

    const transferFrom = await signer.getAddress();

    const txArgs: TransferArgs = [transferFrom, transferTo, tokenId];

    const estimatedGas = await nftMarketContract.estimateGas[
      'safeTransferFrom(address,address,uint256)'
    ](...txArgs);

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nftMarketContract['safeTransferFrom(address,address,uint256)'](
      ...txArgs,
      txOptions
    );
  }, options);
}
