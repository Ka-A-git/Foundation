import { UseQueryOptions } from 'react-query';
import {
  useCollectionByContractSlug as useCollectionByContractSlugBaseHook,
  CollectionByContractSlug,
  CollectionByContractSlugVariables,
} from 'graphql/hasura/queries/collection-by-contract-slug.generated';

import { getFirstValue, isAllTrue } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

type Collection = CollectionByContractSlug['collections'][0];

export default function useCollectionByContractSlug(
  variables: CollectionByContractSlugVariables,
  options?: UseQueryOptions<CollectionByContractSlug, Error, Collection>
) {
  return useCollectionByContractSlugBaseHook(variables, {
    ...options,
    select: (res) => getFirstValue(res.collections),
    enabled: isAllTrue([variables.contractSlug, isQueryEnabled(options)]),
  });
}

useCollectionByContractSlug.getKey = useCollectionByContractSlugBaseHook.getKey;
