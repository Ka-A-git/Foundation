import Text from 'components/base/Text';
import { styled } from 'stitches.config';

const ArtworkCardMetaLabel = styled(Text, {
  fontSize: '$0',
  fontWeight: '$semibold',
  fontFamily: '$body',
  variants: {
    color: {
      light: {
        color: '$black60',
      },
      dark: {
        color: '$black30',
      },
      black: {
        color: '$black100',
      },
    },
  },
});

export const ArtworkCardMetaValue = styled(ArtworkCardMetaLabel, {
  fontSize: '$2',
});

export default ArtworkCardMetaLabel;
