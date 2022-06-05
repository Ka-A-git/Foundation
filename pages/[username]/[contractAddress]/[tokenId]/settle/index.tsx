import { useCallback } from 'react';
import { T } from 'ramda';
import { useAccount } from 'wagmi';

import SettleSuccess from 'components/transactions/settle/SettleSuccess';
import SettleFields from 'components/transactions/settle/SettleFields';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import { getTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import { SettleAuctionSchema } from 'schemas/settle';

import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import useFinalizeReserveAuction, {
  FinalizeReserveAuctionVariables,
} from 'hooks/web3/transactions/use-finalize-reserve-auction';
import useSegmentEvent, {
  SegmentAuctionEvent,
} from 'hooks/analytics/use-segment-event';

import { transactionCopy } from 'lib/transaction-copy';
import {
  getMostRecentAuction,
  isArtworkAuctionWinner,
} from 'utils/auctions/auctions';

type SegmentSettleEvent = SegmentAuctionEvent & {
  buyer: string;
  seller: string;
  settler: string;
};

SettleAuction.getLayout = getTransactionLayout('Settle auction');

export default function SettleAuction() {
  const [{ txHash, isSuccess }, handleTransaction] =
    useTransactionEventHandler();

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  const [sendSegmentEvent] = useSegmentEvent();

  const [{ data: user }] = useAccount();

  const publicAddress = user?.address;

  const auction = getMostRecentAuction(artwork);

  const isAuctionWinner = isArtworkAuctionWinner(publicAddress, auction);

  const {
    mutateAsync: finalizeReserveAuction,
    reset: resetReserveAuction,
    error: finalizeReserveAuctionError,
  } = useFinalizeReserveAuction({
    onSuccess: () => {
      sendSegmentEvent<SegmentSettleEvent>({
        eventName: 'auction_settled',
        payload: {
          auctionId: auction.auctionId,
          tokenId: artwork.tokenId,
          contractAddress: artwork.contractAddress,
          seller: auction.seller,
          buyer: auction.highestBidder,
          settler: publicAddress,
        },
      });
    },
  });

  const handleSubmit = useCallback(
    async (values: FinalizeReserveAuctionVariables) => {
      const tx = await finalizeReserveAuction(values);
      await handleTransaction(tx);
    },
    [handleTransaction, finalizeReserveAuction]
  );

  const copy = transactionCopy['auction-finalize'];

  return (
    <TransactionFlow<FinalizeReserveAuctionVariables>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: finalizeReserveAuctionError,
          description: copy.error.description,
          onReset: resetReserveAuction,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => (
            <SettleSuccess
              artwork={artwork}
              publicAddress={publicAddress}
              txHash={txHash}
            />
          ),
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: SettleAuctionSchema,
        initialValues: {
          auctionId: auction?.auctionId,
        },
      }}
      steps={[[T, () => <SettleFields isAuctionWinner={isAuctionWinner} />]]}
    />
  );
}
