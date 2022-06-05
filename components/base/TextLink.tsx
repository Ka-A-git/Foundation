import { styled } from 'stitches.config';
import Link from './Link';

const TextLink = styled(Link, {
  display: 'block',
  color: '$black60',
  cursor: 'pointer',
  transition: 'color $0 $ease',
  fontWeight: '$semibold',
  textDecoration: 'none',
  '@hover': {
    '&:hover': {
      color: '$black100',
    },
  },
});

export default TextLink;
