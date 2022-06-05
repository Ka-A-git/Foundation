import { useCallback } from 'react';
import { T } from 'ramda';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';

import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import BuyNowSuccess from 'components/transactions/buy-now/BuyNowSuccess';
import BuyNowAccept from 'components/transactions/buy-now/BuyNowAccept';
import { getTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import useBuyNowTransaction, {
  BuyNowVariables,
} from 'hooks/web3/transactions/use-buy-now';
import { BuyNowFormValues } from 'components/transactions/buy-now/types';
import { SegmentMarketEvent } from 'hooks/analytics/use-segment-event';

import useSegmentTransaction from 'hooks/analytics/use-track-transaction';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import useReferral from 'hooks/web3/use-referral';
import useBalances from 'hooks/web3/use-balances';
import { useOpenBuyNow } from 'hooks/queries/hasura/markets/use-buy-now';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';

import { BUY_NOW_MIN_PRICE, createBuyNowSchema } from 'schemas/buy-now';

import { areKeysEqual } from 'utils/users';

import { transactionCopy } from 'lib/transaction-copy';
import { getFirstValue, isAllTrue } from 'utils/helpers';

BuyNow.getLayout = getTransactionLayout('Buy Now');

export default function BuyNow() {
  const router = useRouter();

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  const referralAddress = useReferral({
    contractAddress: artwork?.contractAddress,
  });

  const defaultParams = {
    contractAddress: artwork?.contractAddress,
    tokenId: artwork?.tokenId,
  };

  const { data: buyNowData, refetch: refetchGetBuyNowPrice } = useOpenBuyNow(
    defaultParams,
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );

  const [{ txHash, isSuccess }, handleTransaction] = useTransactionEventHandler(
    { onSuccess: () => refetchGetBuyNowPrice() }
  );

  const buyNowPrice = buyNowData?.amountInETH;
  const hasBuyNowPrice = Boolean(buyNowData);

  const [{ data: user }] = useAccount();
  const { data: balancesData } = useBalances({ publicKey: user?.address });

  const [payload, sendSegmentEvent] = useSegmentTransaction<SegmentMarketEvent>(
    {
      isReady: isAllTrue([buyNowData, artwork]),
      viewedEventName: 'buy_now_viewed',
      payload: {
        contractAddress: buyNowData?.contractAddress,
        tokenId: buyNowData?.tokenId,
        sellerAddress: buyNowData?.seller,
        buyerAddress: buyNowData?.buyer,
        creatorAddress: artwork?.publicKey,
        ethAmount: buyNowData?.amountInETH,
      },
    }
  );

  const {
    mutateAsync: buyNow,
    reset: resetBuyNow,
    error: buyNowError,
  } = useBuyNowTransaction({
    onSuccess: () => {
      sendSegmentEvent({
        eventName: 'buy_now_accepted',
        payload,
      });
    },
  });

  const handleSubmit = useCallback(
    async (values: BuyNowVariables) => {
      const tx = await buyNow(values);
      await handleTransaction(tx);
      await router.push({
        pathname: router.pathname,
        query: { ...router.query, txHash: tx.hash, price: buyNowPrice },
      });
    },
    [handleTransaction, buyNow, router, buyNowPrice]
  );

  const copy = transactionCopy['buy-now-accept'];

  const buyNowPriceParam = getFirstValue(router.query.price);

  return (
    <TransactionFlow<BuyNowFormValues>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: buyNowError,
          description: copy.error.description,
          onReset: resetBuyNow,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => (
            <BuyNowSuccess
              buyNowPrice={Number(buyNowPriceParam)}
              artwork={artwork}
            />
          ),
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: createBuyNowSchema(
          BUY_NOW_MIN_PRICE,
          balancesData?.ethBalance
        ),
        initialValues: {
          contractAddress: artwork?.contractAddress,
          tokenId: artwork?.tokenId,
          isOwner: areKeysEqual([artwork?.ownerPublicKey, user?.address]),
          payableAddress: referralAddress ?? ethers.constants.AddressZero,
          hasBuyNowPrice,
          buyNowPrice,
        },
      }}
      steps={[[T, () => <BuyNowAccept buyNowPrice={buyNowPrice} />]]}
    />
  );
}
