import { UseQueryOptions } from 'react-query';
import { pathOr } from 'ramda';

import {
  useOffersByStatus as useOffersByStatusBaseHook,
  OffersByStatusVariables,
  OffersByStatus,
} from 'graphql/hasura/queries/offers-by-status.generated';

import { isAllTrue } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

type ArtworkOffer = OffersByStatus['artworks'][0]['offers'][0];

export default function useOfferByStatus(
  variables: OffersByStatusVariables,
  options?: UseQueryOptions<OffersByStatus, Error, ArtworkOffer>
) {
  return useOffersByStatusBaseHook(variables, {
    ...options,
    select: pathOr<ArtworkOffer>(null, ['artworks', 0, 'offers', 0]),
    enabled: isAllTrue([isQueryEnabled(options), ...Object.values(variables)]),
  });
}
