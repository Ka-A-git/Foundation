import { styled } from 'stitches.config';

import CtaButton, { CtaButtonProps } from 'components/homepage/CtaButton';
import { Paragraph } from 'components/base/Text';
import { H1Heading } from 'components/base/Heading';
import { onGridPx } from 'utils/styles';

interface MarketingFooterProps {
  butterfly?: boolean;
  heading: string;
  link?: CtaButtonProps;
  maxWidth?: string | number;
  paragraph: string | React.ReactNode;
}

export default function MarketingFooter(props: MarketingFooterProps) {
  const { heading, paragraph, maxWidth, link, butterfly } = props;
  return (
    <>
      <Heading size={{ '@initial': 5, '@bp2': 9 }} weight="medium">
        {butterfly && (
          <Butterfly
            alt=""
            role="presentation"
            src="/images/homepage/butterfly.png"
            srcSet="/images/homepage/butterfly@2x.png 2x"
          />
        )}
        {heading}
      </Heading>
      <ParagraphText css={{ maxWidth }}>{paragraph}</ParagraphText>
      {link && <CtaButton {...link} />}
    </>
  );
}

const Heading = styled(H1Heading, {
  lineHeight: '$base',
  marginBottom: '$6',
  maxWidth: onGridPx(220),
  position: 'relative',
});

const ParagraphText = styled(Paragraph, {
  color: '$black70',
  textAlign: 'center',
  lineHeight: '$mid',
  marginBottom: '$7',
  fontSize: '$2',
  maxWidth: onGridPx(148),
  strong: {
    fontWeight: '$semibold',
    color: '$black100',
  },
  '@bp2': {
    fontSize: 20,
  },
});

const Butterfly = styled('img', {
  width: 64,
  top: -64,
  left: 14,
  height: 'auto',
  display: 'block',
  position: 'absolute',
  '@bp2': {
    width: 64,
    height: 76,
    top: -60,
    left: 8,
  },
});
