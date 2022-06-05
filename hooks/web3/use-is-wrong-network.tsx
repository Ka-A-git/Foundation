import { useNetwork } from 'wagmi';

import getChainId from 'lib/chainId';

export default function useIsWrongNetwork() {
  const [{ data, loading: isLoading }] = useNetwork();

  const isWrongNetwork = data.chain && data?.chain?.id !== getChainId();

  return [isWrongNetwork, isLoading];
}
