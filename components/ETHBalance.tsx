import Flex from 'components/base/Flex';
import Text from 'components/base/Text';

interface ETHBalanceProps {
  balance: string | number;
  formatter: (arg0: unknown) => string;
}

export default function ETHBalance(props: ETHBalanceProps): JSX.Element {
  const { balance, formatter } = props;

  return (
    <Flex
      css={{
        borderRadius: '$2',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingY: '$4',
        paddingX: '$5',
        backgroundColor: '$black5',
      }}
    >
      <Text weight="semibold" size={0} css={{ color: '$black60' }}>
        Your Balance
      </Text>
      <Text weight="semibold" size={1}>
        {formatter(balance)}
      </Text>
    </Flex>
  );
}
