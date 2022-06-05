import React from 'react';
import { useCallback } from 'react';
import { Form } from 'formik';
import { useQueryClient } from 'react-query';
import { useAccount, useProvider } from 'wagmi';

import ModalContainer from 'components/modals/common/ModalContainer';
import ModalContent from 'components/modals/common/ModalContent';
import TransactionHeading from 'components/transactions/TransactionHeading';
import TransactionParagraph from 'components/transactions/TransactionParagraph';
import FormikSubmitButton from 'components/forms/FormikSubmitButton';
import FormikForm from 'components/forms/FormikForm';

import { ModalKey } from 'types/modal';

import useModal from 'hooks/use-modal';
import useHasApproval from 'hooks/web3/use-has-approval';
import useSetApprovalForAll from 'hooks/web3/transactions/use-set-approval-for-all';

import { getNFT721ContractToRead } from 'lib/contracts';
import { getNFTMarketAddress } from 'lib/addresses';

interface ApprovalFormValues {
  contractAddress: string;
}

export default function MarketApprovalModal(): JSX.Element {
  const { modalEntity, resetModal } = useModal();
  const [{ data: user }] = useAccount();
  const provider = useProvider();
  const queryClient = useQueryClient();

  const contractAddress = modalEntity;
  const publicAddress = user?.address;

  const { mutateAsync: sendApproveTransaction } = useSetApprovalForAll();

  const nftContract = getNFT721ContractToRead({
    provider,
    contractAddress,
  });

  const nftMarketAddr = getNFTMarketAddress();

  const handleApproval = useCallback(
    async (values: ApprovalFormValues) => {
      await sendApproveTransaction(values);
      // await the contract event
      await new Promise((resolve) => {
        nftContract.once(
          nftContract.filters.ApprovalForAll(
            publicAddress,
            nftMarketAddr,
            null
          ),
          (val) => resolve(val)
        );
      });
      // set the approval to true in the react-query cache
      queryClient.setQueryData<boolean>(
        useHasApproval.getKey({
          contractAddress: values.contractAddress,
          publicAddress,
        }),
        true
      );
      // a small delay before closing the modal
      setTimeout(resetModal, 1000);
    },
    [
      nftContract,
      nftMarketAddr,
      publicAddress,
      queryClient,
      sendApproveTransaction,
      resetModal,
    ]
  );

  return (
    <ModalContainer modalKey={ModalKey.MARKET_APPROVAL} blockOverlayDismiss>
      <ModalContent>
        <TransactionHeading css={{ textAlign: 'center', marginBottom: '$5' }}>
          Approve the marketplace contract.
        </TransactionHeading>
        <TransactionParagraph css={{ textAlign: 'center', marginBottom: '$7' }}>
          Approval is required each time you interact with a new collection
          contract.
        </TransactionParagraph>
        <FormikForm<ApprovalFormValues>
          initialValues={{ contractAddress }}
          onSubmit={handleApproval}
        >
          <Form>
            <FormikSubmitButton
              submittedLabel="Approved"
              submittingLabel="Approving…"
              label="Approve"
            />
          </Form>
        </FormikForm>
      </ModalContent>
    </ModalContainer>
  );
}
