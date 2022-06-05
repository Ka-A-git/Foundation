import getChainId from 'lib/chainId';
import addresses from '@f8n/f8n-contracts/addresses';

// TODO: Make this dynamic based on env (staging vs. prod, and chainId)
const deploymentEnv = process.env.NEXT_PUBLIC_APP_ENV;

const contractAddressEnv = deploymentEnv === 'production' ? 'prod' : 'staging';

// Don't use get() - we want an exception if there's no address returned or if internally
// there's an incorrect chain returned
export function getAddress(contractName: string): string {
  const chainId = getChainId();
  return addresses[contractAddressEnv][chainId][contractName];
}

// NFT Market
export function getNFTMarketAddress(): string {
  return getAddress('nftMarket');
}

// NFT Contract
export function getNFT721Address(): string {
  return getAddress('nft721');
}

// Split
export function getSplitAddress(): string {
  return getAddress('percentSplit');
}

// Collection Factory
export function getCollectionFactoryAddress(): string {
  return getAddress('collectionFactory');
}

// FETH Contract
export function getFETHAddress(): string {
  return getAddress('feth');
}

// Middleware Contract
export function getMiddlewareAddress(): string {
  return getAddress('middleware');
}

const superrareAddresses = {
  1: '0xb932a70A57673d89f4acfFBE830E8ed7f75Fb9e0',
  5: '0xCD8f7154FBD7FD38cC5eF783b2965289777fca92',
};

// Superrare Contract
export function getSuperrareAddress() {
  const chainId = getChainId();
  return superrareAddresses[chainId];
}
