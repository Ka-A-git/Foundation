import * as Types from '../types-server.generated';

import { UserFragment } from '../server-fragments.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type RemoveUnusedInviteCodesVariables = Types.Exact<{
  userPublicKey: Types.Scalars['String'];
}>;


export type RemoveUnusedInviteCodes = { removeUnusedInviteCodes: (
    Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'name' | 'firstName' | 'lastName' | 'isAdmin' | 'providerType' | 'bio' | 'coverImageUrl' | 'profileImageUrl' | 'isApprovedCreator' | 'moderationStatus'>
    & { links?: Types.Maybe<{ website?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, instagram?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitter?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, youtube?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, facebook?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitch?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, tiktok?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, discord?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, snapchat?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>> }> }
  ) };


export const RemoveUnusedInviteCodesDocument = /*#__PURE__*/ `
    mutation RemoveUnusedInviteCodes($userPublicKey: String!) {
  removeUnusedInviteCodes(userPublicKey: $userPublicKey) {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const useRemoveUnusedInviteCodes = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveUnusedInviteCodes, TError, RemoveUnusedInviteCodesVariables, TContext>) =>
    useMutation<RemoveUnusedInviteCodes, TError, RemoveUnusedInviteCodesVariables, TContext>(
      ['RemoveUnusedInviteCodes'],
      useServerFetcher<RemoveUnusedInviteCodes, RemoveUnusedInviteCodesVariables>(RemoveUnusedInviteCodesDocument),
      options
    );