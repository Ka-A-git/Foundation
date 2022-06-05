import { UseMutationOptions } from 'react-query';
import {
  Contract,
  ContractInterface,
  ContractTransaction,
  Overrides,
} from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';
import { BytesLike } from '@ethersproject/bytes';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { getSplitCallData } from 'hooks/web3/transactions/web3-utils';
import { calculateGasMargin } from 'utils/gas';

import { getNFTMarketAddress, getSplitAddress } from 'lib/addresses';

import { RevenueShare } from 'types/Share';

type CollectionMintWithSplitsArgs = [string, string, BytesLike, string];

interface CollectionMintWithSplitsVariables {
  ipfsPath: string;
  contractAddress: string;
  splits: RevenueShare[];
}

export default function useCollectionMintWithSplits<
  TError = Error,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    CollectionMintWithSplitsVariables,
    TContext
  >
) {
  return useWeb3Mutation(async (variables) => {
    const { provider, signer, ipfsPath, contractAddress, splits } = variables;

    const nft721Contract = getCollectionContract({ signer, contractAddress });

    const callData = getSplitCallData({ provider: provider, splits });

    const txArgs: CollectionMintWithSplitsArgs = [
      ipfsPath,
      getSplitAddress(),
      callData,
      getNFTMarketAddress(),
    ];

    const estimatedGas =
      await nft721Contract.estimateGas.mintWithCreatorPaymentFactoryAndApprove(
        ...txArgs
      );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    const transaction: ContractTransaction =
      await nft721Contract.mintWithCreatorPaymentFactoryAndApprove(
        ...txArgs,
        txOptions
      );
    return transaction;
  }, options);
}

interface CollectionContractArgs {
  signer: Signer;
  contractAddress: string;
}

function getCollectionContract(args: CollectionContractArgs) {
  return new Contract(
    args.contractAddress,
    COLLECTION_CONTRACT_ABI,
    args.signer
  );
}

const COLLECTION_CONTRACT_ABI: ContractInterface = [
  {
    inputs: [
      { internalType: 'string', name: 'tokenCID', type: 'string' },
      {
        internalType: 'address',
        name: 'paymentAddressFactory',
        type: 'address',
      },
      { internalType: 'bytes', name: 'paymentAddressCallData', type: 'bytes' },
      { internalType: 'address', name: 'operator', type: 'address' },
    ],
    name: 'mintWithCreatorPaymentFactoryAndApprove',
    outputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
