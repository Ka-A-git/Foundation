import * as Types from '../types-hasura.generated';

import { UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment, CollectionFragment, ArtworkFragmentExtended, ArtworkEventFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type FeedUsersByPublicKeysVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  publicKeys: Array<Types.Scalars['String']> | Types.Scalars['String'];
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type FeedUsersByPublicKeys = { users: Array<(
    Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>
    & { followerCount: { aggregate?: Types.Maybe<Pick<Types.Follow_Aggregate_Fields, 'count'>> }, follows: Array<Pick<Types.Follow, 'createdAt' | 'isFollowing'>> }
  )> };


export const FeedUsersByPublicKeysDocument = /*#__PURE__*/ `
    query FeedUsersByPublicKeys($publicKey: String!, $publicKeys: [String!]!, $limit: Int!, $offset: Int!) {
  users: user(
    limit: $limit
    offset: $offset
    order_by: {createdAt: desc}
    where: {publicKey: {_in: $publicKeys}}
  ) {
    ...UserFragment
    followerCount: follows_aggregate(where: {isFollowing: {_eq: true}}) {
      aggregate {
        count
      }
    }
    follows(where: {user: {_eq: $publicKey}, isFollowing: {_eq: true}}) {
      createdAt
      isFollowing
    }
  }
}
    ${UserFragment}`;
export const useFeedUsersByPublicKeys = <
      TData = FeedUsersByPublicKeys,
      TError = Error
    >(
      variables: FeedUsersByPublicKeysVariables,
      options?: UseQueryOptions<FeedUsersByPublicKeys, TError, TData>
    ) =>
    useQuery<FeedUsersByPublicKeys, TError, TData>(
      ['FeedUsersByPublicKeys', variables],
      hasuraFetcher<FeedUsersByPublicKeys, FeedUsersByPublicKeysVariables>(FeedUsersByPublicKeysDocument, variables),
      options
    );

useFeedUsersByPublicKeys.getKey = (variables: FeedUsersByPublicKeysVariables) => ['FeedUsersByPublicKeys', variables];
;
