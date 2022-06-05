import {
  getNFTMarketAddress,
  getNFT721Address,
  getSplitAddress,
  getFETHAddress,
  getMiddlewareAddress,
} from 'lib/addresses';
import { Signer } from '@ethersproject/abstract-signer';
import { BaseProvider } from '@ethersproject/providers';

import {
  FNDNFT721__factory,
  FNDNFTMarket__factory,
  FNDNFTMarket,
  FNDNFT721,
  PercentSplitETH,
  PercentSplitETH__factory,
  FETH,
  FETH__factory,
  FNDMiddleware,
  FNDMiddleware__factory,
} from 'types/contracts';
import { isAllTrue } from 'utils/helpers';

const nftMarketAddr = getNFTMarketAddress();
const nft721Addr = getNFT721Address();
const splitAddr = getSplitAddress();
const fethAddr = getFETHAddress();
const middlewareAddr = getMiddlewareAddress();

type ContractMap<T> = Record<string, T>;

// contracts are now 1 of n so we cache them by address
const nft721Contract: ContractMap<FNDNFT721> = {};
const nft721ContractToRead: ContractMap<FNDNFT721> = {};
// these contracts are 1 of 1
let nftMarketContract: FNDNFTMarket;
let nftMarketContractToRead: FNDNFTMarket;
let middlewareContractToRead: FNDMiddleware;
let splitContractToRead: PercentSplitETH;
let fethContract: FETH;
let fethContractToRead: FETH;

export function getNFTMarketContract(signer: Signer): FNDNFTMarket {
  const canAssignContract = isAllTrue([!nftMarketContract, signer]);

  if (canAssignContract) {
    nftMarketContract = FNDNFTMarket__factory.connect(nftMarketAddr, signer);
  }
  return nftMarketContract;
}

export function getNFTMarketContractToRead(
  provider: BaseProvider
): FNDNFTMarket {
  const canAssignContract = isAllTrue([!nftMarketContractToRead, provider]);

  if (canAssignContract) {
    nftMarketContractToRead = FNDNFTMarket__factory.connect(
      nftMarketAddr,
      provider
    );
  }
  return nftMarketContractToRead;
}

interface GetNFT721ContractArgs {
  signer: Signer;
  contractAddress?: string;
}

export function getNFT721Contract({
  signer,
  contractAddress = nft721Addr,
}: GetNFT721ContractArgs): FNDNFT721 {
  const contract = nft721Contract[contractAddress];

  const canAssignContract = isAllTrue([!contract, signer, contractAddress]);

  if (canAssignContract) {
    nft721Contract[contractAddress] = FNDNFT721__factory.connect(
      contractAddress,
      signer
    );
  }
  return nft721Contract[contractAddress];
}

interface GetNFT721ContractToReadArgs {
  provider: BaseProvider;
  contractAddress: string;
}

export function getNFT721ContractToRead({
  provider,
  contractAddress,
}: GetNFT721ContractToReadArgs): FNDNFT721 {
  const contract = nft721ContractToRead[contractAddress];

  const canAssignContract = isAllTrue([!contract, provider, contractAddress]);

  if (canAssignContract) {
    nft721ContractToRead[contractAddress] = FNDNFT721__factory.connect(
      contractAddress,
      provider
    );
  }
  return nft721ContractToRead[contractAddress];
}

export function getSplitContractToRead(
  provider: BaseProvider
): PercentSplitETH {
  const canAssignContract = isAllTrue([!splitContractToRead, provider]);

  if (canAssignContract) {
    splitContractToRead = PercentSplitETH__factory.connect(splitAddr, provider);
  }
  return splitContractToRead;
}

export function getFETHContract(signer: Signer): FETH {
  const canAssignContract = isAllTrue([!fethContract, signer]);

  if (canAssignContract) {
    fethContract = FETH__factory.connect(fethAddr, signer);
  }
  return fethContract;
}

export function getFETHContractToRead(provider: BaseProvider): FETH {
  const canAssignContract = isAllTrue([!fethContractToRead, provider]);

  if (canAssignContract) {
    fethContractToRead = FETH__factory.connect(fethAddr, provider);
  }
  return fethContractToRead;
}

export function getMiddlewareContractToRead(
  provider: BaseProvider
): FNDMiddleware {
  const canAssignContract = isAllTrue([!middlewareContractToRead, provider]);

  if (canAssignContract) {
    middlewareContractToRead = FNDMiddleware__factory.connect(
      middlewareAddr,
      provider
    );
  }
  return middlewareContractToRead;
}
