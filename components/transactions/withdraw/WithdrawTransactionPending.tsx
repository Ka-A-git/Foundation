import Box from 'components/base/Box';
import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import TransactionHashLink from 'components/transactions/TransactionHashLink';

interface WithdrawTransactionPendingProps {
  txHash: string;
}

// TODO: Move this copy to lib/transactionCopy

export default function WithdrawTransactionPending(
  props: WithdrawTransactionPendingProps
) {
  const { txHash } = props;

  return (
    <TransactionProgressPane
      title="Converting…"
      description={
        <Box css={{ maxWidth: 350 }}>
          Your Offer Balance is being converted into ETH
        </Box>
      }
      status="pending"
      meta={<TransactionHashLink txHash={txHash} />}
    />
  );
}
