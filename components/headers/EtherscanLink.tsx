import { styled } from 'stitches.config';

import Flex from 'components/base/Flex';
import Box from 'components/base/Box';
import Mono from 'components/base/Mono';
import Text from 'components/base/Text';

import { truncateStringCenter } from 'utils/helpers';

import { buildEtherscanLink } from 'lib/etherscanAddresses';

import useIsWrongNetwork from 'hooks/web3/use-is-wrong-network';

interface EtherscanLinkProps {
  publicKey: string;
}

export default function EtherscanLink(props: EtherscanLinkProps): JSX.Element {
  const { publicKey } = props;

  const [isWrongNetwork] = useIsWrongNetwork();

  const etherscanUrl = buildEtherscanLink(`/address/${publicKey}`);

  if (isWrongNetwork) {
    return (
      <Flex
        css={{
          marginLeft: 'auto',
          backgroundColor: '$black5',
          borderRadius: '$2',
          paddingY: '$1',
          paddingX: '$2',
          alignItems: 'center',
        }}
      >
        <Text size={0}>Wrong network</Text>

        <NetworkIndicator wrongNetwork={isWrongNetwork} />
      </Flex>
    );
  }

  return (
    <Flex
      href={etherscanUrl}
      target="_blank"
      rel="noreferrer"
      as="a"
      css={{
        marginLeft: 'auto',
        backgroundColor: '$black5',
        borderRadius: '$2',
        paddingY: '$1',
        paddingX: '$2',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'currentColor',
      }}
    >
      <Mono tight size={0}>
        {truncateStringCenter(4, publicKey)}
      </Mono>

      <NetworkIndicator wrongNetwork={isWrongNetwork} />
    </Flex>
  );
}

const NetworkIndicator = styled(Box, {
  marginLeft: '$2',
  width: 13,
  height: 13,
  backgroundColor: '$green100',
  borderRadius: '$round',
  zIndex: '2',
  variants: {
    wrongNetwork: {
      true: {
        backgroundColor: '$red100',
      },
    },
  },
});
