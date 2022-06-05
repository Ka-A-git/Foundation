import { ContractTransaction, Overrides } from '@ethersproject/contracts';
import { UseMutationOptions } from 'react-query';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { getCollectionFactoryAddress } from 'lib/addresses';
import { calculateGasMargin } from 'utils/gas';
import { FNDCollectionFactory__factory } from 'types/contracts';
import { TransactionError } from 'components/transactions/generic/types';

interface DeployCollectionVariables {
  name: string;
  symbol: string;
  nonce: number;
}

type DeployCollectionArgs = [string, string, number];

export default function useDeployCollection<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    DeployCollectionVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, name, symbol, nonce } = variables;

    const collectionFactory = FNDCollectionFactory__factory.connect(
      getCollectionFactoryAddress(),
      signer
    );

    const txArgs: DeployCollectionArgs = [name, symbol, nonce];

    const estimatedGas = await collectionFactory.estimateGas.createCollection(
      ...txArgs
    );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await collectionFactory.createCollection(...txArgs, txOptions);
  }, options);
}
