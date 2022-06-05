import { styled } from 'stitches.config';
import Text from 'components/base/Text';

const TrendingUsername = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$semibold',
  fontSize: '$1',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export default TrendingUsername;
