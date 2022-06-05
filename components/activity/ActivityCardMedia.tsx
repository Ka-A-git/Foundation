import { useState, useEffect } from 'react';
import useIsInViewport from 'use-is-in-viewport';
import { AnimatePresence, motion } from 'framer-motion';

import {
  buildActivityCardFallbackAssetUrl,
  isModel,
  isVideo,
} from 'utils/assets';
import { notEmptyOrNil } from 'utils/helpers';

import Image from 'components/base/Image';
import Box from 'components/base/Box';
import AspectRatio from 'components/base/AspectRatio';

import CardVideo from 'components/cards/shared/CardVideo';
import ThreeDIcon from 'assets/icons/3d-icon.svg';
import ArtworkCardPill from 'components/cards/artwork/subcomponents/ArtworkCardPill';

import {
  getFallbackArtworkLabel,
  getFallbackArtworkUrl,
} from 'utils/artwork/artwork';
import { createCanvasBackground } from 'utils/styles';

// TODO: move to be shared by artwork and activity cards
import { ArtworkCardUnsupportedMediaIconWrapper } from 'components/cards/artwork/subcomponents/ArtworkCardUnsupportedMedia';

import AssetUnsupportedIcon from 'assets/icons/asset-unsupported-icon.svg';
import Flex from 'components/base/Flex';
import { ActivityArtwork } from './types';

const MotionImage = motion(Image);
const MotionCardVideo = motion(CardVideo);

interface ActivityCardMediaProps {
  assetUrl: string;
  collection: ActivityArtwork['collection'];
  posterUrl?: string;
  isUnsupported: boolean;
}

export default function ActivityCardMedia(
  props: ActivityCardMediaProps
): JSX.Element {
  const { assetUrl, collection, posterUrl, isUnsupported } = props;
  const [hasBeenInViewport, setHasBeenInViewport] = useState(false);

  const hasAssetUrl = notEmptyOrNil(assetUrl);

  const [isInViewport, targetRef] = useIsInViewport();

  const fallbackImageUrl = getFallbackArtworkUrl(collection);

  useEffect(() => {
    if (isInViewport) {
      setHasBeenInViewport(true);
    }
  }, [isInViewport]);

  if (hasAssetUrl) {
    return (
      <Box ref={targetRef}>
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
              fallbackImageUrl={fallbackImageUrl}
              url={assetUrl}
              posterUrl={posterUrl}
              hasBeenInViewport={hasBeenInViewport}
              isUnsupported={isUnsupported}
            />
          </AnimatePresence>
        </AspectRatio>
      </Box>
    );
  }

  return <AspectRatio ratio={1 / 1} />;
}

interface RenderArtworkCardMediaProps {
  fallbackImageUrl?: string;
  url: string;
  hasBeenInViewport: boolean;
  isUnsupported: boolean;
  posterUrl?: string;
}

function RenderArtworkCardMedia(
  props: RenderArtworkCardMediaProps
): JSX.Element {
  const { fallbackImageUrl, url, posterUrl, hasBeenInViewport, isUnsupported } =
    props;

  const isUrlVideo = isVideo(url);
  const isUrlModel = isModel(url);

  const animationProps = {
    initial: { opacity: 0 },
    exit: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.1 },
  };

  if (isUnsupported) {
    return (
      <Flex
        center
        css={{
          height: '100%',
          width: '100%',
          ...createCanvasBackground({
            imageUrl: buildActivityCardFallbackAssetUrl(fallbackImageUrl),
          }),
        }}
      >
        <ArtworkCardUnsupportedMediaIconWrapper
          aria-label={getFallbackArtworkLabel()}
          css={{
            '@bp1-max': {
              width: '40px',
              height: '40px',

              '& svg': {
                width: '50%',
              },
            },
          }}
        >
          <AssetUnsupportedIcon />
        </ArtworkCardUnsupportedMediaIconWrapper>
      </Flex>
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
      <Box
        css={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        <ArtworkCardPill.Wrapper
          css={{
            position: 'absolute',
            left: '$5',
            top: '$5',
            '@media(max-width: 800px)': {
              display: 'none',
            },
          }}
        >
          <ThreeDIcon height={16} width={16} />
          <ArtworkCardPill.Label>3D</ArtworkCardPill.Label>
        </ArtworkCardPill.Wrapper>
        <MotionImage
          {...animationProps}
          loading="lazy"
          src={posterUrl}
          style={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    );
  }

  return (
    <MotionImage
      {...animationProps}
      loading="lazy"
      src={url}
      style={{
        display: 'block',
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
