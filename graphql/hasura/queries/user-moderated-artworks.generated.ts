import * as Types from '../types-hasura.generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type UserModeratedArtworksVariables = Types.Exact<{
  publicKey: Types.Scalars['String'];
  excludedModerationStatuses: Array<Types.Scalars['artwork_moderationstatus_enum']> | Types.Scalars['artwork_moderationstatus_enum'];
}>;


export type UserModeratedArtworks = { user?: Types.Maybe<(
    Pick<Types.User, 'publicKey' | 'isAdmin' | 'moderationStatus'>
    & { artworks: Array<Pick<Types.Artwork, 'moderationStatus' | 'publicKey' | 'tokenId'>> }
  )> };


export const UserModeratedArtworksDocument = /*#__PURE__*/ `
    query UserModeratedArtworks($publicKey: String!, $excludedModerationStatuses: [artwork_moderationstatus_enum!]!) {
  user: user_by_pk(publicKey: $publicKey) {
    publicKey
    isAdmin
    moderationStatus
    artworks(where: {moderationStatus: {_nin: $excludedModerationStatuses}}) {
      moderationStatus
      publicKey
      tokenId
    }
  }
}
    `;
export const useUserModeratedArtworks = <
      TData = UserModeratedArtworks,
      TError = Error
    >(
      variables: UserModeratedArtworksVariables,
      options?: UseQueryOptions<UserModeratedArtworks, TError, TData>
    ) =>
    useQuery<UserModeratedArtworks, TError, TData>(
      ['UserModeratedArtworks', variables],
      hasuraFetcher<UserModeratedArtworks, UserModeratedArtworksVariables>(UserModeratedArtworksDocument, variables),
      options
    );

useUserModeratedArtworks.getKey = (variables: UserModeratedArtworksVariables) => ['UserModeratedArtworks', variables];
;
