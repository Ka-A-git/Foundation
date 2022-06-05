const etherscanAddresses = {
  // Mainnet
  1: 'https://etherscan.io',
  // Ropsten
  3: 'https://ropsten.etherscan.io',
  // Rinkeby
  4: 'https://rinkeby.etherscan.io',
  // Goerli
  5: 'https://goerli.etherscan.io',
  // Sokol
  77: 'https://blockscout.com/poa/sokol',
  // xDai
  100: 'https://blockscout.com/poa/xdai',
};

// We want an exception if there's no etherscan address returned
export function getEtherscanAddress(chainId: number): string {
  return etherscanAddresses[chainId];
}

export function buildEtherscanLink(path: string, chainId?: number): string {
  const NEXT_PUBLIC_CHAIN_ID = Number(
    chainId ?? process.env.NEXT_PUBLIC_CHAIN_ID
  );
  const etherscanAddress = getEtherscanAddress(NEXT_PUBLIC_CHAIN_ID);
  const etherscanURL = new URL(path, etherscanAddress);
  return etherscanURL.href;
}

/**
 * Note: does not work in non-prod environments because etherscan
 * test networks are not supported on etherscan)
 */
export function buildEtherscanNFTLink(
  contractAddress: string,
  tokenId: number
): string {
  return buildEtherscanLink(`/nft/${contractAddress}/${tokenId}`);
}
