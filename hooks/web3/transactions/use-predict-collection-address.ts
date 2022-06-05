import { useQuery, UseQueryOptions } from 'react-query';
import { useProvider } from 'wagmi';

import { getCollectionFactoryAddress } from 'lib/addresses';
import { isAllTrue } from 'utils/helpers';

import { FNDCollectionFactory__factory } from 'types/contracts';
import { isQueryEnabled } from 'hooks/queries/shared';

interface PredictCollectionAddressVariables {
  creatorAddress: string;
  nonce: number;
}

export default function usePredictCollectionAddress(
  variables: PredictCollectionAddressVariables,
  options?: UseQueryOptions<string, Error>
) {
  const provider = useProvider();

  return useQuery(
    usePredictCollectionAddress.getKey(variables),
    async () => {
      const collectionFactory = FNDCollectionFactory__factory.connect(
        getCollectionFactoryAddress(),
        provider
      );
      return await collectionFactory.predictCollectionAddress(
        variables.creatorAddress,
        variables.nonce
      );
    },
    {
      ...options,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: isAllTrue([
        provider,
        isQueryEnabled(options),
        ...Object.values(variables),
      ]),
    }
  );
}

usePredictCollectionAddress.getKey = (
  variables: PredictCollectionAddressVariables
) => ['PredictCollectionAddress', variables];
