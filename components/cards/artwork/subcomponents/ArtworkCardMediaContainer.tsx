import Box from 'components/base/Box';
import { styled } from 'stitches.config';

const ArtworkCardMediaContainer = styled(Box, {
  position: 'relative',

  '&:after': {
    position: 'absolute',
    height: '1px',
    bottom: 0,
    left: 0,
    right: 0,
    content: '""',
    display: 'block',
    backgroundColor: '$blackT5',
  },
});

export default ArtworkCardMediaContainer;
