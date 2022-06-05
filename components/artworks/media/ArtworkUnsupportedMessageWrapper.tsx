import { styled } from 'stitches.config';

import Flex from 'components/base/Flex';

export const ArtworkUnsupportedMessageWrapper = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$round',
  // Used to blur out the canvas background lines
  // Note: does not work on FF, but design degrades gracefully
  backdropFilter: 'blur(10px)',
  background: '$whiteT10',
  '& svg': {
    width: '24px',
    height: '24px',
    color: '$white100',
  },
});
