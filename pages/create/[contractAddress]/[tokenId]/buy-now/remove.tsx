import { useCallback } from 'react';
import { T } from 'ramda';

import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import BuyNowRemoveFields from 'components/transactions/buy-now/BuyNowRemoveFields';
import BuyNowRemoveSuccess from 'components/transactions/buy-now/BuyNowRemoveSuccess';
import { getNonModeratedTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import { BuyNowRemoveSchema } from 'schemas/buy-now';
import { CancelBuyNowFormValues } from 'components/transactions/buy-now/types';
import useSegmentEvent, {
  SegmentMarketEvent,
} from 'hooks/analytics/use-segment-event';

import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import { useOpenBuyNow } from 'hooks/queries/hasura/markets/use-buy-now';
import useCancelBuyNow from 'hooks/web3/transactions/use-cancel-buy-now';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';

import { transactionCopy } from 'lib/transaction-copy';

RemoveBuyNow.getLayout = getNonModeratedTransactionLayout(
  'Remove Buy Now price'
);

export default function RemoveBuyNow() {
  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  const defaultParams = {
    contractAddress: artwork?.contractAddress,
    tokenId: artwork?.tokenId,
  };

  const { data: buyNowData, refetch: refetchBuyNow } = useOpenBuyNow(
    defaultParams,
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );

  const [{ txHash, isSuccess }, handleTransaction] = useTransactionEventHandler(
    { onSuccess: () => refetchBuyNow() }
  );

  const hasBuyNowPrice = Boolean(buyNowData);

  const [sendSegmentEvent] = useSegmentEvent();

  const {
    mutateAsync: cancelBuyNow,
    reset: resetCancelBuyNow,
    error: cancelBuyNowError,
  } = useCancelBuyNow({
    onSuccess: () => {
      sendSegmentEvent<SegmentMarketEvent>({
        eventName: 'buy_now_removed',
        payload: {
          contractAddress: buyNowData?.contractAddress,
          tokenId: buyNowData?.tokenId,
          sellerAddress: buyNowData?.seller,
          buyerAddress: buyNowData?.buyer,
          creatorAddress: artwork?.publicKey,
          ethAmount: buyNowData?.amountInETH,
        },
      });
    },
  });

  const handleSubmit = useCallback(
    async (values: CancelBuyNowFormValues) => {
      const tx = await cancelBuyNow({
        contractAddress: values.contractAddress,
        tokenId: values.tokenId,
      });
      await handleTransaction(tx);
    },
    [handleTransaction, cancelBuyNow]
  );

  const copy = transactionCopy['buy-now-remove'];

  return (
    <TransactionFlow<CancelBuyNowFormValues>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: cancelBuyNowError,
          description: copy.error.description,
          onReset: resetCancelBuyNow,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => <BuyNowRemoveSuccess artwork={artwork} />,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: BuyNowRemoveSchema,
        initialValues: {
          ...defaultParams,
          hasBuyNowPrice,
        },
      }}
      steps={[[T, () => <BuyNowRemoveFields />]]}
    />
  );
}
