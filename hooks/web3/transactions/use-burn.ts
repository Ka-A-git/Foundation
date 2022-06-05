import { UseMutationOptions } from 'react-query';
import { BigNumberish } from '@ethersproject/bignumber';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFT721Contract } from 'lib/contracts';
import { TransactionError } from 'components/transactions/generic/types';

export interface BurnVariables {
  tokenId: BigNumberish;
  contractAddress: string;
}

export default function useBurn<TError = TransactionError, TContext = unknown>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    BurnVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, tokenId, contractAddress } = variables;

    const nft721Contract = getNFT721Contract({ contractAddress, signer });

    const estimatedGas = await nft721Contract.estimateGas.burn(tokenId);

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nft721Contract.burn(tokenId, txOptions);
  }, options);
}
