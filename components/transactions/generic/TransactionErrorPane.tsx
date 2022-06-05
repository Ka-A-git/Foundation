import { useAccount } from 'wagmi';
import { pathOr } from 'ramda';
import NextLink from 'next/link';

import Box from 'components/base/Box';
import Button from 'components/base/Button';
import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';

import { TransactionError } from './types';

import { transactionErrorCopy } from 'lib/transaction-errors';

interface TransactionErrorPaneProps {
  onReset: () => void;
  error: TransactionError;
  description: string;
}

export default function TransactionErrorPane(props: TransactionErrorPaneProps) {
  const { onReset, error, description } = props;

  const [{ data: currentUser }] = useAccount();

  const errorCode = getErrorCode(error);
  const errorCopy = transactionErrorCopy[errorCode];

  return (
    <TransactionProgressPane
      title={errorCopy ? errorCopy['title'] : 'An error occurred'}
      description={
        <Box css={{ maxWidth: 350 }}>
          {errorCopy ? errorCopy['description'] : description}
        </Box>
      }
      status="error"
      meta={
        errorCopy?.action === 'back-to-profile' ? (
          <NextLink
            href={currentUser ? `/${currentUser?.address}` : '/'}
            passHref
          >
            <Button
              as="a"
              hoverable
              color="black"
              size="large"
              shape="regular"
              css={{ width: '100%' }}
            >
              Back to profile
            </Button>
          </NextLink>
        ) : (
          <Button
            type="button"
            hoverable
            color="black"
            size="large"
            shape="regular"
            onClick={onReset}
            css={{ width: '100%' }}
          >
            Retry
          </Button>
        )
      }
    />
  );
}

const getErrorCode: (err: TransactionError) => string = pathOr(null, [
  'error',
  'data',
  'originalError',
  'data',
]);
