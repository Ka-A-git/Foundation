import TransactionParagraph from '../TransactionParagraph';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from '../TransactionHeading';

import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import { BurnVariables } from 'hooks/web3/transactions/use-burn';

export default function BurnFields() {
  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$5' }}>
          Burn the NFT
        </TransactionHeading>
        <TransactionParagraph css={{ marginBottom: '$7' }}>
          Burning an NFT destroys the NFT and removes it from your creator
          profile. Please note, this action cannot be reversed.
        </TransactionParagraph>

        <TransactionSubmitButton<BurnVariables>
          label="Burn NFT"
          submittingLabel="Burning NFT…"
          submittedLabel="NFT burned"
        />
      </TransactionCard>
    </TransitionPane>
  );
}
