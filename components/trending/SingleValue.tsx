import Text from 'components/base/Text';
import { styled } from 'stitches.config';

const SingleValue = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$semibold',
  fontSize: '$1',
  letterSpacing: -0.2,
  whiteSpace: 'nowrap',
  '@bp2': {
    fontSize: '$3',
  },
});

export default SingleValue;
