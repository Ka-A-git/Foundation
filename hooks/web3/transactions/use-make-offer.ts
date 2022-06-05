import { UseMutationOptions } from 'react-query';
import { BigNumberish, BigNumber } from '@ethersproject/bignumber';
import {
  ContractTransaction,
  PayableOverrides,
} from '@ethersproject/contracts';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketContract } from 'lib/contracts';
import { toBNFixed } from 'utils/numbers';
import { TransactionError } from 'components/transactions/generic/types';

type MakeOfferArgs = [string, BigNumberish, BigNumberish];

export interface MakeOfferVariables {
  contractAddress: string;
  tokenId: BigNumberish;
  amount: BigNumberish;
  fethBalance: BigNumberish;
}

export default function useMakeOffer<
  TError = TransactionError,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    MakeOfferVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { signer, tokenId, contractAddress } = variables;

    const amount = toBNFixed(variables.amount);
    const fethBalance = toBNFixed(variables.fethBalance);

    // TODO: abstract this into a tested function
    const fethBn = BigNumber.from(fethBalance);
    const amountBn = BigNumber.from(amount);
    const txValue = amountBn.lte(fethBn)
      ? toBNFixed(0)
      : amountBn.sub(fethBn).toString();

    const nftMarketContract = getNFTMarketContract(signer);

    const txArgs: MakeOfferArgs = [contractAddress, tokenId, amount];

    const estimatedGas = await nftMarketContract.estimateGas.makeOffer(
      ...txArgs,
      { value: txValue }
    );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: PayableOverrides = {
      gasLimit: gasLimit.toString(),
      value: txValue,
    };

    return await nftMarketContract.makeOffer(...txArgs, txOptions);
  }, options);
}
