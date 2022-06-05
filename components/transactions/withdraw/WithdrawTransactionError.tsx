import Box from 'components/base/Box';
import Button from 'components/base/Button';
import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';

interface WithdrawTransactionErrorProps {
  error: Error;
  onReset: () => void;
}

// TODO: Move this copy to lib/transactionCopy
export default function WithdrawTransactionError(
  props: WithdrawTransactionErrorProps
) {
  const { onReset } = props;

  // TODO: handle rendering of errors in here (using a getter fn)

  return (
    <TransactionProgressPane
      title="An error occurred"
      description={
        <Box css={{ maxWidth: 350 }}>
          There was an error while trying to withdraw your Offer balance.
        </Box>
      }
      status="error"
      meta={
        <Button
          type="button"
          hoverable
          color="black"
          size="large"
          shape="regular"
          onClick={onReset}
          css={{ width: '100%' }}
        >
          Try again
        </Button>
      }
    />
  );
}
