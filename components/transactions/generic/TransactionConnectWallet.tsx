import TransactionProgressPane from './TransactionProgressPane';
import Button from 'components/base/Button';
import { ButtonGrid } from './TransactionActionButtons';

import useModal from 'hooks/use-modal';

import { ModalKey } from 'types/modal';

// TODO: Move this copy to lib/transactionCopy

export default function TransactionConnectWallet() {
  const { setCurrentModal } = useModal();

  return (
    <TransactionProgressPane
      title="Connect your wallet"
      description="Please connect your wallet to continue with the transaction."
      key="skeleton"
      status="warning"
      meta={
        <ButtonGrid>
          <Button
            onClick={() => setCurrentModal(ModalKey.AUTH_MAIN)}
            hoverable
            size="large"
            shape="round"
            color="black"
            css={{ width: '100%' }}
          >
            Connect wallet
          </Button>
        </ButtonGrid>
      }
    />
  );
}
