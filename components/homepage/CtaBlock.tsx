import NextLink from 'next/link';
import { styled } from 'stitches.config';

import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import { H2Heading } from 'components/base/Heading';
import { onGrid, onGridPx } from 'utils/styles';

type LinkProps = {
  href?: string;
  text?: string;
};

interface CtaBlockProps {
  heading: string;
  link: LinkProps;
  paragraph: string;
}

export default function CtaBlock(props: CtaBlockProps): JSX.Element {
  const { heading, paragraph, link } = props;
  return (
    <NextLink href={link.href} passHref>
      <Container as="a">
        <Heading size={4} weight="medium">
          {heading}
        </Heading>
        <Paragraph>{paragraph}</Paragraph>
      </Container>
    </NextLink>
  );
}

const Container = styled(Flex, {
  // anchor resets
  textDecoration: 'none',
  color: 'inherit',

  cursor: 'pointer',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  borderRadius: '$4',
  width: '100%',
  paddingY: '$9',
  paddingX: '$6',
  position: 'relative',
  transition: 'box-shadow $1 $ease, transform $1 $ease',
  boxShadow: '$card',
  overflow: 'hidden',

  '&:before': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    content: '""',
    transition: 'opacity $1 $ease',
    backgroundImage: 'url(/images/patterns/canvas-grid.svg)',
    backgroundPosition: 'center',
    backgroundSize: onGridPx(13),
    opacity: 0.7,
  },

  '@hover': {
    '&:hover': {
      boxShadow: '0 0 0 1px $colors$blackT5, $1',
      transform: 'translate3d(0, -2px, 0)',
      '&:before': {
        opacity: 1,
      },
    },
  },

  '&:active': {
    boxShadow: '0 0 0 1px $colors$blackT10',
    transform: 'translate3d(0, 2px, 0)',
  },

  '@bp2': {
    width: '50%',

    '&:before': {
      backgroundSize: onGridPx(16),
    },
  },
});

const Heading = styled(H2Heading, {
  marginBottom: '$2',
  lineHeight: '$sub',
  '@bp2': {
    marginBottom: '$4',
    lineHeight: '$base',
  },
});

const Paragraph = styled(Text, {
  color: '$black70',
  fontSize: '$2',
  lineHeight: '$mid',
  maxWidth: onGrid(54),
  '@bp2': {
    fontSize: 20,
  },
});
