import { UseMutationOptions } from 'react-query';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';

import { getNFT721Contract } from 'lib/contracts';

interface MintAndApproveMarketVariables {
  ipfsPath: string;
}

export default function useMintAndApproveMarket<
  TError = Error,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    MintAndApproveMarketVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, ipfsPath } = variables;

    const nft721Contract = getNFT721Contract({ signer });

    const estimatedGas = await nft721Contract.estimateGas.mintAndApproveMarket(
      ipfsPath
    );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nft721Contract.mintAndApproveMarket(ipfsPath, txOptions);
  }, options);
}
