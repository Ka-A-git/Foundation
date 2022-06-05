import TransactionParagraph from '../TransactionParagraph';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from '../TransactionHeading';
import { LearnMoreArticleLink } from './BuyNowInfo';

import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import { SetBuyNowPriceVariables } from 'hooks/web3/transactions/use-set-buy-now-price';

export default function BuyNowRemoveFields() {
  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$5' }}>
          Remove Buy Now price
        </TransactionHeading>
        <TransactionParagraph css={{ marginBottom: '$4' }}>
          When you remove the Buy Now price, the NFT will be taken out of
          escrow, unlisted, and returned to your wallet.
        </TransactionParagraph>

        <LearnMoreArticleLink css={{ marginBottom: '$7' }} />

        <TransactionSubmitButton<SetBuyNowPriceVariables>
          label="Remove Buy Now price"
          submittingLabel="Removing Buy Now price…"
          submittedLabel="Buy Now price removed"
        />
      </TransactionCard>
    </TransitionPane>
  );
}
