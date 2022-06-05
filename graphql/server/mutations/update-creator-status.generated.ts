import * as Types from '../types-server.generated';

import { UserFragment } from '../server-fragments.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type UpdateCreatorStatusVariables = Types.Exact<{
  creatorStatus: Types.Scalars['Boolean'];
  userPublicKey: Types.Scalars['String'];
}>;


export type UpdateCreatorStatus = { updateCreatorStatus: (
    Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'name' | 'firstName' | 'lastName' | 'isAdmin' | 'providerType' | 'bio' | 'coverImageUrl' | 'profileImageUrl' | 'isApprovedCreator' | 'moderationStatus'>
    & { links?: Types.Maybe<{ website?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, instagram?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitter?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, youtube?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, facebook?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitch?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, tiktok?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, discord?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, snapchat?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>> }> }
  ) };


export const UpdateCreatorStatusDocument = /*#__PURE__*/ `
    mutation UpdateCreatorStatus($creatorStatus: Boolean!, $userPublicKey: String!) {
  updateCreatorStatus(
    updateCreatorStatus: $creatorStatus
    userPublicKey: $userPublicKey
  ) {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const useUpdateCreatorStatus = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCreatorStatus, TError, UpdateCreatorStatusVariables, TContext>) =>
    useMutation<UpdateCreatorStatus, TError, UpdateCreatorStatusVariables, TContext>(
      ['UpdateCreatorStatus'],
      useServerFetcher<UpdateCreatorStatus, UpdateCreatorStatusVariables>(UpdateCreatorStatusDocument),
      options
    );