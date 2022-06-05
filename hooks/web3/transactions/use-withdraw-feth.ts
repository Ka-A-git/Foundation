import { UseMutationOptions } from 'react-query';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getFETHContract } from 'lib/contracts';
import { TransactionError } from 'components/transactions/generic/types';

export default function useWithdrawFeth<
  TError = TransactionError,
  TContext = unknown
>(options?: UseMutationOptions<ContractTransaction, TError, void, TContext>) {
  return useWeb3Mutation(async (variables) => {
    const { signer } = variables;

    const fethContract = getFETHContract(signer);

    const signerAddress = await signer.getAddress();

    const estimatedGas =
      await fethContract.estimateGas.withdrawAvailableBalance({
        from: signerAddress,
      });

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await fethContract.withdrawAvailableBalance(txOptions);
  }, options);
}
