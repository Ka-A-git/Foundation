import TransactionParagraph from '../TransactionParagraph';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from '../TransactionHeading';

import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import { FinalizeReserveAuctionVariables } from 'hooks/web3/transactions/use-finalize-reserve-auction';

interface SettleFieldsProps {
  isAuctionWinner: boolean;
}

export default function SettleFields(props: SettleFieldsProps) {
  const { isAuctionWinner } = props;

  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$5' }}>
          Settle auction
        </TransactionHeading>
        {isAuctionWinner ? (
          <TransactionParagraph css={{ marginBottom: '$7' }}>
            Congratulations, you won the auction for the NFT. Settle the
            auction to add it to your collection.
          </TransactionParagraph>
        ) : (
          <TransactionParagraph css={{ marginBottom: '$7' }}>
            The auction has ended and ETH can now be claimed from the sale.
          </TransactionParagraph>
        )}

        <TransactionSubmitButton<FinalizeReserveAuctionVariables>
          label="Settle auction"
          submittingLabel="Settling auction…"
          submittedLabel="Auction settled"
        />

        <TransactionParagraph css={{ paddingTop: '$4', color: '$black60' }}>
          Settling the auction will release funds from escrow to the original
          owner.
        </TransactionParagraph>
      </TransactionCard>
    </TransitionPane>
  );
}
