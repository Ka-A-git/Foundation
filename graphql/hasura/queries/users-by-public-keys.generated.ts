import * as Types from '../types-hasura.generated';

import { UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment, CollectionFragment, ArtworkFragmentExtended, ArtworkEventFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UsersByPublicKeysVariables = Types.Exact<{
  publicKeys: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type UsersByPublicKeys = { users: Array<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>> };


export const UsersByPublicKeysDocument = /*#__PURE__*/ `
    query UsersByPublicKeys($publicKeys: [String!]!) {
  users: user(where: {publicKey: {_in: $publicKeys}}) {
    ...UserFragment
  }
}
    ${UserFragment}`;
export const useUsersByPublicKeys = <
      TData = UsersByPublicKeys,
      TError = Error
    >(
      variables: UsersByPublicKeysVariables,
      options?: UseQueryOptions<UsersByPublicKeys, TError, TData>
    ) =>
    useQuery<UsersByPublicKeys, TError, TData>(
      ['UsersByPublicKeys', variables],
      hasuraFetcher<UsersByPublicKeys, UsersByPublicKeysVariables>(UsersByPublicKeysDocument, variables),
      options
    );

useUsersByPublicKeys.getKey = (variables: UsersByPublicKeysVariables) => ['UsersByPublicKeys', variables];
;
