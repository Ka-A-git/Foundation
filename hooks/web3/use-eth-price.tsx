import { useQuery, UseQueryOptions } from 'react-query';

import { QueryCacheKey } from 'types/Queries';

const ETH_USD_PRICE_URL =
  'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum';

interface EthereumPrice {
  ethereum: {
    usd: number;
  };
}

async function getEthPrice() {
  const res = await fetch(ETH_USD_PRICE_URL);
  if (res.status !== 200) {
    throw new Error('Price fetch error');
  }
  const data: EthereumPrice = await res.json();
  return data;
}

export default function useETHPrice(
  options?: UseQueryOptions<EthereumPrice, Error, number>
) {
  return useQuery(useETHPrice.getKey(), getEthPrice, {
    ...options,
    select: (res) => res.ethereum.usd,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // 1hr in ms
    staleTime: 60 * 60 * 1000,
    retry: 10,
    retryDelay: 2500,
  });
}

useETHPrice.getKey = () => [QueryCacheKey.ETHPrice];
