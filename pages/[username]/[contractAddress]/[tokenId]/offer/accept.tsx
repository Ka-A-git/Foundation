import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { T } from 'ramda';

import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import OfferAcceptFields from 'components/transactions/offer/OfferAcceptFields';
import OfferAcceptSuccess from 'components/transactions/offer/OfferAcceptSuccess';
import { getTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import { OfferAcceptSchema } from 'schemas/offer';
import { AcceptOfferFormValues } from 'components/transactions/offer/types';

import useSegmentTransaction from 'hooks/analytics/use-track-transaction';
import useOfferByStatus from 'hooks/queries/hasura/markets/use-offer-by-status';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import { useApprovalModal } from 'hooks/web3/use-has-approval';
import useAcceptOffer from 'hooks/web3/transactions/use-accept-offer';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';

import { OfferStatus } from 'types/Offer';
import { SegmentMarketEvent } from 'hooks/analytics/use-segment-event';

import { isUnixDateInPast, parseDateToUnix } from 'utils/dates/dates';
import { getFirstValue, isAllTrue } from 'utils/helpers';
import { areKeysEqual } from 'utils/users';
import { transactionCopy } from 'lib/transaction-copy';

AcceptOffer.getLayout = getTransactionLayout('Accept offer');

export default function AcceptOffer() {
  const {
    data: artwork,
    isLoading: isArtworkLoading,
    refetch: refetchArtwork,
  } = useArtworkByContractTokenIdFromRouter({
    refetchOnWindowFocus: false,
  });

  const [{ txHash, isSuccess }] = useTransactionEventHandler({
    onSuccess: () => refetchArtwork(),
  });

  const router = useRouter();

  const defaultParams = {
    contractAddress: artwork?.contractAddress,
    tokenId: artwork?.tokenId,
  };

  const { data: nftOfferData, isLoading: isOfferLoading } = useOfferByStatus(
    { ...defaultParams, status: OfferStatus.Highest },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  const offerExpiry = nftOfferData?.expiresAt;
  const buyerPublicKey = nftOfferData?.buyer?.publicKey;
  const offerAmount = nftOfferData?.amountInETH;
  const offerExpiryUnix = parseDateToUnix(offerExpiry);

  const acceptedOfferAmount = Number(getFirstValue(router.query.amount));

  const [{ data: user }] = useAccount();

  useApprovalModal({
    contractAddress: defaultParams.contractAddress,
    publicAddress: user?.address,
  });

  const [payload, sendSegmentEvent] = useSegmentTransaction<SegmentMarketEvent>(
    {
      viewedEventName: 'offer_viewed',
      isReady: isAllTrue([nftOfferData, artwork]),
      payload: {
        contractAddress: artwork?.contractAddress,
        tokenId: artwork?.tokenId,
        sellerAddress: artwork?.ownerPublicKey,
        buyerAddress: buyerPublicKey,
        creatorAddress: artwork?.publicKey,
        ethAmount: offerAmount,
      },
    }
  );

  const {
    mutateAsync: acceptOffer,
    reset: resetAcceptOffer,
    error: acceptOfferError,
  } = useAcceptOffer({
    onSuccess: () => {
      sendSegmentEvent({
        eventName: 'offer_accepted',
        payload,
      });
    },
  });

  const handleSubmit = useCallback(
    async (values: AcceptOfferFormValues) => {
      const tx = await acceptOffer(values);
      await router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          txHash: tx.hash,
          amount: Number(values.amount),
        },
      });
    },
    [acceptOffer, router]
  );

  const copy = transactionCopy['offer-accept'];

  return (
    <TransactionFlow<AcceptOfferFormValues>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading || isOfferLoading,
        },
        error: {
          error: acceptOfferError,
          description: copy.error.description,
          onReset: resetAcceptOffer,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => (
            <OfferAcceptSuccess
              artwork={artwork}
              txHash={txHash}
              offerAmount={acceptedOfferAmount}
            />
          ),
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: OfferAcceptSchema,
        initialValues: {
          offerFrom: buyerPublicKey,
          contractAddress: artwork?.contractAddress,
          tokenId: artwork?.tokenId,
          amount: offerAmount,
          isOwner: areKeysEqual([artwork?.ownerPublicKey, user?.address]),
          isExpired: isUnixDateInPast(offerExpiryUnix),
        },
      }}
      steps={[
        [
          T,
          (formikState) => (
            <OfferAcceptFields
              {...formikState.values}
              buyerPublicKey={buyerPublicKey}
              expiresAt={offerExpiryUnix}
            />
          ),
        ],
      ]}
    />
  );
}
