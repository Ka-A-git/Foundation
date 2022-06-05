import NextLink from 'next/link';

import Box from 'components/base/Box';
import Card from 'components/base/Card';
import GraySquare from 'components/base/GraySquare';
import Text from 'components/base/Text';
import Flex from 'components/base/Flex';
import EtherscanLink from './EtherscanLink';

import ChevronRight from 'assets/icons/right-chevron.svg';

import useIsWrongNetwork from 'hooks/web3/use-is-wrong-network';

import { formatETHWithSuffix } from 'utils/formatters';

interface ViewBalancesProps {
  publicKey: string;
  ethBalance: number;
  fethBalance: number;
  balancesLoading: boolean;
}

export default function ViewBalances(props: ViewBalancesProps) {
  const { publicKey, ethBalance, fethBalance, balancesLoading } = props;

  const [isWrongNetwork] = useIsWrongNetwork();

  return (
    <>
      <Card
        css={{
          border: '1px solid $black10',
          boxShadow: 'none',
          marginBottom: '$2',
          overflow: 'hidden',
        }}
      >
        <Box
          css={{
            marginX: '$4',
            paddingY: '$3',
            borderBottom: '1px solid $black10',
          }}
        >
          <Flex css={{ alignItems: 'center' }}>
            <Text
              size={0}
              weight="semibold"
              css={{ color: '$black60', marginBottom: '$1' }}
            >
              Balance
            </Text>
            <EtherscanLink publicKey={publicKey} />
          </Flex>
          {balancesLoading ? (
            <GraySquare css={{ height: 24, width: 80 }} />
          ) : (
            <Text size={2} weight="semibold">
              {isWrongNetwork ? '-' : `${formatETHWithSuffix(ethBalance)}`}
            </Text>
          )}
        </Box>
        <NextLink href="/balance" passHref>
          <Flex
            as="a"
            css={{
              paddingX: '$4',
              paddingY: '$3',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'currentColor',
              transition: 'background $1 $ease',
              '& .icon-icon': { color: '$black40' },
              '@hover': {
                '&:hover': {
                  background: '$black5',
                  '& .icon-icon': { color: '$black100' },
                },
              },
            }}
          >
            <Box>
              <Text
                size={0}
                weight="semibold"
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '$black60',
                  marginBottom: '$1',
                }}
              >
                Offer Balance{' '}
              </Text>
              {balancesLoading ? (
                <GraySquare css={{ height: 24, width: 80 }} />
              ) : (
                <>
                  <Text size={2} weight="semibold">
                    {isWrongNetwork
                      ? '-'
                      : `${formatETHWithSuffix(fethBalance)}`}
                  </Text>
                </>
              )}
            </Box>
            <Flex
              className="icon-icon"
              css={{
                marginLeft: 'auto',
                alignItems: 'center',
              }}
            >
              <ChevronRight />
            </Flex>
          </Flex>
        </NextLink>
      </Card>
    </>
  );
}
