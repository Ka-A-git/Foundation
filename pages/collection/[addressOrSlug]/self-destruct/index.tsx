import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { T } from 'ramda';

import SelfDestructSuccess from 'components/transactions/collection/self-destruct/SelfDestructSuccess';
import SelfDestructFields from 'components/transactions/collection/self-destruct/SelfDestructFields';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import { getCollectionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import useTransactionParams from 'hooks/use-transaction-params';
import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import useSelfDestructCollection from 'hooks/web3/transactions/use-self-destruct-collection';
import useCollectionByContractSlug from 'hooks/queries/hasura/collections/use-collection-by-contract-slug';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';

import { transactionCopy } from 'lib/transaction-copy';

import { SelfDestructCollectionSchema } from 'schemas/collection';
import { SelfDestructFormValues } from 'components/transactions/collection/self-destruct/types';

import { buildUserProfilePath } from 'utils/artwork/artwork';
import { isAllTrue } from 'utils/helpers';

SelfDestructCollection.getLayout = getCollectionLayout(
  'Self-destruct collection'
);

export default function SelfDestructCollection() {
  const [{ txHash }, handleTransaction] = useTransactionEventHandler();

  const { contractSlug } = useTransactionParams();

  const { data: collectionData, isLoading: isCollectionLoading } =
    useCollectionByContractSlug(
      { contractSlug, indexedStates: [true] },
      {
        refetchInterval: (res) => {
          return isAllTrue([res?.contractAddress, txHash]) ? 2500 : 0;
        },
      }
    );

  const contractAddress = collectionData?.contractAddress;

  const isSuccess = isAllTrue([txHash, !isCollectionLoading, !contractAddress]);

  const [{ data: currentUser }] = useAccount();

  const { data: userData } = useUserByPublicKey(
    { publicKey: currentUser?.address },
    { refetchOnWindowFocus: false }
  );

  const profilePath = buildUserProfilePath({ user: userData?.user });

  const {
    mutateAsync: selfDestructCollection,
    reset: resetSelfDestructCollection,
    error: selfDestructCollectionError,
  } = useSelfDestructCollection();

  const handleSubmit = useCallback(
    async (values: SelfDestructFormValues) => {
      const tx = await selfDestructCollection(values);
      await handleTransaction(tx);
    },
    [handleTransaction, selfDestructCollection]
  );

  const copy = transactionCopy['collection-self-destruct'];

  return (
    <TransactionFlow<SelfDestructFormValues>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: false,
        },
        error: {
          error: selfDestructCollectionError,
          description: copy.error.description,
          onReset: resetSelfDestructCollection,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => <SelfDestructSuccess profilePath={profilePath} />,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: SelfDestructCollectionSchema,
        initialValues: {
          contractAddress,
        },
      }}
      steps={[[T, () => <SelfDestructFields />]]}
    />
  );
}
