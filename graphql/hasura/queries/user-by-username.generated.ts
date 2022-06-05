import * as Types from '../types-hasura.generated';

import { UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment, CollectionFragment, ArtworkFragmentExtended, ArtworkEventFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserByUsernameVariables = Types.Exact<{
  username: Types.Scalars['citext'];
}>;


export type UserByUsername = { users: Array<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>> };


export const UserByUsernameDocument = /*#__PURE__*/ `
    query UserByUsername($username: citext!) {
  users: user(where: {username: {_eq: $username}}) {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const useUserByUsername = <
      TData = UserByUsername,
      TError = Error
    >(
      variables: UserByUsernameVariables,
      options?: UseQueryOptions<UserByUsername, TError, TData>
    ) =>
    useQuery<UserByUsername, TError, TData>(
      ['UserByUsername', variables],
      hasuraFetcher<UserByUsername, UserByUsernameVariables>(UserByUsernameDocument, variables),
      options
    );

useUserByUsername.getKey = (variables: UserByUsernameVariables) => ['UserByUsername', variables];
;
