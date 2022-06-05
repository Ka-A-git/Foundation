import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  buildArtworkCardFallbackAssetUrl,
  isImage,
  isModel,
  isVideo,
} from 'utils/assets';
import { isNumber, notEmptyOrNil } from 'utils/helpers';

import CardVideo from 'components/cards/shared/CardVideo';
import AspectRatio from 'components/base/AspectRatio';
import Box from 'components/base/Box';
import MediaLoadingSpinner from 'components/media/MediaLoadingSpinner';
import ArtworkCardTitleAndCollection from './ArtworkCardTitleAndCollection';
import Image from 'components/base/Image';
import ArtworkHiddenLink from './ArtworkHiddenLink';
import ArtworkCardMediaContainer from './ArtworkCardMediaContainer';

import useIsInViewport from 'use-is-in-viewport';
import useAssetReady from 'hooks/use-asset-ready';

import { CollectionCardFragment } from 'types/Collection';
import { AlgoliaCollection, AlgoliaUserBasic } from 'types/Algolia';

import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';
import { AssetStatus } from 'types/Artwork';
import {
  getFallbackArtworkUrl,
  isUnsupportedArtworkAsset,
} from 'utils/artwork/artwork';
import ArtworkCardUnsupportedMedia from './ArtworkCardUnsupportedMedia';

const MotionImage = motion(Image);
const MotionCardVideo = motion(CardVideo);

interface ArtworkCardMediaProps {
  assetStatus: AssetStatus;
  assetUrl: string;
  posterUrl?: string;
  name: string;
  collection: CollectionCardFragment | AlgoliaCollection;
  artworkPath: string;
  creator: UserFragment | AlgoliaUserBasic;
  tokenId?: number;
}

export default function ArtworkCardMedia(
  props: ArtworkCardMediaProps
): JSX.Element {
  const {
    assetStatus,
    assetUrl,
    posterUrl,
    name,
    collection,
    artworkPath,
    creator,
    tokenId,
  } = props;
  const [hasBeenInViewport, setHasBeenInViewport] = useState(false);

  const hasAssetUrl = notEmptyOrNil(assetUrl);

  const [isInViewport, targetRef] = useIsInViewport();

  useEffect(() => {
    if (isInViewport) {
      setHasBeenInViewport(true);
    }
  }, [isInViewport]);

  if (hasAssetUrl) {
    const isUnsupportedAsset = isUnsupportedArtworkAsset({ assetStatus });

    return (
      <ArtworkCardMediaContainer ref={targetRef}>
        {isNumber(tokenId) && (
          <ArtworkHiddenLink name={name} artworkPath={artworkPath} />
        )}
        <AspectRatio
          ratio={1 / 1}
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AnimatePresence exitBeforeEnter>
            <RenderArtworkCardMedia
              collection={collection}
              url={assetUrl}
              posterUrl={posterUrl}
              hasBeenInViewport={hasBeenInViewport}
              alt={name}
              isUnsupportedAsset={isUnsupportedAsset}
            />
          </AnimatePresence>
        </AspectRatio>
        <ArtworkCardTitleAndCollection
          name={name}
          collection={collection}
          creator={creator}
        />
      </ArtworkCardMediaContainer>
    );
  }

  return <AspectRatio ratio={1 / 1} />;
}

interface RenderArtworkCardMediaProps {
  collection: ArtworkCardMediaProps['collection'];
  url: string;
  hasBeenInViewport: boolean;
  posterUrl?: string;
  alt: string;
  isUnsupportedAsset: boolean;
}

function RenderArtworkCardMedia(
  props: RenderArtworkCardMediaProps
): JSX.Element {
  const {
    collection,
    url,
    posterUrl,
    hasBeenInViewport,
    alt,
    isUnsupportedAsset,
  } = props;

  const isUrlVideo = isVideo(url);
  const isUrlModel = isModel(url);
  const isUrlImage = isImage(url);

  const { isLoading, isError } = useAssetReady(url, isUrlImage);
  const [imageLoaded, setImageLoaded] = useState(false);

  const animationProps = {
    initial: { opacity: 0 },
    exit: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.1 },
  };

  if (isUnsupportedAsset) {
    const fallbackImageUrl = getFallbackArtworkUrl(collection) || url;

    return (
      <ArtworkCardUnsupportedMedia
        fallbackImageUrl={buildArtworkCardFallbackAssetUrl(fallbackImageUrl)}
      />
    );
  }

  if (!hasBeenInViewport && (isUrlVideo || isUrlModel)) {
    return (
      <motion.div {...animationProps} style={{ backgroundColor: '#F2F2F2' }} />
    );
  }

  if (isUrlVideo) {
    return (
      <MotionCardVideo {...animationProps} posterUrl={posterUrl} url={url} />
    );
  }

  if (isUrlModel) {
    return (
      <Box css={{ position: 'relative', height: '100%', width: '100%' }}>
        <MotionImage
          {...animationProps}
          loading="lazy"
          src={posterUrl}
          alt={alt}
          css={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    );
  }
  const isImageLoading = isLoading || isError;

  if (isImageLoading) {
    return (
      <MediaLoadingSpinner
        isLoading={isImageLoading}
        size={32}
        color="$black100"
      />
    );
  }

  return (
    <>
      <MediaLoadingSpinner
        isLoading={!imageLoaded}
        size={32}
        color="$black100"
      />

      <MotionImage
        {...animationProps}
        loading="lazy"
        src={url}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        css={{
          display: 'block',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </>
  );
}
