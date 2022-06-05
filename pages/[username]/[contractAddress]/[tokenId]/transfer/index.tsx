import { useCallback } from 'react';
import { T } from 'ramda';

import TransferSuccess from 'components/transactions/transfer/TransferSuccess';
import TransferFields from 'components/transactions/transfer/TransferFields';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import { getTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import useTransfer, {
  TransferVariables,
} from 'hooks/web3/transactions/use-transfer';

import { TransferArtworkSchema } from 'schemas/transfer';

import { transactionCopy } from 'lib/transaction-copy';

TransferPage.getLayout = getTransactionLayout('Transfer NFT');

export default function TransferPage() {
  const [{ txHash, isSuccess }, handleTransaction] =
    useTransactionEventHandler();

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  const {
    mutateAsync: transfer,
    reset: resetTransfer,
    error: transferError,
  } = useTransfer();

  const handleSubmit = useCallback(
    async (values: TransferVariables) => {
      const tx = await transfer(values);
      await handleTransaction(tx);
    },
    [handleTransaction, transfer]
  );

  const copy = transactionCopy['transfer'];

  return (
    <TransactionFlow<TransferVariables>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: transferError,
          description: copy.error.description,
          onReset: resetTransfer,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => <TransferSuccess artwork={artwork} />,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: TransferArtworkSchema,
        initialValues: {
          contractAddress: artwork?.contractAddress,
          tokenId: artwork?.tokenId,
          transferTo: '',
        },
      }}
      steps={[[T, () => <TransferFields />]]}
    />
  );
}
