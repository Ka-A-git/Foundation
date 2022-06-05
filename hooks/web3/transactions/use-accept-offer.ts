import { UseMutationOptions } from 'react-query';
import { BigNumberish } from '@ethersproject/bignumber';
import { ContractTransaction, Overrides } from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketContract } from 'lib/contracts';
import { toBNFixed } from 'utils/numbers';
import { TransactionError } from 'components/transactions/generic/types';

type AcceptOfferArgs = [string, BigNumberish, string, BigNumberish];

export interface AcceptOfferVariables {
  contractAddress: string;
  tokenId: BigNumberish;
  offerFrom: string;
  amount: BigNumberish;
}

export default function useAcceptOffer<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    AcceptOfferVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, tokenId, contractAddress, offerFrom } = variables;

    const amount = toBNFixed(variables.amount);

    const nftMarketContract = getNFTMarketContract(signer);

    const txArgs: AcceptOfferArgs = [
      contractAddress,
      tokenId,
      offerFrom,
      amount,
    ];

    const estimatedGas = await nftMarketContract.estimateGas.acceptOffer(
      ...txArgs
    );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    return await nftMarketContract.acceptOffer(...txArgs, txOptions);
  }, options);
}
