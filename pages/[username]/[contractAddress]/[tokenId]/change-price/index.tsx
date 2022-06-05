import { useCallback } from 'react';
import { T } from 'ramda';

import ChangePriceSuccess from 'components/transactions/change-price/ChangePriceSuccess';
import ChangePriceFields from 'components/transactions/change-price/ChangePriceFields';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import { getTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';
import { UpdateReserveAuctionFormValues } from 'components/transactions/change-price/types';

import { ChangePriceArtworkSchema } from 'schemas/change-price';

import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import useUpdateReserveAuction from 'hooks/web3/transactions/use-update-reserve-auction';

import { transactionCopy } from 'lib/transaction-copy';
import { getMostRecentAuction } from 'utils/auctions/auctions';

ChangePrice.getLayout = getTransactionLayout('Change price');

export default function ChangePrice() {
  const [{ txHash, isSuccess }, handleTransaction] =
    useTransactionEventHandler();

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  const auction = getMostRecentAuction(artwork);

  const {
    mutateAsync: updateReserveAuction,
    reset: resetReserveAuction,
    error: updateReserveAuctionError,
  } = useUpdateReserveAuction();

  const handleSubmit = useCallback(
    async (values: UpdateReserveAuctionFormValues) => {
      const tx = await updateReserveAuction({
        ...values,
        reservePrice: Number(values.reservePrice),
      });
      await handleTransaction(tx);
    },
    [handleTransaction, updateReserveAuction]
  );

  const copy = transactionCopy['auction-change-reserve'];

  return (
    <TransactionFlow<UpdateReserveAuctionFormValues>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: updateReserveAuctionError,
          description: copy.error.description,
          onReset: resetReserveAuction,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => <ChangePriceSuccess artwork={artwork} />,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: ChangePriceArtworkSchema,
        initialValues: {
          auctionId: auction?.auctionId,
          reservePrice: '',
          currentPrice: auction?.reservePriceInETH,
        },
      }}
      steps={[[T, () => <ChangePriceFields />]]}
    />
  );
}
