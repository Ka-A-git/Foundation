import Grid from 'components/base/Grid';
import Flex from 'components/base/Flex';
import Paragraph from 'components/base/Paragraph';

import BidLearnLink from './BidLearnLink';

export default function BidNotice() {
  return (
    <Grid css={{ gap: 10 }}>
      <Paragraph>Once a bid is placed, it cannot be withdrawn.</Paragraph>
      <Flex>
        <BidLearnLink />
      </Flex>
    </Grid>
  );
}
