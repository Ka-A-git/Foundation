import { styled } from 'stitches.config';

import Box from 'components/base/Box';
import CtaButton, { CtaButtonProps } from 'components/homepage/CtaButton';
import Mono from 'components/base/Mono';
import Text from 'components/base/Text';
import { H1Heading } from 'components/base/Heading';

interface MarketingHeroProps {
  heading: string;
  headingMaxWidth?: number | string;
  link?: CtaButtonProps;
  paragraph: string;
  preHeading: string;
  showHeader?: boolean;
  imagePrefix?: string;
}

export default function MarketingHero(props: MarketingHeroProps) {
  const { heading, headingMaxWidth, paragraph, preHeading, link, imagePrefix } =
    props;
  return (
    <Container>
      {imagePrefix && (
        <>
          <DesktopImage
            alt=""
            src={`images/homepage/hero/${imagePrefix}-left.png`}
            srcSet={`images/homepage/hero/${imagePrefix}-left@2x.png 2x`}
            role="presentation"
            css={{ right: 'calc(100% + $7)' }}
          />
          <DesktopImage
            alt=""
            src={`images/homepage/hero/${imagePrefix}-right.png`}
            srcSet={`images/homepage/hero/${imagePrefix}-right@2x.png 2x`}
            role="presentation"
            css={{ left: 'calc(100% + $7)' }}
          />
        </>
      )}
      <Mono uppercase size={{ '@initial': 0, '@bp2': 1 }}>
        {preHeading}
      </Mono>
      <Heading
        size={{ '@initial': 7, '@bp2': 9, '@bp3': 10 }}
        weight="medium"
        css={{
          '@bp3-max': { maxWidth: 740 },
          '@bp3': { maxWidth: headingMaxWidth },
        }}
      >
        {imagePrefix && (
          <>
            <MobileImage
              alt=""
              src={`images/homepage/hero/${imagePrefix}-mobile--left.png`}
              srcSet={`images/homepage/hero/${imagePrefix}-mobile--left@2x.png 2x`}
              role="presentation"
              css={{ left: '-$7' }}
            />
            <MobileImage
              alt=""
              src={`images/homepage/hero/${imagePrefix}-mobile--right.png`}
              srcSet={`images/homepage/hero/${imagePrefix}-mobile--right@2x.png 2x`}
              role="presentation"
              css={{ right: '-$7' }}
            />
          </>
        )}
        {heading}
      </Heading>
      <Paragraph size={{ '@initial': 2, '@bp2': 3 }}>{paragraph}</Paragraph>
      {link && (
        <Box css={{ marginTop: '$7' }}>
          <CtaButton {...link} />
        </Box>
      )}
    </Container>
  );
}

const Container = styled(Box, {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const Heading = styled(H1Heading, {
  position: 'relative',
  lineHeight: '$base',
  marginY: '$6',
  paddingX: '$6',
  '@bp2': {
    paddingX: 0,
    marginTop: '$6',
    marginBottom: '$8',
  },
});

const Paragraph = styled(Text, {
  color: '$black70',
  textAlign: 'center',
  lineHeight: '$mid',
  maxWidth: 300,
  '@bp2': {
    maxWidth: 500,
  },
});

const MobileImage = styled('img', {
  display: 'block',
  width: 70,
  height: 266,
  maxWidth: '100vw',
  position: 'absolute',
  transform: 'translateY(-50%)',
  top: '50%',
  '@bp2': {
    display: 'none',
  },
});

const DesktopImage = styled('img', {
  display: 'none',
  width: 1000,
  height: 648,
  maxWidth: '100vw',
  position: 'absolute',
  transform: 'translateY(-50%)',
  top: '50%',
  '@bp2': {
    display: 'block',
  },
});
