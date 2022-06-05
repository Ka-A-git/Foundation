import Paragraph from 'components/base/Paragraph';
import Box from 'components/base/Box';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from '../TransactionHeading';
import ETHField from 'components/forms/fields/ETHField';
import Grid from 'components/base/Grid';
import Fees from '../generic/FeesTable';
import TextLink from 'components/base/TextLink';

import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import { MakeOfferVariables } from 'hooks/web3/transactions/use-make-offer';

import { formatETH, formatETHWithSuffix } from 'utils/formatters';
import Flex from 'components/base/Flex';
import Text from 'components/base/Text';

interface OfferFieldsProps {
  offerBalance: number;
  balance: number;
  maxOffer: number;
}

export default function OfferFields(props: OfferFieldsProps) {
  const { offerBalance, balance, maxOffer } = props;

  const hasOfferBalance = offerBalance > 0;

  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$7' }}>
          Make an Offer
        </TransactionHeading>
        {maxOffer && (
          <Grid css={{ marginBottom: '$6', gap: '$1' }}>
            <Text css={{ color: '$black60' }} weight="semibold">
              Your offer must be at least
            </Text>
            <Text size={2} weight="semibold">
              {formatETH(maxOffer)}
            </Text>
          </Grid>
        )}
        <Box css={{ marginBottom: '$8' }}>
          <ETHField placeholder="0.00" name="amount" />
          <Grid css={{ gap: '$4', marginY: '$6' }}>
            {hasOfferBalance && (
              <Fees.LineItem
                label="Offer Balance"
                value={formatETHWithSuffix(offerBalance)}
              />
            )}

            <Fees.LineItem
              label="Balance"
              value={formatETHWithSuffix(balance)}
            />
          </Grid>

          <Paragraph css={{ marginBottom: '$5' }}>
            After an Offer is sent, the owner will have up to 24 hours to accept
            it. If not accepted, the Offer will expire and return to your Offer
            Balance.
          </Paragraph>
          <LearnMoreLink />
        </Box>
        <TransactionSubmitButton<MakeOfferVariables>
          label="Make offer"
          submittingLabel="Making offer…"
          submittedLabel="Offer made"
        />
      </TransactionCard>
    </TransitionPane>
  );
}

function LearnMoreLink() {
  return (
    <Flex>
      <TextLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://help.foundation.app/hc/en-us/articles/4562020256667"
      >
        Learn how offers work
      </TextLink>
    </Flex>
  );
}
