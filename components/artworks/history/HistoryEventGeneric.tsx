import { HistoryEventProps } from './types';

import { buildEtherscanLink } from 'lib/etherscanAddresses';

import HistoryEventAmount from 'components/artworks/history/HistoryEventAmount';
import HistoryEventRow from 'components/artworks/history/HistoryEventRow';
import HistoryEventAvatar from 'components/artworks/history/HistoryEventAvatar';
import HistoryEventDetails from 'components/artworks/history/HistoryEventDetails';
import EtherscanIconLink from 'components/links/EtherscanIconLink';
import HistoryInfo from './HistoryInfo';
import HistoryDetails from './HistoryDetails';
import UserTagInline from 'components/users/UserTagInline';

import { getTransactionHash } from 'utils/events';

interface HistoryEventGenericProps extends Omit<HistoryEventProps, 'users'> {
  label: string;
}

export default function HistoryEventGeneric(
  props: Pick<HistoryEventGenericProps, 'historyEvent' | 'label'>
): JSX.Element {
  const { historyEvent, label } = props;

  const transactionHash = getTransactionHash(historyEvent);

  return (
    <HistoryEventRow>
      <HistoryEventAvatar user={historyEvent.user} />
      <HistoryInfo>
        <HistoryDetails>
          <HistoryEventDetails date={historyEvent.blockTimestamp}>
            {label}
            <UserTagInline
              user={historyEvent.user}
              disableAvatar
              size={{ '@initial': 0, '@bp0': 1 }}
              css={{ marginLeft: 2 }}
            />
          </HistoryEventDetails>
        </HistoryDetails>
        {historyEvent.data.amountInETH && (
          <HistoryEventAmount amountInETH={historyEvent.data.amountInETH} />
        )}
      </HistoryInfo>
      {transactionHash && (
        <EtherscanIconLink
          href={buildEtherscanLink(`/tx/${transactionHash}`)}
        />
      )}
    </HistoryEventRow>
  );
}
