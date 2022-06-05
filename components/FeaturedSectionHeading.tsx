import { ReactNode } from 'react';
import { styled } from 'stitches.config';
import NextLink from 'next/link';

import Flex from 'components/base/Flex';
import Link from 'components/base/Link';
import Text from 'components/base/Text';

interface FeaturedSectionHeadingProps {
  children: ReactNode;
  link?: {
    href?: string;
    text?: string;
  };
}

export default function FeaturedSectionHeading(
  props: FeaturedSectionHeadingProps
) {
  const { children, link } = props;
  return (
    <Container>
      <Text weight="medium" size={3}>
        {children}
      </Text>
      {link && (
        <NextLink href={link.href} passHref prefetch={false}>
          <ViewMoreLink weight="semibold" size={2}>
            {link.text}
          </ViewMoreLink>
        </NextLink>
      )}
    </Container>
  );
}

const Container = styled(Flex, {
  lineHeight: '$base',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  marginBottom: '$6',
  '@bp2': {
    marginBottom: '$7',
  },
});

const ViewMoreLink = styled(Link, {
  color: '$black70',
  lineHeight: '$base',
  textDecoration: 'none',
  transition: 'color $2 $ease',
  '&:hover': {
    color: '$black100',
  },
});
