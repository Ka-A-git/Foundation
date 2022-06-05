import { UseMutationOptions } from 'react-query';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';
import { BytesLike } from '@ethersproject/bytes';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { getSplitCallData } from 'hooks/web3/transactions/web3-utils';
import { calculateGasMargin } from 'utils/gas';
import { getNFT721Contract } from 'lib/contracts';
import { getSplitAddress } from 'lib/addresses';

import { RevenueShare } from 'types/Share';
import { TransactionError } from 'components/transactions/generic/types';

type MintWithSplitsArgs = [string, string, BytesLike];

interface MintWithSplitsVariables {
  ipfsPath: string;
  splits: RevenueShare[];
}

export default function useMintWithSplits<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    MintWithSplitsVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { provider, signer, ipfsPath, splits } = variables;

    const nft721Contract = getNFT721Contract({ signer });

    const callData = getSplitCallData({ splits, provider: provider });

    const txArgs: MintWithSplitsArgs = [ipfsPath, getSplitAddress(), callData];

    const estimatedGas =
      await nft721Contract.estimateGas.mintWithCreatorPaymentFactoryAndApproveMarket(
        ...txArgs
      );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nft721Contract.mintWithCreatorPaymentFactoryAndApproveMarket(
      ...txArgs,
      txOptions
    );
  }, options);
}
