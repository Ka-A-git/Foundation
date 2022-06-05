import { any, find } from 'ramda';
import { UseQueryOptions } from 'react-query';

import { isFlaggedForModeration } from 'utils/moderation';
import { isAllTrue } from 'utils/helpers';
import { isQueryEnabled } from 'hooks/queries/shared';

import { ModerationStatus } from 'types/Moderation';

import {
  useUserModeratedArtworks,
  UserModeratedArtworksVariables,
  UserModeratedArtworks,
} from 'graphql/hasura/queries/user-moderated-artworks.generated';

interface UserModerationState {
  isUserOrArtworkModerated: boolean;
  isUserModerated: boolean;
  isArtworkModerated: boolean;
  moderationStatus: ModerationStatus;
}

export default function useUserModerationState(
  variables: Pick<UserModeratedArtworksVariables, 'publicKey'>,
  options?: UseQueryOptions<UserModeratedArtworks, Error, UserModerationState>
) {
  const { publicKey } = variables;

  return useUserModeratedArtworks<UserModerationState>(
    { publicKey, excludedModerationStatuses: [ModerationStatus.Active] },
    {
      ...options,
      enabled: isAllTrue([
        isQueryEnabled(options),
        ...Object.values(variables),
      ]),
      select: (res) => {
        const user = res?.user;
        const userArtworks = user?.artworks ?? [];

        const moderatedArtwork = find(
          (artwork) => isFlaggedForModeration(artwork.moderationStatus),
          userArtworks
        );

        const hasModeratedArtwork = any(
          (artwork) => isFlaggedForModeration(artwork.moderationStatus),
          userArtworks
        );

        const isCreatorModerated = isFlaggedForModeration(
          user?.moderationStatus
        );

        const moderationStatus = isCreatorModerated
          ? user?.moderationStatus
          : moderatedArtwork?.moderationStatus;

        return {
          isUserOrArtworkModerated: isCreatorModerated || hasModeratedArtwork,
          isUserModerated: isCreatorModerated,
          isArtworkModerated: hasModeratedArtwork,
          moderationStatus,
        };
      },
    }
  );
}
