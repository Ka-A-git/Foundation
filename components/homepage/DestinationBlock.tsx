import { styled } from 'stitches.config';
import { H2Heading } from 'components/base/Heading';
import { onGridPx } from 'utils/styles';

import CtaBlock from 'components/homepage/CtaBlock';
import Flex from 'components/base/Flex';
import Text from 'components/base/Text';

export default function DestinationBlock(): JSX.Element {
  return (
    <Container>
      <Heading size={{ '@initial': 4, '@bp2': 6 }} weight="medium">
        Foundation is a web3 destination.
      </Heading>
      <Paragraph size={{ '@initial': 2, '@bp2': 3 }} weight="regular">
        We are laying the groundwork for web3 — the next generation of the
        internet full of limitless possibilities. In web3, your creativity is
        valued and your digital objects belong to you.
      </Paragraph>
      <Grid>
        <Jellyfish src="/images/homepage/jellyfish.png" />
        <Sun src="/images/homepage/sun.png" />
        <CtaBlock
          heading="Create"
          link={{ href: '/how-to-create', text: 'Learn more' }}
          paragraph="Creative building blocks for web3."
        />
        <CtaBlock
          heading="Collect"
          link={{ href: '/how-to-collect', text: 'Learn more' }}
          paragraph="Unearth NFTs for your growing collection."
        />
        <CtaBlock
          heading="Sell"
          link={{ href: '/how-to-sell', text: 'Learn more' }}
          paragraph="Your NFTs will shine in our marketplace."
        />
      </Grid>
    </Container>
  );
}

const Container = styled(Flex, {
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  marginTop: onGridPx(30),
  '@bp2': {
    marginTop: onGridPx(70),
  },
});

const Grid = styled(Flex, {
  gap: '$5',
  width: '100%',
  marginTop: '$9',
  flexDirection: 'column',
  position: 'relative',
  '@bp2': {
    gap: '$7',
    paddingX: '$9',
    flexDirection: 'row',
  },
});

const Heading = styled(H2Heading, {
  lineHeight: '$base',
  marginBottom: '$4',
  maxWidth: 320,
  '@bp2': {
    maxWidth: '100%',
  },
});

const Paragraph = styled('p', Text, {
  color: '$black70',
  lineHeight: '$mid',
  maxWidth: 340,
  '@bp2': {
    maxWidth: 740,
  },
});

const Jellyfish = styled('img', {
  width: 118,
  height: 206,
  display: 'none',
  position: 'absolute',
  '@bp2': {
    bottom: -68,
    left: -68,
    display: 'block',
  },
  '@bp4': {
    bottom: -68,
    left: -88,
  },
});

const Sun = styled('img', {
  width: 130,
  height: 160,
  display: 'none',
  position: 'absolute',
  '@bp2': {
    top: -130,
    right: -60,
    display: 'block',
  },
  '@bp4': {
    top: -130,
    right: -80,
  },
});
