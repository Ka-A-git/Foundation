import { useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { T } from 'ramda';
import { BigNumber } from 'ethers';

import BidSuccess from 'components/transactions/bid/BidSuccess';
import BidFields from 'components/transactions/bid/BidFields';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import { getTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import { BidFormValues } from 'components/transactions/bid/types';

import { createBidAmountSchema } from 'schemas/transaction';

import useSegmentEvent from 'hooks/analytics/use-segment-event';
import useBalances from 'hooks/web3/use-balances';
import usePlaceBid from 'hooks/web3/transactions/use-place-bid';
import useGetMinBidAmount from 'hooks/web3/transactions/use-get-min-bid-amount';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';

import { transactionCopy } from 'lib/transaction-copy';

import { isAllTrue } from 'utils/helpers';
import { areKeysEqual } from 'utils/users';
import { getMostRecentAuction } from 'utils/auctions/auctions';
import { isNonUserRejectedError } from 'utils/transactions';

PlaceBid.getLayout = getTransactionLayout('Place bid');

export default function PlaceBid() {
  const [{ txHash, isSuccess }, handleTransaction] =
    useTransactionEventHandler();

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  const [{ data: user }] = useAccount();
  const currentUserAddress = user?.address;

  const { data: balanceData } = useBalances({
    publicKey: currentUserAddress,
  });

  const [sendSegmentEvent] = useSegmentEvent();

  const balance = balanceData?.ethBalance;
  const auction = getMostRecentAuction(artwork);
  const hasBids = Boolean(auction?.highestBidder);
  const auctionId = auction?.auctionId;

  const { data: minBidAmount } = useGetMinBidAmount(
    { auctionId },
    { initialData: BigNumber.from(0) }
  );

  const {
    mutateAsync: placeBid,
    reset: resetPlaceBid,
    error: placeBidError,
  } = usePlaceBid();

  const canFireEvent = isAllTrue([
    auctionId,
    artwork?.tokenId,
    artwork?.contractAddress,
  ]);

  useEffect(
    () => {
      if (canFireEvent) {
        sendSegmentEvent({
          eventName: 'bid_viewed',
          payload: {
            auctionId: auctionId,
            tokenId: Number(artwork.tokenId),
            contractAddress: artwork.contractAddress,
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canFireEvent]
  );

  const handleSubmit = useCallback(
    async (values: BidFormValues) => {
      const tx = await placeBid(values, {
        onSuccess: async () => {
          sendSegmentEvent({
            eventName: 'bid_approved',
            payload: {
              auctionId: auctionId,
              tokenId: Number(artwork.tokenId),
              contractAddress: artwork.contractAddress,
              bidAmount: values.amount,
            },
          });
        },
        onError: (err) => {
          const isTxRejectionError = !isNonUserRejectedError(err);

          if (isTxRejectionError) {
            sendSegmentEvent({
              eventName: 'bid_rejected',
              payload: {
                auctionId: auctionId,
                tokenId: Number(artwork.tokenId),
                contractAddress: artwork.contractAddress,
                bidAmount: values.amount,
              },
            });
          }
        },
      });
      await handleTransaction(tx);
    },
    [handleTransaction, placeBid, sendSegmentEvent, auctionId, artwork]
  );

  const copy = transactionCopy['bid-place'];

  return (
    <TransactionFlow<BidFormValues>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: placeBidError,
          description: copy.error.description,
          onReset: resetPlaceBid,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => <BidSuccess artwork={artwork} />,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: createBidAmountSchema(minBidAmount, balance),
        initialValues: {
          auctionId,
          amount: '',
          isOwner: areKeysEqual([artwork?.ownerPublicKey, currentUserAddress]),
          isHighestBidder: areKeysEqual([
            auction?.highestBidder,
            currentUserAddress,
          ]),
          isOpenForBids: Boolean(minBidAmount),
        },
      }}
      steps={[
        [
          T,
          () => (
            <BidFields
              balance={balance}
              minBidAmount={minBidAmount}
              hasBids={hasBids}
            />
          ),
        ],
      ]}
    />
  );
}
