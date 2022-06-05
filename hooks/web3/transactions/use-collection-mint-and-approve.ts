import { UseMutationOptions } from 'react-query';
import { useSigner } from 'wagmi';
import {
  Contract,
  ContractInterface,
  ContractTransaction,
  Overrides,
} from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import useWeb3Mutation from 'hooks/web3/use-web3-mutation';

import { calculateGasMargin } from 'utils/gas';
import { getNFTMarketAddress } from 'lib/addresses';

interface CollectionMintAndApproveVariables {
  contractAddress: string;
  ipfsPath: string;
}

export default function useCollectionMintAndApprove<
  TError = Error,
  TContext = unknown
>(
  options?: UseMutationOptions<
    ContractTransaction,
    TError,
    CollectionMintAndApproveVariables,
    TContext
  >
) {
  const [{ data: signer }] = useSigner();

  return useWeb3Mutation(async (variables) => {
    const { contractAddress, ipfsPath } = variables;

    const nft721Contract = getCollectionContract({ signer, contractAddress });

    const estimatedGas = await nft721Contract.estimateGas.mintAndApprove(
      ipfsPath,
      getNFTMarketAddress()
    );

    const gasLimit = calculateGasMargin(estimatedGas);

    const txOptions: Overrides = {
      gasLimit: gasLimit.toString(),
    };

    const transaction: ContractTransaction =
      await nft721Contract.mintAndApprove(
        ipfsPath,
        getNFTMarketAddress(),
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
      {
        internalType: 'string',
        name: 'tokenIPFSPath',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'market',
        type: 'address',
      },
    ],
    name: 'mintAndApprove',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
