import { styled } from 'stitches.config';
import Text from './Text';

const Heading = styled('h2', Text, {
  fontFamily: '$body',
  fontWeight: '$semibold',
  variants: {
    tracking: {
      tight: {
        letterSpacing: '$4',
      },
    },
    leading: {
      tight: {
        lineHeight: '$sub',
      },
    },
  },
});

export const H1Heading = styled('h1', Heading, {});
export const H2Heading = styled('h2', Heading, {});
export const H3Heading = styled('h3', Heading, {});
export const DivHeading = styled('div', Heading, {});

export default Heading;
