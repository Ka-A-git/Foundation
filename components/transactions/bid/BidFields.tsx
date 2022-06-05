import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import Grid from 'components/base/Grid';

import BidAmountInUSD from 'components/transactions/bid/BidAmountInUSD';
import BidStartNotice from './BidStartNotice';
import BidNotice from './BidNotice';
import ETHField from 'components/forms/fields/ETHField';
import ETHBalance from 'components/ETHBalance';
import TransactionHeading from '../TransactionHeading';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import MinBidAmount from './MinBidAmount';

import { formatETHWithSuffix } from 'utils/formatters';

interface BidFieldsProps {
  minBidAmount: number;
  balance: number;
  hasBids: boolean;
}

export default function BidFields(props: BidFieldsProps) {
  const { minBidAmount, balance, hasBids } = props;

  return (
    <TransitionPane>
      <TransactionCard>
        <Box>
          <TransactionHeading css={{ marginBottom: '$5' }}>
            Place bid
          </TransactionHeading>
          <Grid css={{ gap: '$2', marginBottom: '$5' }}>
            <Grid css={{ gap: '$6' }}>
              <MinBidAmount minBidAmount={minBidAmount} />
              <ETHField name="amount" placeholder="0" autoFocus />
            </Grid>

            <Flex>
              <BidAmountInUSD name="amount" />
            </Flex>
          </Grid>

          <Grid css={{ gap: '$6', '@bp1': { gap: '$7' } }}>
            <ETHBalance balance={balance} formatter={formatETHWithSuffix} />

            <Box>{hasBids ? <BidNotice /> : <BidStartNotice />}</Box>

            <Box>
              <TransactionSubmitButton
                label="Place bid"
                submittingLabel="Placing bid…"
                submittedLabel="Bid placed"
              />
            </Box>
          </Grid>
        </Box>
      </TransactionCard>
    </TransitionPane>
  );
}
