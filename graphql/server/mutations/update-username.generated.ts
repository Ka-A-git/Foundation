import * as Types from '../types-server.generated';

import { UserFragment } from '../server-fragments.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type UpdateUsernameVariables = Types.Exact<{
  username?: Types.InputMaybe<Types.Scalars['String']>;
  userPublicKey: Types.Scalars['String'];
}>;


export type UpdateUsername = { updateUsername: (
    Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'name' | 'firstName' | 'lastName' | 'isAdmin' | 'providerType' | 'bio' | 'coverImageUrl' | 'profileImageUrl' | 'isApprovedCreator' | 'moderationStatus'>
    & { links?: Types.Maybe<{ website?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, instagram?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitter?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, youtube?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, facebook?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitch?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, tiktok?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, discord?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, snapchat?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>> }> }
  ) };


export const UpdateUsernameDocument = /*#__PURE__*/ `
    mutation UpdateUsername($username: String, $userPublicKey: String!) {
  updateUsername(username: $username, userPublicKey: $userPublicKey) {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const useUpdateUsername = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUsername, TError, UpdateUsernameVariables, TContext>) =>
    useMutation<UpdateUsername, TError, UpdateUsernameVariables, TContext>(
      ['UpdateUsername'],
      useServerFetcher<UpdateUsername, UpdateUsernameVariables>(UpdateUsernameDocument),
      options
    );