import { styled } from 'stitches.config';
import Paragraph from 'components/base/Paragraph';

const TransactionParagraph = styled(Paragraph, {
  fontSize: '$0',
  '@bp2': {
    fontSize: '$1',
  },
});

export default TransactionParagraph;
