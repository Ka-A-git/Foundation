import { useCallback, useMemo } from 'react';
import { T } from 'ramda';
import { useAccount } from 'wagmi';

import BuyNowFields from 'components/transactions/buy-now/BuyNowFields';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import BuyNowTransactionSuccess from 'components/transactions/buy-now/BuyNowTransactionSuccess';
import { getTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import useSegmentEvent, {
  SegmentMarketEvent,
} from 'hooks/analytics/use-segment-event';
import { BuyNowSetSchema } from 'schemas/buy-now';
import { BuyNowStatus } from 'types/BuyNow';
import { SetBuyNowFormValues } from 'components/transactions/buy-now/types';

import { useApprovalModal } from 'hooks/web3/use-has-approval';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import useSetBuyNowPrice from 'hooks/web3/transactions/use-set-buy-now-price';
import { useOpenBuyNow } from 'hooks/queries/hasura/markets/use-buy-now';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';

import { areKeysEqual } from 'utils/users';
import { transactionCopy } from 'lib/transaction-copy';

CreateBuyNow.getLayout = getTransactionLayout('Set a Buy Now price');

export default function CreateBuyNow() {
  const [{ txHash, isSuccess }, handleTransaction] =
    useTransactionEventHandler();

  const { data: artwork } = useArtworkByContractTokenIdFromRouter({
    refetchOnWindowFocus: false,
  });

  const defaultParams = useMemo(
    () => ({
      contractAddress: artwork?.contractAddress,
      tokenId: artwork?.tokenId,
    }),
    [artwork]
  );

  const [{ data: user }] = useAccount();

  const { data: buyNowData, isSuccess: buyNowSuccess } = useOpenBuyNow(
    defaultParams,
    { refetchOnWindowFocus: false }
  );

  const buyNowPrice = buyNowData?.amountInETH;
  const hasBuyNowPrice = useMemo(
    () => buyNowData?.status === BuyNowStatus.Open,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [buyNowSuccess]
  );

  useApprovalModal({
    contractAddress: defaultParams.contractAddress,
    publicAddress: user?.address,
  });

  const [sendSegmentEvent] = useSegmentEvent();

  const {
    mutateAsync: setBuyNowPrice,
    reset: resetCreateBuyNow,
    error: buyNowError,
  } = useSetBuyNowPrice({
    onSuccess: (_, variables) => {
      sendSegmentEvent<SegmentMarketEvent>({
        eventName: hasBuyNowPrice ? 'buy_now_changed' : 'buy_now_set',
        payload: {
          ...defaultParams,
          buyerAddress: null,
          sellerAddress: user?.address,
          creatorAddress: artwork?.publicKey,
          ethAmount: Number(variables.buyNowPrice),
        },
      });
    },
  });

  const handleSubmit = useCallback(
    async (values: SetBuyNowFormValues) => {
      const tx = await setBuyNowPrice(values);
      await handleTransaction(tx);
    },
    [handleTransaction, setBuyNowPrice]
  );

  const copy = transactionCopy['buy-now-set'];

  return (
    <TransactionFlow<SetBuyNowFormValues>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: false,
        },
        error: {
          error: buyNowError,
          description: copy.error.description,
          onReset: resetCreateBuyNow,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: (formikState) => (
            <BuyNowTransactionSuccess
              artwork={artwork}
              buyNowPrice={Number(formikState.values.buyNowPrice)}
              buyNowMode={hasBuyNowPrice ? 'update' : 'set'}
            />
          ),
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: BuyNowSetSchema,
        initialValues: {
          contractAddress: artwork?.contractAddress,
          tokenId: artwork?.tokenId,
          buyNowPrice: hasBuyNowPrice ? buyNowPrice : '',
          currentPrice: buyNowPrice,
          hasBuyNowPrice,
          isOwner: areKeysEqual([user?.address, artwork?.ownerPublicKey]),
        },
      }}
      steps={[
        [
          T,
          () => <BuyNowFields buyNowMode={hasBuyNowPrice ? 'update' : 'set'} />,
        ],
      ]}
    />
  );
}
