import Box from 'components/base/Box';

import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from 'components/transactions/TransactionHeading';
import TransactionParagraph from 'components/transactions/TransactionParagraph';
import TransactionSubmitButton from 'components/transactions/generic/TransactionSubmitButton';

import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

export default function SelfDestructFields() {
  return (
    <TransitionPane>
      <TransactionCard>
        <Box>
          <TransactionHeading css={{ marginBottom: '$5' }}>
            Self-destruct this collection
          </TransactionHeading>

          <TransactionParagraph css={{ marginBottom: '$7' }}>
            Self-destructing a collection destroys the collection and removes it
            from your creator profile. Please note, this action cannot be
            reversed.
          </TransactionParagraph>
        </Box>
        <TransactionSubmitButton
          label="Self-destruct Collection"
          submittingLabel="Self-destructing Collection…"
          submittedLabel="Collection self-destructed"
        />
      </TransactionCard>
    </TransitionPane>
  );
}
