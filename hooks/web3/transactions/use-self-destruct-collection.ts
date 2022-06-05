import { ContractTransaction, Overrides } from '@ethersproject/contracts';
import { UseMutationOptions } from 'react-query';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { CollectionContract__factory } from 'types/contracts';
import { TransactionError } from 'components/transactions/generic/types';

interface SelfDestructCollectionVariables {
  contractAddress: string;
}

export default function useSelfDestructCollection<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    SelfDestructCollectionVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { contractAddress, signer } = variables;

    const collectionContract = CollectionContract__factory.connect(
      contractAddress,
      signer
    );

    const { estimateGas } = collectionContract;

    const estimatedGas = await estimateGas.selfDestruct();

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await collectionContract.selfDestruct(txOptions);
  }, options);
}
