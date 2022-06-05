import NextLink from 'next/link';
import { styled } from 'stitches.config';

import Link from 'components/base/Link';

const StyledLink = styled(Link, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  textIndent: '-9999rem',
});

interface ArtworkHiddenLinkProps {
  name: string;
  artworkPath: string;
}

export default function ArtworkHiddenLink(props: ArtworkHiddenLinkProps) {
  const { name, artworkPath } = props;
  return (
    <NextLink passHref href={artworkPath} prefetch={false}>
      <StyledLink>{name}</StyledLink>
    </NextLink>
  );
}
