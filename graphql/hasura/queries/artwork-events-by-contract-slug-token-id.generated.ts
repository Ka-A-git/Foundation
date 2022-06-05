import * as Types from '../types-hasura.generated';

import { ArtworkEventFragment, UserFragment, ArtworkFragment, LatestArtworkEventFragment, ArtworkSplitRecipientsFragment, MostRecentAuctionFragment, MostRecentOfferFragment, MostRecentBuyNowFragment, MostRecentPrivateSaleFragment, InviteFragment, SocialVerificationFragment } from '../hasura-fragments.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { hasuraFetcher } from 'lib/clients/graphql';
export type ArtworkEventsByContractSlugTokenIdVariables = Types.Exact<{
  contractSlug: Types.Scalars['String'];
  tokenId: Types.Scalars['Int'];
}>;


export type ArtworkEventsByContractSlugTokenId = { events: Array<(
    Pick<Types.Event, 'id' | 'eventType' | 'data' | 'blockTimestamp' | 'publicKey' | 'tokenId' | 'tokenCreator'>
    & { user: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'> }
  )> };


export const ArtworkEventsByContractSlugTokenIdDocument = /*#__PURE__*/ `
    query ArtworkEventsByContractSlugTokenId($contractSlug: String!, $tokenId: Int!) {
  events: events_by_token_id_and_slug(
    args: {token_id: $tokenId, slug: $contractSlug}
    order_by: {blockTimestamp: desc_nulls_last}
    where: {eventType: {_nin: ["MIGRATE_CREATOR", "MIGRATE_CREATOR_PAYMENT_ADDRESS", "MIGRATE_OWNER", "MIGRATE_SELLER"]}}
  ) {
    ...ArtworkEventFragment
    user {
      ...UserFragment
    }
  }
}
    ${ArtworkEventFragment}
${UserFragment}`;
export const useArtworkEventsByContractSlugTokenId = <
      TData = ArtworkEventsByContractSlugTokenId,
      TError = Error
    >(
      variables: ArtworkEventsByContractSlugTokenIdVariables,
      options?: UseQueryOptions<ArtworkEventsByContractSlugTokenId, TError, TData>
    ) =>
    useQuery<ArtworkEventsByContractSlugTokenId, TError, TData>(
      ['ArtworkEventsByContractSlugTokenId', variables],
      hasuraFetcher<ArtworkEventsByContractSlugTokenId, ArtworkEventsByContractSlugTokenIdVariables>(ArtworkEventsByContractSlugTokenIdDocument, variables),
      options
    );

useArtworkEventsByContractSlugTokenId.getKey = (variables: ArtworkEventsByContractSlugTokenIdVariables) => ['ArtworkEventsByContractSlugTokenId', variables];
;
