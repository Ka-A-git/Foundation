import NextLink from 'next/link';

import Flex from 'components/base/Flex';
import Box from 'components/base/Box';
import Text from 'components/base/Text';
import GraySquare from 'components/base/GraySquare';
import TransactionParagraph from '../TransactionParagraph';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionHeading from '../TransactionHeading';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';
import { LearnMoreArticleLink } from './WithdrawInfo';

import { SetBuyNowPriceVariables } from 'hooks/web3/transactions/use-set-buy-now-price';

import LockIcon from 'assets/icons/lock-icon.svg';

import { formatETHWithSuffix } from 'utils/formatters';
import Tooltip from 'components/Tooltip';
import Link from 'components/base/Link';

interface WithdrawFieldsProps {
  fethBalance: number;
  isBalancesLoading: boolean;
  lockedFethBalance: number;
  offersCount: number;
}

export default function WithdrawFields(props: WithdrawFieldsProps) {
  const { fethBalance, isBalancesLoading, lockedFethBalance, offersCount } =
    props;

  return (
    <TransitionPane>
      <TransactionCard>
        <TransactionHeading css={{ marginBottom: '$6' }}>
          Offer Balance
        </TransactionHeading>

        <Box
          css={{
            border: '1px solid $black10',
            borderRadius: '$3',
            marginBottom: '$6',
            paddingX: '$6',
            paddingTop: '$6',
            paddingBottom: '$4',
          }}
        >
          <Text weight="semibold" css={{ color: '$black60' }}>
            Offer Balance
          </Text>
          <Text weight="semibold" size={4}>
            {isBalancesLoading ? (
              <GraySquare css={{ height: 38, marginTop: '$2', width: 150 }} />
            ) : (
              formatETHWithSuffix(fethBalance)
            )}
          </Text>
          {lockedFethBalance > 0 && (
            <Flex
              css={{
                borderTop: '1px solid $black10',
                marginTop: '$5',
                paddingTop: '$5',
              }}
            >
              <NextLink href="/activity" passHref>
                <Link
                  css={{
                    display: 'flex',
                    textDecoration: 'none',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    weight="semibold"
                    css={{
                      color: '$black60',
                      transition: 'color $2 $ease',
                      '@hover': {
                        '&:hover': {
                          color: '$black100',
                        },
                      },
                    }}
                  >
                    Active Offers
                  </Text>
                  <Box
                    css={{
                      display: 'inline-block',
                      backgroundColor: '$black10',
                      borderRadius: '$round',
                      paddingX: '$2',
                      paddingY: '$1',
                      height: 26,
                      minWidth: 26,
                      fontSize: '$0',
                      marginLeft: '$2',
                      color: '$black80',
                      textAlign: 'center',
                      fontWeight: '$semibold',
                    }}
                  >
                    {offersCount}
                  </Box>
                </Link>
              </NextLink>
              <Flex
                css={{
                  marginLeft: 'auto',
                  fontWeight: '$semibold',
                  alignItems: 'center',
                }}
              >
                {isBalancesLoading ? (
                  <GraySquare css={{ height: 20, width: 60 }} />
                ) : (
                  formatETHWithSuffix(lockedFethBalance)
                )}
                <Tooltip
                  content="Unlocks after 24hrs"
                  animation="shift-away"
                  hideOnClick={false}
                >
                  <Flex
                    css={{
                      marginLeft: '$2',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '$black10',
                      borderRadius: '$round',
                      width: 24,
                      height: 24,
                      color: '$black100',
                      cursor: 'pointer',
                    }}
                  >
                    <LockIcon width={14} />
                  </Flex>
                </Tooltip>
              </Flex>
            </Flex>
          )}
        </Box>

        <TransactionParagraph css={{ marginBottom: '$6' }}>
          When your Offer expires or a higher Offer is made, you are
          auto-refunded to your Offer Balance. Once you have funds available,
          you can make another Offer or convert your balance to ETH at any time.
        </TransactionParagraph>

        <LearnMoreArticleLink />
        {fethBalance > 0 && (
          <Flex css={{ marginTop: '$7', flexShrink: 0, gap: '$4' }}>
            <TransactionSubmitButton<SetBuyNowPriceVariables>
              label="Convert"
              submittingLabel="Converting…"
              submittedLabel="Converted"
            />
          </Flex>
        )}
      </TransactionCard>
    </TransitionPane>
  );
}
