import { useCallback } from 'react';
import { T } from 'ramda';
import { useAccount } from 'wagmi';

import ListSuccess from 'components/transactions/list/ListSuccess';
import ListFields from 'components/transactions/list/ListFields';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import { getTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';
import { ListFormValues } from 'components/transactions/list/types';

import { ListArtworkSchema } from 'schemas/list';

import useCreateReserveAuction from 'hooks/web3/transactions/use-create-reserve-auction';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import { useApprovalModal } from 'hooks/web3/use-has-approval';

import { transactionCopy } from 'lib/transaction-copy';
import useSegmentEvent, {
  SegmentMarketEvent,
} from 'hooks/analytics/use-segment-event';

ListNft.getLayout = getTransactionLayout('Sell with Reserve Auction');

export default function ListNft() {
  const [{ txHash, isSuccess }, handleTransaction] =
    useTransactionEventHandler();

  const [{ data: currentUser }] = useAccount();

  const currentUserPublicAddress = currentUser?.address;

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  useApprovalModal({
    contractAddress: artwork?.contractAddress,
    publicAddress: currentUserPublicAddress,
  });

  const [sendSegmentEvent] = useSegmentEvent();

  const {
    mutateAsync: createReserveAuction,
    reset: resetReserveAuction,
    error: updateReserveAuctionError,
  } = useCreateReserveAuction({
    onSuccess: (_, variables) => {
      sendSegmentEvent<SegmentMarketEvent>({
        eventName: 'artwork_listed',
        payload: {
          tokenId: artwork.tokenId,
          contractAddress: artwork.contractAddress,
          ethAmount: Number(variables.reservePrice),
          buyerAddress: null,
          sellerAddress: currentUserPublicAddress,
          creatorAddress: artwork?.publicKey,
        },
      });
    },
  });

  const handleSubmit = useCallback(
    async (values: ListFormValues) => {
      const tx = await createReserveAuction(values);
      await handleTransaction(tx);
    },
    [handleTransaction, createReserveAuction]
  );

  const copy = transactionCopy['list-auction'];

  return (
    <TransactionFlow<ListFormValues>
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
          component: () => (
            <ListSuccess
              currentUserPublicKey={currentUserPublicAddress}
              artwork={artwork}
              txHash={txHash}
            />
          ),
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: ListArtworkSchema,
        initialValues: {
          reservePrice: '',
          tokenId: artwork?.tokenId,
          contractAddress: artwork?.contractAddress,
        },
      }}
      steps={[
        [
          T,
          (formikState) => (
            <ListFields
              reservePrice={Number(formikState.values.reservePrice)}
              artwork={artwork}
              currentUserPublicAddress={currentUserPublicAddress}
            />
          ),
        ],
      ]}
    />
  );
}
