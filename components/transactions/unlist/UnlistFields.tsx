import TransactionParagraph from '../TransactionParagraph';
import TransactionHeading from '../TransactionHeading';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

export default function UnlistFields() {
  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$5' }}>
          Unlist the NFT
        </TransactionHeading>

        <TransactionParagraph css={{ marginBottom: '$7' }}>
          Unlisting an NFT will remove the NFT from escrow and return it to your
          wallet. Please note—even when unlisted, the NFT will still remain on
          your profile. If you'd like to remove it, you will need to burn it.
        </TransactionParagraph>

        <TransactionSubmitButton
          label="Unlist NFT"
          submittingLabel="Unlisting NFT…"
          submittedLabel="NFT unlisted"
        />
      </TransactionCard>
    </TransitionPane>
  );
}
