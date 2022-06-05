import { useFormikContext } from 'formik';
import { ReactNode } from 'react';
import { cond, equals } from 'ramda';
import { useAccount, useNetwork } from 'wagmi';

import FormikSubmitButton, {
  FormikSubmitButtonProps,
} from 'components/forms/FormikSubmitButton';
import DisabledButton from 'components/forms/transactions/DisabledButton';
import Button from 'components/base/Button';

import { getFormikErrorMessage } from 'utils/formik';

import { ModalKey } from 'types/modal';

import useModal from 'hooks/use-modal';

import getChainId from 'lib/chainId';

type TransactionSubmitButtonProps = FormikSubmitButtonProps & {
  showErrors?: boolean;
};

export default function TransactionSubmitButton<T>(
  props: TransactionSubmitButtonProps
) {
  const { label, submittedLabel, submittingLabel, showErrors = true } = props;

  const [{ data: network }] = useNetwork();
  const [{ data: user }] = useAccount();

  const { errors } = useFormikContext<T>();

  const { setCurrentModal } = useModal();

  // get the first error message (if it exists)
  const error = getFormikErrorMessage(errors);

  const isCorrectNetwork = network?.chain?.id === getChainId();

  if (!user) {
    return (
      <ConnectWalletButton
        handleClick={() => setCurrentModal(ModalKey.AUTH_MAIN)}
      >
        Connect wallet to continue
      </ConnectWalletButton>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <DisabledButton>Connect to {getNetworkName(getChainId())}</DisabledButton>
    );
  }

  if (error && showErrors) {
    return <DisabledButton>{error}</DisabledButton>;
  }

  return (
    <FormikSubmitButton
      disabled={Boolean(error)}
      label={label}
      submittingLabel={submittingLabel}
      submittedLabel={submittedLabel}
    />
  );
}

interface ConnectWalletButtonProps {
  handleClick: () => void;
  children: ReactNode;
}

function ConnectWalletButton(props: ConnectWalletButtonProps) {
  const { handleClick, children } = props;
  return (
    <Button
      color="black"
      size="large"
      shape="regular"
      type="button"
      css={{ width: '100%' }}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

const getNetworkName = cond<number, string>([
  [equals(1), () => 'Ethereum mainnet'],
  [equals(3), () => 'Ropsten testnet'],
  [equals(4), () => 'Rinkeby testnet'],
  [equals(5), () => 'Goerli testnet'],
]);
