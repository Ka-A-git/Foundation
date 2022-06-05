import { UseMutationResult } from 'react-query';

import ArtworkCardCreator from './subcomponents/ArtworkCardCreator';
import ArtworkCardMedia from './subcomponents/ArtworkCardMedia';
import ArtworkCardContainer from './subcomponents/ArtworkCardContainer';
import ArtworkCardHeader from './subcomponents/ArtworkCardHeader';
import ArtworkCardPopoverOwner from './subcomponents/popovers/ArtworkCardPopoverOwner';
import ArtworkCardMarket from './subcomponents/ArtworkCardMarket';
import ArtworkHiddenLink from './subcomponents/ArtworkHiddenLink';
import ModeratedBanner from '../shared/ModeratedBanner';
import Flex from 'components/base/Flex';
import ArtworkCardSkeleton from './ArtworkCardSkeleton';

import { VideoAssetQuality } from 'types/Assets';

import {
  ArtworkFragmentExtended,
  UserFragment,
} from 'graphql/hasura/hasura-fragments.generated';
import {
  SetArtworkUserVisibility,
  SetArtworkUserVisibilityVariables,
} from 'graphql/server/mutations/set-artwork-user-visibility.generated';

import {
  buildArtworkPath,
  isUnsupportedArtworkAsset,
} from 'utils/artwork/artwork';
import {
  buildArtworkAssetUrl,
  buildPosterUrl,
  FALLBACK_IMAGE_IMGIX_BLUR,
} from 'utils/assets';
import {
  getPriorityMarketFromArtwork,
  findMarketByType,
} from 'utils/markets/markets';
import { isNumber } from 'utils/helpers';

import { ModerationStatus } from 'types/Moderation';

type ArtworkCardType = 'regular' | 'detailed';
interface ArtworkCardProps {
  artwork: ArtworkFragmentExtended;
  creator: UserFragment;
  currentUserPublicKey: string;
  isCurrentUserProfile?: boolean;
  cardType?: ArtworkCardType;
  setArtworkUserVisibility?: UseMutationResult<
    SetArtworkUserVisibility,
    Error,
    SetArtworkUserVisibilityVariables
  >;
}

export default function ArtworkCard(props: ArtworkCardProps) {
  const {
    artwork,
    creator,
    currentUserPublicKey,
    isCurrentUserProfile = false,
    cardType = 'detailed',
    setArtworkUserVisibility,
  } = props;

  if (!artwork) {
    return <ArtworkCardSkeleton />;
  }

  const assetUrl = buildArtworkAssetUrl(
    {
      h: 640,
      q: 80,
      quality: VideoAssetQuality.Preview,
      auto: 'format,compress',
      blur: isUnsupportedArtworkAsset(artwork)
        ? FALLBACK_IMAGE_IMGIX_BLUR
        : undefined,
    },
    artwork
  );

  const artworkPath = buildArtworkPath({ artwork, user: creator });
  const posterUrl = buildPosterUrl(artwork);
  const hasSplits = artwork?.splitRecipients?.aggregate?.count > 0;
  const priorityMarket = getPriorityMarketFromArtwork(artwork);
  const marketType = priorityMarket?.marketType;
  const isAuctionMode =
    marketType === 'LIVE_AUCTION' || marketType === 'ENDED_AUCTION';
  const isModerated = [
    ModerationStatus.UnderReview,
    ModerationStatus.TakedownRequested,
    ModerationStatus.Suspended,
  ].includes(artwork?.moderationStatus);

  const activeOffer = findMarketByType(artwork, 'OFFER');

  return (
    <ArtworkCardContainer
      className="artwork-card"
      isAuctionMode={isAuctionMode}
    >
      {isModerated && <ModeratedBanner status={artwork?.moderationStatus} />}
      <ArtworkCardMedia
        artworkPath={artworkPath}
        assetStatus={artwork.assetStatus}
        assetUrl={assetUrl}
        posterUrl={posterUrl}
        name={artwork.name}
        collection={artwork.collection}
        creator={creator}
        tokenId={artwork.tokenId}
      />
      <ArtworkCardHeader>
        <Flex
          css={{
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <ArtworkCardCreator
            artwork={artwork}
            hasSplits={hasSplits}
            color={isAuctionMode ? 'dark' : 'light'}
          />

          {isCurrentUserProfile && (
            <ArtworkCardPopoverOwner
              artwork={artwork}
              currentUserPublicKey={currentUserPublicKey}
              setArtworkUserVisibility={setArtworkUserVisibility}
              css={{
                background: isAuctionMode ? '$black100' : '$white100',
                marginY: -5,
                display: 'none',
                '@bp1': {
                  display: 'flex',
                },
                '@hover': {
                  '&:hover': {
                    backgroundColor: isAuctionMode ? '$black90' : '$black5',
                  },
                },
              }}
            />
          )}
        </Flex>
        {cardType === 'detailed' && (
          <ArtworkCardMarket
            artwork={artwork}
            priorityMarket={priorityMarket}
            marketType={marketType}
            activeOffer={
              activeOffer
                ? {
                    amountInETH: activeOffer.amountInEth,
                    expiresAt: activeOffer.eventDate,
                  }
                : null
            }
          />
        )}
        {isNumber(artwork.tokenId) && (
          <ArtworkHiddenLink name={artwork.name} artworkPath={artworkPath} />
        )}
      </ArtworkCardHeader>
    </ArtworkCardContainer>
  );
}
