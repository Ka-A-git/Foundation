import { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { mergeDeepLeft, T } from 'ramda';
import { useQueryClient } from 'react-query';

import CreateCollectionSuccess from 'components/transactions/collection/CreateCollectionSuccess';
import CreateCollectionFields from 'components/transactions/collection/CreateCollectionFields';

import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import { getCollectionCreateLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import { CreateCollectionSchema } from 'schemas/collection';
import { CreateCollectionFormValues } from 'components/transactions/collection/types';

import useCollectionByContractAddress from 'hooks/queries/hasura/collections/use-collection-by-contract-address';
import usePredictCollectionAddress from 'hooks/web3/transactions/use-predict-collection-address';
import useDeployCollection from 'hooks/web3/transactions/use-deploy-collection';
import useCreateCollectionQuery from 'hooks/queries/use-create-collection';

import { transactionCopy } from 'lib/transaction-copy';
import { getFirstValue, isAllTrue } from 'utils/helpers';
import { maybeUpperCase } from 'utils/case';
import { getRandomInt } from 'utils/numbers';

CreateCollection.getLayout = getCollectionCreateLayout('Create collection');

export default function CreateCollection() {
  const router = useRouter();

  const [{ data: currentUser }] = useAccount();

  const publicAddress = currentUser?.address;

  const contractAddress = getFirstValue(router.query.contractAddress);

  const [contractNonce] = useState(() => getRandomInt(Number.MAX_SAFE_INTEGER));

  usePredictCollectionAddress(
    { nonce: contractNonce, creatorAddress: publicAddress },
    {
      enabled: isAllTrue([!contractAddress, router.isReady]),
      onSuccess: async (contractAddress) => {
        await router.replace({
          pathname: router.pathname,
          query: { ...router.query, contractAddress },
        });
      },
    }
  );

  // If a user gets to the step where they have submitted a tx
  // a tx hash param is added to the url, they can reload the page
  // and it will  take them to the correct part of the flow
  const txHashParam = getFirstValue(router.query.txHash);
  const nameParam = getFirstValue(router.query.name);
  const symbolParam = getFirstValue(router.query.symbol);

  const { data: collectionData } = useCollectionByContractAddress(
    { contractAddress },
    {
      enabled: isAllTrue([txHashParam]),
      refetchInterval: (res) => (res?.contractAddress ? 0 : 2500),
    }
  );

  const isSuccess = Boolean(collectionData?.contractAddress);

  const {
    data: deployCollectionData,
    mutateAsync: deployCollection,
    reset: resetDeployCollection,
    error: deployCollectionError,
  } = useDeployCollection();

  // if we have a txHash from deploying we use
  // that otherwise we use the param value
  const mergedTxHash = deployCollectionData?.hash ?? txHashParam;

  const handleSubmit = useCallback(
    async (values: CreateCollectionFormValues) => {
      const uppercaseSymbol = maybeUpperCase(values.symbol);
      const tx = await deployCollection({
        ...values,
        nonce: contractNonce,
        symbol: uppercaseSymbol,
      });
      await router.push({
        pathname: router.pathname,
        query: {
          contractAddress,
          txHash: tx.hash,
          name: values.name,
          symbol: values.symbol,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contractNonce, contractAddress, router.isReady, deployCollection]
  );

  const copy = transactionCopy['collection-create'];

  return (
    <TransactionFlow<CreateCollectionFormValues>
      txHash={mergedTxHash}
      transactionState={{
        loading: {
          isLoading: false,
        },
        error: {
          error: deployCollectionError,
          description: copy.error.description,
          onReset: resetDeployCollection,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => (
            <>
              <SyncFormState
                values={{ name: nameParam, symbol: symbolParam }}
              />
              <CreateCollectionSuccess collection={collectionData} />
            </>
          ),
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: CreateCollectionSchema,
        initialValues: {
          name: '',
          symbol: '',
        },
      }}
      steps={[
        [
          T,
          (formikState) => (
            <>
              <SyncFormState values={formikState.values} />
              <CreateCollectionFields key="create" />
            </>
          ),
        ],
      ]}
    />
  );
}

interface SyncFormStateProps {
  values: CreateCollectionFormValues;
}

function SyncFormState(props: SyncFormStateProps) {
  const { values } = props;

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData<CreateCollectionFormValues>(
      useCreateCollectionQuery.getKey(),
      (collection) => mergeDeepLeft(values, { ...collection })
    );
  }, [values, queryClient]);

  return null;
}
