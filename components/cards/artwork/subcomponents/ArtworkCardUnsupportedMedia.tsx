import { createCanvasBackground } from 'utils/styles';

import AssetUnsupportedIcon from 'assets/icons/asset-unsupported-icon.svg';
import { styled } from 'stitches.config';
import { getFallbackArtworkLabel } from 'utils/artwork/artwork';
import { ArtworkUnsupportedMessageWrapper } from 'components/artworks/media/ArtworkUnsupportedMessageWrapper';
import Flex from 'components/base/Flex';

type ArtworkCardUnsupportedMediaProps = {
  fallbackImageUrl?: string;
};

export default function ArtworkCardUnsupportedMedia(
  props: ArtworkCardUnsupportedMediaProps
) {
  return (
    <Flex
      center
      css={{
        width: '100%',
        height: '100%',
        ...createCanvasBackground({
          imageUrl: props.fallbackImageUrl,
        }),
      }}
    >
      <ArtworkCardUnsupportedMediaIconWrapper
        aria-label={getFallbackArtworkLabel()}
      >
        <AssetUnsupportedIcon />
      </ArtworkCardUnsupportedMediaIconWrapper>
    </Flex>
  );
}

export const ArtworkCardUnsupportedMediaIconWrapper = styled(
  ArtworkUnsupportedMessageWrapper,
  {
    width: '56px',
    height: '56px',
    transition: 'opacity $1',
  }
);
