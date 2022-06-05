import { useRouter } from 'next/router';
import { getFirstValue } from 'utils/helpers';

export default function useTransactionParams() {
  const router = useRouter();

  return {
    txHash: getFirstValue(router.query.txHash),
    tokenId: getFirstValue(router.query.tokenId),
    contractSlug:
      getFirstValue(router.query.contractAddress) ??
      getFirstValue(router.query.addressOrSlug),
  };
}
