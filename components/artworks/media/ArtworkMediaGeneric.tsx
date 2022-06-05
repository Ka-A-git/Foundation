import { styled } from 'stitches.config';

import { ProductMedia } from 'components/media/Media';

import { BasicArtwork } from 'types/Artwork';
import { ArtworkMedia } from './ArtworkMedia';

interface ArtworkMediaGenericProps {
  artwork: BasicArtwork;
}

export default function ArtworkMediaGeneric(props: ArtworkMediaGenericProps) {
  const { artwork } = props;

  return (
    <ArtworkMedia.Container>
      <ArtworkContainer>
        <ProductMedia artwork={artwork} controls />
      </ArtworkContainer>
    </ArtworkMedia.Container>
  );
}

const ArtworkContainer = styled(ArtworkMedia.ContentContainer, {
  flex: 1,

  '.fullscreen': {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  '.fullscreen-enabled': {
    padding: '$6',
    background: '$white100',
  },
});
