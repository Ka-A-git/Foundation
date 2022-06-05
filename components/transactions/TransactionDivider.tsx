import { styled } from 'stitches.config';
import Divider from 'components/base/Divider';

const TransactionDivider = styled(Divider, {
  marginY: '$4',
  '@bp2': {
    marginY: '$8',
  },
});

export default TransactionDivider;
