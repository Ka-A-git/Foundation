import Grid from 'components/base/Grid';
import SplitsUserSearch from 'components/forms/fields/SplitsUserSearch';
import SplitsSection from 'components/transactions/split/SplitsSection';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';
import TransactionHeading from '../TransactionHeading';
import TransactionParagraph from '../TransactionParagraph';

interface MintFieldsSplitsProps {
  publicAddress: string;
}

export default function MintFieldsSplits(props: MintFieldsSplitsProps) {
  const { publicAddress } = props;

  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$7' }}>
          Choose how your earnings are split
        </TransactionHeading>
        <TransactionParagraph css={{ marginBottom: '$8' }}>
          Primary sale earnings and royalty payments from secondary sales will
          be automatically deposited into each recipient’s wallet. Once your
          split contract is minted on the Ethereum blockchain, it cannot be
          updated or changed.
        </TransactionParagraph>
        <Grid css={{ gap: '$9' }}>
          <Grid css={{ gap: '$8' }}>
            <SplitsUserSearch publicAddress={publicAddress} name="splits" />
            <SplitsSection
              currentUserPublicAddress={publicAddress}
              name="splits"
            />
          </Grid>
          <TransactionSubmitButton
            label="Mint NFT"
            submittingLabel="Minting NFT…"
            submittedLabel="NFT Minted"
          />
        </Grid>
      </TransactionCard>
    </TransitionPane>
  );
}
