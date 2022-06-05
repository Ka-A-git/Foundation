import { UseMutationOptions } from 'react-query';
import { ContractTransaction, Overrides } from 'ethers';

import { getNFTMarketAddress } from 'lib/addresses';
import { getNFT721Contract, getNFT721ContractToRead } from 'lib/contracts';

import { calculateGasMargin } from 'utils/gas';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

export interface ApproveParams {
  contractAddress: string;
}

export default function useSetApprovalForAll<
  TError = Error,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    ApproveParams,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { contractAddress, signer, provider } = variables;

    const nft721Contract = getNFT721Contract({ signer, contractAddress });

    const nft721ContractForEstimation = getNFT721ContractToRead({
      provider: provider,
      contractAddress,
    });
    const nftMarketAddr = getNFTMarketAddress();

    const estimatedGas =
      await nft721ContractForEstimation.estimateGas.setApprovalForAll(
        nftMarketAddr,
        true
      );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nft721Contract.setApprovalForAll(
      nftMarketAddr,
      true,
      txOptions
    );
  }, options);
}
