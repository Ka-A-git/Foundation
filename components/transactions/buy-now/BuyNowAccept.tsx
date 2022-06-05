import Flex from 'components/base/Flex';
import Grid from 'components/base/Grid';
import Heading from 'components/base/Heading';
import TransactionParagraph from '../TransactionParagraph';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from '../TransactionHeading';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import { SetBuyNowPriceVariables } from 'hooks/web3/transactions/use-set-buy-now-price';

import { formatETHWithSuffix } from 'utils/formatters';

import { styled } from 'stitches.config';

interface BuyNowAcceptProps {
  buyNowPrice: number;
}

// TODO: Move this copy to lib/transactionCopy

export default function BuyNowAccept(props: BuyNowAcceptProps) {
  const { buyNowPrice } = props;

  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$5' }}>
          Buy Now
        </TransactionHeading>
        <TransactionParagraph css={{ marginBottom: '$8' }}>
          Confirm the transaction to buy the NFT.
        </TransactionParagraph>

        <Grid>
          <FeeBlock
            css={{
              paddingTop: '$6',
              paddingBottom: '$7',
              borderTop: 'solid 1px $black10',
            }}
          >
            <Heading size={1} css={{ color: '$black60' }}>
              Total Price
            </Heading>
            <Heading size={4}>{formatETHWithSuffix(buyNowPrice)}</Heading>
          </FeeBlock>
        </Grid>

        <TransactionSubmitButton<SetBuyNowPriceVariables>
          label="Confirm"
          submittingLabel="Confirming…"
          submittedLabel="Confirmed"
        />
      </TransactionCard>
    </TransitionPane>
  );
}

const FeeBlock = styled(Flex, {
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});
