import { UseQueryOptions } from 'react-query';

import {
  ArtworkByContractTokenId,
  useArtworkByContractTokenId as useArtworkByContractTokenIdBaseHook,
} from 'graphql/hasura/queries/artwork-by-contract-token-id.generated';

import useTransactionParams from 'hooks/use-transaction-params';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { getFirstValue, isAllTrue, isNumber } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

interface UseArtworkByContractTokenIdVariables {
  contractSlug: string;
  tokenId: number;
}

export default function useArtworkByContractTokenId(
  variables: UseArtworkByContractTokenIdVariables,
  options?: UseQueryOptions<
    ArtworkByContractTokenId,
    Error,
    ArtworkFragmentExtended
  >
) {
  return useArtworkByContractTokenIdBaseHook(
    { tokenId: variables.tokenId, contractSlug: variables.contractSlug },
    {
      ...options,
      enabled: isAllTrue([
        variables.contractSlug,
        isNumber(variables.tokenId),
        isQueryEnabled(options),
      ]),
      select: (res) => getFirstValue(res.artworks),
    }
  );
}

useArtworkByContractTokenId.getKey = useArtworkByContractTokenIdBaseHook.getKey;

export function useArtworkByContractTokenIdFromRouter(
  options?: UseQueryOptions<
    ArtworkByContractTokenId,
    Error,
    ArtworkFragmentExtended
  >
) {
  const { contractSlug, tokenId } = useTransactionParams();
  return useArtworkByContractTokenId(
    { contractSlug, tokenId: Number(tokenId) },
    options
  );
}
