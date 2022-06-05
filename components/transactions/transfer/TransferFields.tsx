import Box from 'components/base/Box';
import TransactionParagraph from '../TransactionParagraph';
import TransactionHeading from '../TransactionHeading';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import WalletAddressField from 'components/forms/WalletAddressField';

import { TransactionCard } from 'components/layouts/TransactionLayoutV2';
import { TransferVariables } from 'hooks/web3/transactions/use-transfer';

const transferToField: keyof TransferVariables = 'transferTo';

export default function TransferFields() {
  return (
    <TransitionPane>
      <TransactionCard>
        <Box css={{ marginBottom: '$7' }}>
          <TransactionHeading css={{ marginBottom: '$5' }}>
            Transfer NFT
          </TransactionHeading>
          <TransactionParagraph css={{ marginBottom: '$7' }}>
            Transfer the NFT to another user or wallet by entering an Ethereum
            address below.
          </TransactionParagraph>
          <WalletAddressField name={transferToField} placeholder="0x..." />
        </Box>
        <TransactionSubmitButton
          label="Transfer NFT"
          submittingLabel="Transferring NFT…"
          submittedLabel="NFT transferred"
        />
      </TransactionCard>
    </TransitionPane>
  );
}
