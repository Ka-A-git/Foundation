import * as Types from '../types-hasura.generated';

import { UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment, CollectionFragment, ArtworkFragmentExtended, ArtworkEventFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UsersByUsernamesVariables = Types.Exact<{
  usernames: Array<Types.Scalars['citext']> | Types.Scalars['citext'];
}>;


export type UsersByUsernames = { users: Array<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>> };


export const UsersByUsernamesDocument = /*#__PURE__*/ `
    query UsersByUsernames($usernames: [citext!]!) {
  users: user(where: {username: {_in: $usernames}}) {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const useUsersByUsernames = <
      TData = UsersByUsernames,
      TError = Error
    >(
      variables: UsersByUsernamesVariables,
      options?: UseQueryOptions<UsersByUsernames, TError, TData>
    ) =>
    useQuery<UsersByUsernames, TError, TData>(
      ['UsersByUsernames', variables],
      hasuraFetcher<UsersByUsernames, UsersByUsernamesVariables>(UsersByUsernamesDocument, variables),
      options
    );

useUsersByUsernames.getKey = (variables: UsersByUsernamesVariables) => ['UsersByUsernames', variables];
;
