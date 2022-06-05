import { useAccount } from 'wagmi';

import Text from 'components/base/Text';
import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import { TransactionActionButton } from '../generic/TransactionActionButtons';

import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';

import { buildUserProfilePath } from 'utils/artwork/artwork';
import { formatETHWithSuffix } from 'utils/formatters';
import Box from 'components/base/Box';

interface WithdrawTransactionSuccessProps {
  amount: number;
}

export default function WithdrawTransactionSuccess(
  props: WithdrawTransactionSuccessProps
) {
  const { amount } = props;
  const [{ data: user }] = useAccount();

  const { data: userData } = useUserByPublicKey({ publicKey: user?.address });
  const formattedPrice = formatETHWithSuffix(amount);

  return (
    <TransactionProgressPane
      title="Balance Conversion Complete"
      description={buildSuccessMessage(formattedPrice)}
      status="success"
      meta={
        <TransactionActionButton
          href={buildUserProfilePath({ user: userData?.user })}
          label="View profile"
        />
      }
    />
  );
}

const buildSuccessMessage = (withdrawalPrice: string) => {
  return (
    <Text css={{ maxWidth: 400 }}>
      Offer Balance was successfully converted. The full amount of{' '}
      <Box as="span" css={{ color: '$green100', fontWeight: '$semibold' }}>
        {withdrawalPrice}
      </Box>{' '}
      is now in your wallet.
    </Text>
  );
};
