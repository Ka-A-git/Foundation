import { styled } from 'stitches.config';
import Text from './Text';

const Link = styled('a', Text, {
  '&:focus-visible': {
    outline: '2px solid blue',
  },
});

export default Link;
