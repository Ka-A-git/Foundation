import * as Types from '../types-server.generated';

import { CollectionFragment } from '../server-fragments.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type UpdateCollectionHiddenAtVariables = Types.Exact<{
  hidden: Types.Scalars['Boolean'];
  id: Types.Scalars['String'];
}>;


export type UpdateCollectionHiddenAt = { updateCollectionHiddenAt: Pick<Types.Collection, 'id' | 'contractAddress' | 'symbol' | 'name' | 'slug' | 'description' | 'collectionImageUrl' | 'coverImageUrl' | 'createdAt' | 'updatedAt'> };


export const UpdateCollectionHiddenAtDocument = /*#__PURE__*/ `
    mutation UpdateCollectionHiddenAt($hidden: Boolean!, $id: String!) {
  updateCollectionHiddenAt(hidden: $hidden, id: $id) {
    ...CollectionFragment
  }
}
    ${CollectionFragment}`;
export const useUpdateCollectionHiddenAt = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCollectionHiddenAt, TError, UpdateCollectionHiddenAtVariables, TContext>) =>
    useMutation<UpdateCollectionHiddenAt, TError, UpdateCollectionHiddenAtVariables, TContext>(
      ['UpdateCollectionHiddenAt'],
      useServerFetcher<UpdateCollectionHiddenAt, UpdateCollectionHiddenAtVariables>(UpdateCollectionHiddenAtDocument),
      options
    );