import { useCallback } from 'react';
import { T } from 'ramda';

import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import UnlistSuccess from 'components/transactions/unlist/UnlistSuccess';
import UnlistFields from 'components/transactions/unlist/UnlistFields';
import { getNonModeratedTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import { CancelReserveAuctionSchema } from 'schemas/unlist';

import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import useCancelReserveAuction, {
  CancelReserveAuctionVariables,
} from 'hooks/web3/transactions/use-cancel-reserve-auction';

import { transactionCopy } from 'lib/transaction-copy';
import { getMostRecentAuction } from 'utils/auctions/auctions';

ChangePrice.getLayout = getNonModeratedTransactionLayout('Unlist NFT');

export default function ChangePrice() {
  const [{ txHash, isSuccess }, handleTransaction] =
    useTransactionEventHandler();

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  const auction = getMostRecentAuction(artwork);

  const {
    mutateAsync: cancelReserveAuction,
    reset: resetReserveAuction,
    error: cancelReserveAuctionError,
  } = useCancelReserveAuction();

  const handleSubmit = useCallback(
    async (values: CancelReserveAuctionVariables) => {
      const tx = await cancelReserveAuction(values);
      await handleTransaction(tx);
    },
    [handleTransaction, cancelReserveAuction]
  );

  const copy = transactionCopy['auction-cancel'];

  return (
    <TransactionFlow<CancelReserveAuctionVariables>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: cancelReserveAuctionError,
          description: copy.error.description,
          onReset: resetReserveAuction,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => <UnlistSuccess artwork={artwork} />,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: CancelReserveAuctionSchema,
        initialValues: {
          auctionId: auction?.auctionId,
        },
      }}
      steps={[[T, () => <UnlistFields />]]}
    />
  );
}
