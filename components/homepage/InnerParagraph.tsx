import { styled } from 'stitches.config';

import ButtonV2 from 'components/base/ButtonV2';
import Flex from 'components/base/Flex';
import Mono from 'components/base/Mono';
import { Paragraph } from 'components/base/Text';
import { H2Heading } from 'components/base/Heading';

type LinkProps = {
  href?: string;
  text?: string;
};
interface InnerParagraphProps {
  heading: string;
  headingMaxWidth?: string | number;
  paragraph: string | React.ReactNode;
  paragraphMaxWidth?: string | number;
  preHeading: string;
  links?: {
    primary?: LinkProps;
    secondary?: LinkProps;
  };
}

export default function InnerParagraph(
  props: InnerParagraphProps
): JSX.Element {
  const {
    heading,
    headingMaxWidth,
    links,
    paragraph,
    paragraphMaxWidth,
    preHeading,
  } = props;
  return (
    <Container>
      <PreHeading uppercase size={0}>
        {preHeading}
      </PreHeading>
      <Heading
        css={{ maxWidth: headingMaxWidth }}
        size={{ '@initial': 4, '@bp2': 5, '@bp3': 7 }}
        weight="medium"
      >
        {heading}
      </Heading>
      <TextParagraph css={{ maxWidth: paragraphMaxWidth }}>
        {paragraph}
      </TextParagraph>
      {links && (
        <Buttons>
          {links.primary && (
            <ButtonV2 size={1} variant="primary">
              {links.primary.text}
            </ButtonV2>
          )}
          {links.secondary && (
            <ButtonV2
              css={!links.primary && { marginLeft: '-$6' }}
              size={1}
              variant="ghost"
            >
              {links.secondary.text}
            </ButtonV2>
          )}
        </Buttons>
      )}
    </Container>
  );
}

const Container = styled(Flex, {
  alignItems: 'flex-start',
  flexDirection: 'column',
});

const PreHeading = styled(Mono, {
  lineHeight: '$base',
  marginBottom: '$4',
});

const Heading = styled(H2Heading, {
  marginTop: '$5',
  marginBottom: '$5',
  lineHeight: '$base',
});

const TextParagraph = styled(Paragraph, {
  color: '$black70',
  lineHeight: '$mid',
  marginBottom: '$7',
  fontSize: '$2',
  strong: {
    color: '$black100',
    fontWeight: '$semibold',
  },
  '@bp2': {
    fontSize: 20, // This is fine for the marketing site * this is fine meme *
  },
});

const Buttons = styled(Flex, {
  gap: '$3',
});
