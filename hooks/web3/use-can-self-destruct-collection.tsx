import { useSigner } from 'wagmi';
import { UseQueryOptions, useQuery } from 'react-query';

import { CollectionContract__factory } from 'types/contracts';
import { QueryCacheKey } from 'types/Queries';

export default function useCanSelfDestructCollection(
  contractAddress: string,
  options?: UseQueryOptions
) {
  const [{ data: signer }] = useSigner();

  return useQuery(
    [QueryCacheKey.CanSelfDestructCollection, contractAddress],
    async () => {
      const collectionContract = CollectionContract__factory.connect(
        contractAddress,
        signer
      );

      const { estimateGas } = collectionContract;

      const estimatedGas = await estimateGas.selfDestruct();

      return estimatedGas;
    },
    { retry: false, ...options }
  );
}
