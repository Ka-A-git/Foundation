import NextLink from 'next/link';

import Box from 'components/base/Box';
import Link from 'components/base/Link';
import ActivityCardMedia from './ActivityCardMedia';

import {
  buildArtworkPath,
  isUnsupportedArtworkAsset,
} from 'utils/artwork/artwork';
import { buildArtworkCardAssetUrl, buildPosterUrl } from 'utils/assets';
import { ActivityArtwork } from './types';

interface ActivityCardImageProps {
  artwork: ActivityArtwork;
}

export default function ActivityCardImage(
  props: ActivityCardImageProps
): JSX.Element {
  const { artwork } = props;

  const assetUrl = buildArtworkCardAssetUrl(artwork);
  const posterUrl = buildPosterUrl(artwork);

  const creator = artwork.creator;

  const artworkPath = buildArtworkPath({ artwork, user: creator });

  return (
    <Box
      css={{
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <NextLink href={artworkPath} passHref>
        <Link
          css={{
            display: 'block',
            textDecoration: 'none',
          }}
        >
          <ActivityCardMedia
            assetUrl={assetUrl}
            collection={artwork.collection}
            isUnsupported={isUnsupportedArtworkAsset(artwork)}
            posterUrl={posterUrl}
          />
        </Link>
      </NextLink>
    </Box>
  );
}
