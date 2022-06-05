import { useCallback, useEffect, useMemo, useState } from 'react';
import { assocPath } from 'ramda';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import * as Sentry from '@sentry/nextjs';

import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import MintTransactionSuccess from 'components/transactions/mint/MintTransactionSuccess';
import MintFieldsBasic from 'components/transactions/mint/MintFieldsBasic';
import MintFieldsSplits from 'components/transactions/mint/MintFieldsSplits';
import BackButton from 'components/collections/BackButton';
import { getMintLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import { ArtworkStatus } from 'types/Artwork';
import { MintFormValues } from 'components/transactions/mint/types';
import { MintArtworkSchema } from 'schemas/mint';

import useArtworkByContractTokenId from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import useSegmentEvent from 'hooks/analytics/use-segment-event';
import useGeneratePinataKey from 'hooks/web3/use-generate-pinata-key';
import useMintTransaction from 'hooks/mutations/use-mint-transaction';

import { transactionCopy } from 'lib/transaction-copy';

import {
  ArtworkByUuid,
  useArtworkByUuid,
} from 'graphql/hasura/queries/artwork-by-uuid.generated';
import { ArtworkByContractTokenId } from 'graphql/hasura/queries/artwork-by-contract-token-id.generated';

import { getError, getFirstValue, isAllTrue } from 'utils/helpers';

type FormStep = 'artwork-info' | 'splits-info';

type MintEvent = {
  tokenId: number;
  contractAddress: string;
};

MintPage.getLayout = getMintLayout('Mint an NFT');

export default function MintPage() {
  const [{ txHash }, handleTransaction] = useTransactionEventHandler();

  const router = useRouter();

  const [{ data: user }] = useAccount();

  const queryClient = useQueryClient();

  const [sendSegmentEvent] = useSegmentEvent();

  const publicAddress = user?.address;

  const txHashParam = getFirstValue(router.query.txHash);
  const artworkId = getFirstValue(router.query.id);

  const { data: artworkData, isLoading: isArtworkLoading } = useArtworkByUuid(
    { id: artworkId },
    {
      enabled: Boolean(artworkId),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (res) => {
        const hasMintedArtwork = isAllTrue([
          res.artwork.tokenId,
          res.artwork.collection,
          res.artwork.isIndexed,
        ]);

        // prime the cache for the contractSlug + tokenId style query
        if (hasMintedArtwork) {
          queryClient.setQueryData<ArtworkByContractTokenId>(
            useArtworkByContractTokenId.getKey({
              tokenId: res.artwork.tokenId,
              contractSlug: res.artwork.collection.slug,
            }),
            { artworks: [res.artwork] }
          );
          // make sure we only track the mint event once
          sendSegmentEvent<MintEvent>({
            eventName: 'artwork_minted',
            payload: {
              tokenId: res.artwork.tokenId,
              contractAddress: res.artwork.contractAddress,
            },
          });
        }
      },
      // refetch when a transaction is pending and no tokenId present
      refetchInterval: (res) => {
        const hasTokenId = Boolean(res?.artwork?.tokenId);
        const isIndexed = res?.artwork?.isIndexed;

        // artwork is ready in db when both tokenId && isIndexed === true
        const isArtworkReady = isAllTrue([hasTokenId, isIndexed]);
        // we should refetch is when it’s not ready in the
        // db  and we have a txHashParam from the URL
        const shouldRefetch = isAllTrue([!isArtworkReady, txHashParam]);

        return shouldRefetch ? 2500 : false;
      },
    }
  );

  // we need to memoize artwork here otherwise it re-renders the form
  const artwork = useMemo(
    () => artworkData?.artwork,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      artworkData?.artwork?.id,
      artworkData?.artwork?.tokenId,
      artworkData?.artwork?.isIndexed,
    ]
  );

  const isSuccess = isAllTrue([artwork?.tokenId, artwork?.isIndexed]);

  const { data: pinataApiKey, refetch: refetchPinataKey } =
    useGeneratePinataKey();

  const {
    mutateAsync: mintTransaction,
    reset: resetMintTransaction,
    error: mintTransactionError,
  } = useMintTransaction(
    { artwork, pinataApiKey },
    {
      onError: (err) => {
        Sentry.captureException(getError(err), {
          tags: { section: 'mint-flow', mutation: useMintTransaction.getKey() },
        });
      },
    }
  );

  const handleSubmit = useCallback(
    async (values: MintFormValues) => {
      try {
        const tx = await mintTransaction(values);
        return await handleTransaction(tx);
      } catch (err) {
        refetchPinataKey();
        console.log('catch handleSubmit', err);
      }
    },
    [mintTransaction, handleTransaction, refetchPinataKey]
  );

  const [formStep, setFormStep] = useState<FormStep>('artwork-info');

  const onBackClick = useCallback(() => {
    setFormStep('artwork-info');
  }, []);

  const copy = transactionCopy['mint'];

  return (
    <TransactionFlow<MintFormValues>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: mintTransactionError,
          description: copy.error.description,
          onReset: resetMintTransaction,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => <MintTransactionSuccess artwork={artwork} />,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: MintArtworkSchema,
        initialValues: {
          name: artwork?.name ?? '',
          description: artwork?.description ?? '',
          status: artwork?.status ?? ArtworkStatus.DRAFT,
          contractAddress: artwork?.contractAddress,
          splits: [{ address: publicAddress, shareInPercentage: 100 }],
          splitsEnabled: false,
          hasPinataKey: Boolean(pinataApiKey),
        },
      }}
      steps={[
        // form is in the splits info step
        [
          () => formStep === 'splits-info',
          () => (
            <>
              <BackButton onClick={onBackClick} />
              <MintFieldsSplits key="splits" publicAddress={publicAddress} />
            </>
          ),
        ],
        // form is in the basic info step
        [
          () => formStep === 'artwork-info',
          (formikState) => (
            <>
              {/* hook component to watch the form state and update react-query cache */}
              <SyncFormState
                artworkId={artworkId}
                formValues={formikState.values}
              />
              <MintFieldsBasic
                key="basic"
                setFormStep={setFormStep}
                artworkId={artworkId}
                collection={artwork?.collection}
              />
            </>
          ),
        ],
      ]}
    />
  );
}

interface SyncFormStateProps {
  formValues: MintFormValues;
  artworkId: string;
}

// this hook component takes the artwork title from the form and
// syncs it into the artwork card through the react-query cache
function SyncFormState(props: SyncFormStateProps): null {
  const { formValues, artworkId } = props;

  const queryClient = useQueryClient();

  const artworkKey = useArtworkByUuid.getKey({ id: artworkId });

  useEffect(
    () => {
      // update the cache with the new artwork name from the form
      queryClient.setQueryData<ArtworkByUuid>(artworkKey, (cachedArtwork) =>
        assocPath(['artwork', 'name'], formValues.name, cachedArtwork)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formValues.name]
  );

  return null;
}
