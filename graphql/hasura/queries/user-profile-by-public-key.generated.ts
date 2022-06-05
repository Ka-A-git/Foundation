import * as Types from '../types-hasura.generated';

import { UserProfileFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserProfileByPublicKeyVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  contractAddresses: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type UserProfileByPublicKey = { user?: Types.Maybe<(
    Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>
    & { ownedArtworks: Array<{ owner?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>> }>, collectionsCount: { aggregate?: Types.Maybe<Pick<Types.Collection_Aggregate_Fields, 'count'>> }, artworksCollectedCount: { aggregate?: Types.Maybe<Pick<Types.Artwork_Aggregate_Fields, 'count'>> }, artworksCreatedCount: { aggregate?: Types.Maybe<Pick<Types.Artwork_Aggregate_Fields, 'count'>> }, acceptedInvite?: Types.Maybe<Pick<Types.Invite_Code, 'senderPublicKey' | 'redeemerPublicKey' | 'redeemedAt'>>, twitSocialVerifs: Array<Pick<Types.Social_Verification, 'id' | 'user' | 'createdAt' | 'updatedAt' | 'expiresAt' | 'lastCheckedAt' | 'socialVerificationURL' | 'verificationText' | 'userId' | 'username' | 'isValid' | 'service' | 'failedReason' | 'status'>>, instaSocialVerifs: Array<Pick<Types.Social_Verification, 'id' | 'user' | 'createdAt' | 'updatedAt' | 'expiresAt' | 'lastCheckedAt' | 'socialVerificationURL' | 'verificationText' | 'userId' | 'username' | 'isValid' | 'service' | 'failedReason' | 'status'>>, followerCount: { aggregate?: Types.Maybe<Pick<Types.Follow_Aggregate_Fields, 'count'>> }, followingCount: { aggregate?: Types.Maybe<Pick<Types.Follow_Aggregate_Fields, 'count'>> } }
  )> };


export const UserProfileByPublicKeyDocument = /*#__PURE__*/ `
    query UserProfileByPublicKey($publicKey: String!, $contractAddresses: [String!]!) {
  user: user_by_pk(publicKey: $publicKey) {
    ...UserProfileFragment
    ownedArtworks: artworks(
      limit: 12
      where: {isIndexed: {_eq: true}, deletedAt: {_is_null: true}, ownerPublicKey: {_neq: $publicKey}}
      distinct_on: ownerPublicKey
    ) {
      owner {
        userIndex
        publicKey
        username
        profileImageUrl
        coverImageUrl
        name
        bio
        isApprovedCreator
        moderationStatus
        joinedWaitlistAt
        createdAt
        isApprovedForMigrationAt
        isAdmin
        links
      }
    }
    collectionsCount: collections_aggregate(
      where: {user: {publicKey: {_eq: $publicKey}}, contractType: {_nin: [SHARED, FND]}, deletedAt: {_is_null: true}}
    ) {
      aggregate {
        count
      }
    }
    artworksCollectedCount: ownedArtworks_aggregate(
      where: {publicKey: {_neq: $publicKey}, isIndexed: {_eq: true}, tokenId: {_is_null: false}, deletedAt: {_is_null: true}}
    ) {
      aggregate {
        count
      }
    }
    artworksCreatedCount: artworks_aggregate(
      where: {contractAddress: {_in: $contractAddresses}, isIndexed: {_eq: true}, tokenId: {_is_null: false}, deletedAt: {_is_null: true}}
    ) {
      aggregate {
        count
      }
    }
  }
}
    ${UserProfileFragment}`;
export const useUserProfileByPublicKey = <
      TData = UserProfileByPublicKey,
      TError = Error
    >(
      variables: UserProfileByPublicKeyVariables,
      options?: UseQueryOptions<UserProfileByPublicKey, TError, TData>
    ) =>
    useQuery<UserProfileByPublicKey, TError, TData>(
      ['UserProfileByPublicKey', variables],
      hasuraFetcher<UserProfileByPublicKey, UserProfileByPublicKeyVariables>(UserProfileByPublicKeyDocument, variables),
      options
    );

useUserProfileByPublicKey.getKey = (variables: UserProfileByPublicKeyVariables) => ['UserProfileByPublicKey', variables];
;
