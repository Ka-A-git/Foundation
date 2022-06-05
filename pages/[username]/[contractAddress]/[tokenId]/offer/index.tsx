import { useCallback } from 'react';
import { max, T } from 'ramda';

import { useAccount } from 'wagmi';

import OfferPlaceSuccess from 'components/transactions/offer/OfferPlaceSuccess';
import OfferFields from 'components/transactions/offer/OfferFields';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import { getTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import { createOfferSchema } from 'schemas/offer';
import { MakeOfferFormValues } from 'components/transactions/offer/types';

import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';

import useMakeOffer from 'hooks/web3/transactions/use-make-offer';
import useBalances from 'hooks/web3/use-balances';
import useGetMinOfferAmount from 'hooks/web3/transactions/use-get-min-offer-amount';
import useSegmentTransaction from 'hooks/analytics/use-track-transaction';

import { areKeysEqual } from 'utils/users';
import { isAllTrue, isAnyTrue } from 'utils/helpers';
import { transactionCopy } from 'lib/transaction-copy';
import { MIN_MARKET_AMOUNT } from 'lib/constants';
import { SegmentMarketEvent } from 'hooks/analytics/use-segment-event';

MakeOffer.getLayout = getTransactionLayout('Make offer');

export default function MakeOffer() {
  const [{ txHash, isSuccess }, handleTransaction] =
    useTransactionEventHandler();

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  const defaultParams = {
    contractAddress: artwork?.contractAddress,
    tokenId: artwork?.tokenId,
  };

  const { data: minOfferAmount, isLoading: isMinOfferAmountLoading } =
    useGetMinOfferAmount(defaultParams);

  const [{ data: user }] = useAccount();

  const { data: balancesData } = useBalances({
    publicKey: user?.address,
  });

  const [payload, sendSegmentEvent] = useSegmentTransaction<SegmentMarketEvent>(
    {
      viewedEventName: 'offer_viewed',
      isReady: isAllTrue([user, artwork]),
      payload: {
        contractAddress: artwork?.contractAddress,
        tokenId: artwork?.tokenId,
        sellerAddress: artwork?.ownerPublicKey,
        buyerAddress: user?.address,
        creatorAddress: artwork?.publicKey,
        ethAmount: null,
      },
    }
  );

  const {
    mutateAsync: makeOffer,
    reset: resetMakeOffer,
    error: makeOfferError,
  } = useMakeOffer({
    onSuccess: (_, variables) => {
      sendSegmentEvent({
        eventName: 'offer_made',
        payload: { ...payload, ethAmount: Number(variables.amount) },
      });
    },
  });

  const handleSubmit = useCallback(
    async (values: MakeOfferFormValues) => {
      const tx = await makeOffer(values);
      await handleTransaction(tx);
    },
    [handleTransaction, makeOffer]
  );

  const copy = transactionCopy['offer-place'];

  const availableBalance =
    balancesData?.ethBalance + balancesData?.availableFethBalance;

  return (
    <TransactionFlow<MakeOfferFormValues>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isAnyTrue([isArtworkLoading, isMinOfferAmountLoading]),
        },
        error: {
          error: makeOfferError,
          description: copy.error.description,
          onReset: resetMakeOffer,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => <OfferPlaceSuccess artwork={artwork} />,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: createOfferSchema(
          // returns the max of these two numbers
          max(MIN_MARKET_AMOUNT, minOfferAmount),
          availableBalance
        ),
        initialValues: {
          contractAddress: artwork?.contractAddress,
          tokenId: artwork?.tokenId,
          amount: '',
          balance: balancesData?.ethBalance,
          // when minOfferAmount is 0 return null
          maxOffer: minOfferAmount || null,
          isOwner: areKeysEqual([artwork?.ownerPublicKey, user?.address]),
          fethBalance: balancesData?.availableFethBalance,
        },
      }}
      steps={[
        [
          T,
          (formikState) => (
            <OfferFields
              balance={formikState.values.balance}
              offerBalance={Number(formikState.values.fethBalance)}
              maxOffer={formikState.values.maxOffer}
            />
          ),
        ],
      ]}
    />
  );
}
