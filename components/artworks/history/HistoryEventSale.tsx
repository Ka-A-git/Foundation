import EtherscanIconLink from 'components/links/EtherscanIconLink';
import HistoryEventAvatar from 'components/artworks/history/HistoryEventAvatar';
import Flex from 'components/base/Flex';
import Grid from 'components/base/Grid';
import Text from 'components/base/Text';
import UserTagInline from 'components/users/UserTagInline';
import ETHinUSD from 'components/ETHinUSD';
import Box from 'components/base/Box';
import HistoryEventDate from './HistoryEventDate';

import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';
import { ArtworkEvent } from 'types/Event';

import { notEmptyOrNil } from 'utils/helpers';
import { formatETHWithSuffix } from 'utils/formatters';
import { getTransactionHash } from 'utils/events';

import { buildEtherscanLink } from 'lib/etherscanAddresses';

interface HistoryEventSaleProps {
  historyEvent: ArtworkEvent;
  label: string;
  amountInETH: number;
  user: UserFragment;
  secondLabel?: string;
}

export default function HistoryEventSale(
  props: HistoryEventSaleProps
): JSX.Element {
  const { historyEvent, label, amountInETH, user, secondLabel } = props;

  const transactionHash = getTransactionHash(historyEvent);
  const settleEvent = notEmptyOrNil(historyEvent.settleUser);

  return (
    <Flex
      center
      expandVertical
      css={{
        textAlign: 'center',
        paddingTop: '$6',
        paddingBottom: '$7',
        zIndex: 10,
        position: 'relative',
      }}
    >
      <HistoryEventAvatar
        user={user}
        css={{
          marginBottom: '$3',
        }}
      />
      <Grid
        css={{
          gridGap: '$1',
          paddingBottom: '$6',
        }}
      >
        <Flex center>
          <Text size={{ '@initial': 1, '@bp1': 2 }} weight="semibold">
            {label}
          </Text>
          <UserTagInline
            disableAvatar
            user={user}
            css={{
              paddingLeft: '$1',
              fontSize: '$1',
              '@bp1': { fontSize: '$2' },
            }}
          />
          {secondLabel && (
            <Text
              size={{ '@initial': 1, '@bp1': 2 }}
              weight="semibold"
              css={{
                paddingLeft: '$1',
              }}
            >
              {secondLabel}
            </Text>
          )}
        </Flex>
        <Text size={{ '@initial': 2, '@bp1': 3 }} weight="semibold">
          Sold for {formatETHWithSuffix(amountInETH)}{' '}
          <Box as="span" css={{ color: '$black60' }}>
            <ETHinUSD amount={amountInETH} />
          </Box>
          {transactionHash && !settleEvent && (
            <EtherscanIconLink
              href={buildEtherscanLink(`/tx/${transactionHash}`)}
            />
          )}
        </Text>
        <HistoryEventDate date={historyEvent.blockTimestamp} />
      </Grid>
      {settleEvent && (
        <Flex
          css={{
            alignItems: 'center',
            marginX: 'auto',
            background: '$white100',
            color: '$black100',
            boxShadow: '$0',
            borderRadius: '$round',
            paddingY: '$2',
            paddingX: '$4',
          }}
        >
          <Text weight="semibold">Auction settled by</Text>
          <UserTagInline
            disableAvatar
            user={historyEvent.settleUser}
            css={{
              paddingLeft: '$1',
            }}
          />
          {transactionHash && (
            <EtherscanIconLink
              href={buildEtherscanLink(`/tx/${transactionHash}`)}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
}
