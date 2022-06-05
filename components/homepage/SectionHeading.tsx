import { ReactNode } from 'react';
import { styled } from 'stitches.config';
import NextLink from 'next/link';

import Text from 'components/base/Text';
import Flex from 'components/base/Flex';
import ButtonV2 from 'components/base/ButtonV2';

interface SectionHeadingProps {
  children: ReactNode;
  link?: {
    href?: string;
    text?: string;
  };
}

export default function SectionHeading(props: SectionHeadingProps) {
  const { children, link } = props;
  return (
    <Container>
      <Text weight="medium" size={{ '@initial': 3, '@bp2': 4 }}>
        {children}
      </Text>
      {link && (
        <NextLink href={link.href} passHref prefetch={false}>
          <ButtonV2 as="a" variant="secondary">
            {link.text}
          </ButtonV2>
        </NextLink>
      )}
    </Container>
  );
}

const Container = styled(Flex, {
  lineHeight: '$base',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$4',
  '@bp2': {
    marginBottom: '$6',
  },
});
