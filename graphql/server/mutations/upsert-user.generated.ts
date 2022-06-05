import * as Types from '../types-server.generated';

import { UserFragment } from '../server-fragments.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type UpsertUserVariables = Types.Exact<{
  data: Types.UserInput;
}>;


export type UpsertUser = { upsertUser: (
    Pick<Types.User, 'email' | 'userIndex' | 'publicKey' | 'username' | 'name' | 'firstName' | 'lastName' | 'isAdmin' | 'providerType' | 'bio' | 'coverImageUrl' | 'profileImageUrl' | 'isApprovedCreator' | 'moderationStatus'>
    & { links?: Types.Maybe<{ website?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, instagram?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitter?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, youtube?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, facebook?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitch?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, tiktok?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, discord?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, snapchat?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>> }> }
  ) };


export const UpsertUserDocument = /*#__PURE__*/ `
    mutation UpsertUser($data: UserInput!) {
  upsertUser(data: $data) {
    ...UserFragment
    email
  }
}
    ${UserFragment}`;
export const useUpsertUser = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpsertUser, TError, UpsertUserVariables, TContext>) =>
    useMutation<UpsertUser, TError, UpsertUserVariables, TContext>(
      ['UpsertUser'],
      useServerFetcher<UpsertUser, UpsertUserVariables>(UpsertUserDocument),
      options
    );