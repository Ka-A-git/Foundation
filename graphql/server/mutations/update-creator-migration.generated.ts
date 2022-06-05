import * as Types from '../types-server.generated';

import { UserFragment } from '../server-fragments.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type UpdateCreatorMigrationVariables = Types.Exact<{
  userPublicKey: Types.Scalars['String'];
  isApproved: Types.Scalars['Boolean'];
}>;


export type UpdateCreatorMigration = { updateUserIsApprovedForMigrationAt: (
    Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'name' | 'firstName' | 'lastName' | 'isAdmin' | 'providerType' | 'bio' | 'coverImageUrl' | 'profileImageUrl' | 'isApprovedCreator' | 'moderationStatus'>
    & { links?: Types.Maybe<{ website?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, instagram?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitter?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, youtube?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, facebook?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, twitch?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, tiktok?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, discord?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>>, snapchat?: Types.Maybe<Pick<Types.SocialLink, 'platform' | 'handle'>> }> }
  ) };


export const UpdateCreatorMigrationDocument = /*#__PURE__*/ `
    mutation UpdateCreatorMigration($userPublicKey: String!, $isApproved: Boolean!) {
  updateUserIsApprovedForMigrationAt(
    userPublicKey: $userPublicKey
    isApproved: $isApproved
  ) {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const useUpdateCreatorMigration = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCreatorMigration, TError, UpdateCreatorMigrationVariables, TContext>) =>
    useMutation<UpdateCreatorMigration, TError, UpdateCreatorMigrationVariables, TContext>(
      ['UpdateCreatorMigration'],
      useServerFetcher<UpdateCreatorMigration, UpdateCreatorMigrationVariables>(UpdateCreatorMigrationDocument),
      options
    );