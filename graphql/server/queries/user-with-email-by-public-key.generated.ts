import * as Types from '../types-server.generated';

import { UserFragment } from '../server-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type UserWithEmailByPublicKeyVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
}>;


export type UserWithEmailByPublicKey = { user: (
    Pick<Types.User, 'email' | 'userIndex' | 'publicKey' | 'username' | 'name' | 'firstName' | 'lastName' | 'isAdmin' | 'providerType' | 'bio' | 'coverImageUrl' | 'profileImageUrl' | 'isApprovedCreator' | 'moderationStatus'>
    & { links?: Types.Maybe<{ website?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, instagram?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitter?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, youtube?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, facebook?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitch?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, tiktok?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, discord?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, snapchat?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>> }> }
  ) };


export const UserWithEmailByPublicKeyDocument = /*#__PURE__*/ `
    query UserWithEmailByPublicKey($publicKey: String!) {
  user(publicKey: $publicKey) {
    ...UserFragment
    email
  }
}
    ${UserFragment}`;
export const useUserWithEmailByPublicKey = <
      TData = UserWithEmailByPublicKey,
      TError = Error
    >(
      variables: UserWithEmailByPublicKeyVariables,
      options?: UseQueryOptions<UserWithEmailByPublicKey, TError, TData>
    ) =>
    useQuery<UserWithEmailByPublicKey, TError, TData>(
      ['UserWithEmailByPublicKey', variables],
      useServerFetcher<UserWithEmailByPublicKey, UserWithEmailByPublicKeyVariables>(UserWithEmailByPublicKeyDocument).bind(null, variables),
      options
    );

useUserWithEmailByPublicKey.getKey = (variables: UserWithEmailByPublicKeyVariables) => ['UserWithEmailByPublicKey', variables];
;
