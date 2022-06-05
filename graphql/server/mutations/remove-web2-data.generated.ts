import * as Types from '../types-server.generated';

import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type RemoveWeb2DataVariables = Types.Exact<{
  userPublicKey: Types.Scalars['String'];
}>;


export type RemoveWeb2Data = Pick<Types.Mutation, 'stripWeb2Data'>;


export const RemoveWeb2DataDocument = /*#__PURE__*/ `
    mutation RemoveWeb2Data($userPublicKey: String!) {
  stripWeb2Data(userPublicKey: $userPublicKey)
}
    `;
export const useRemoveWeb2Data = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveWeb2Data, TError, RemoveWeb2DataVariables, TContext>) =>
    useMutation<RemoveWeb2Data, TError, RemoveWeb2DataVariables, TContext>(
      ['RemoveWeb2Data'],
      useServerFetcher<RemoveWeb2Data, RemoveWeb2DataVariables>(RemoveWeb2DataDocument),
      options
    );