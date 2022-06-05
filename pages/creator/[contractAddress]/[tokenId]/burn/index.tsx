import { useCallback } from 'react';
import { T } from 'ramda';
import { useAccount } from 'wagmi';

import BurnFields from 'components/transactions/burn/BurnFields';
import BurnSuccess from 'components/transactions/burn/BurnSuccess';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';
import { getNonModeratedTransactionLayout } from 'components/transactions/generic/TransactionLayoutHOC';

import { BurnSchema } from 'schemas/burn';

import useTransactionEventHandler from 'hooks/web3/transactions/use-transaction-event-handler';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import useBurn, { BurnVariables } from 'hooks/web3/transactions/use-burn';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';

import { transactionCopy } from 'lib/transaction-copy';

BurnPage.getLayout = getNonModeratedTransactionLayout('Burn NFT');

export default function BurnPage() {
  const [{ txHash, isSuccess }, handleTransaction] =
    useTransactionEventHandler();

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByContractTokenIdFromRouter({
      refetchOnWindowFocus: false,
    });

  const [{ data: currentUser }] = useAccount();

  const { mutateAsync: burn, reset: resetBurn, error: burnError } = useBurn();

  const { data: userData } = useUserByPublicKey(
    { publicKey: currentUser?.address },
    { refetchOnWindowFocus: false }
  );

  const handleSubmit = useCallback(
    async (values: BurnVariables) => {
      const tx = await burn(values);
      await handleTransaction(tx);
    },
    [handleTransaction, burn]
  );

  const copy = transactionCopy['burn'];

  return (
    <TransactionFlow<BurnVariables>
      txHash={txHash}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: burnError,
          description: copy.error.description,
          onReset: resetBurn,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        success: {
          isSuccess,
          component: () => <BurnSuccess creator={userData?.user} />,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: BurnSchema,
        initialValues: {
          tokenId: artwork?.tokenId,
          contractAddress: artwork?.contractAddress,
        },
      }}
      steps={[[T, () => <BurnFields />]]}
    />
  );
}
