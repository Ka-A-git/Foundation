import { HistoryEventProps } from './types';

import { buildEtherscanLink } from 'lib/etherscanAddresses';

import { getTransactionHash } from 'utils/events';

import HistoryEventAmount from 'components/artworks/history/HistoryEventAmount';
import HistoryEventRow from 'components/artworks/history/HistoryEventRow';
import HistoryEventDetails from 'components/artworks/history/HistoryEventDetails';
import HistoryEventAvatars from './HistoryEventAvatars';
import EtherscanIconLink from 'components/links/EtherscanIconLink';
import HistoryInfo from './HistoryInfo';
import HistoryDetails from './HistoryDetails';
import UserTagInline from 'components/users/UserTagInline';

interface HistoryEventTransferredProps extends HistoryEventProps {
  label: string;
}

export default function HistoryEventTransferred(
  props: HistoryEventTransferredProps
): JSX.Element {
  const { historyEvent, userFrom, userTo } = props;

  const transactionHash = getTransactionHash(historyEvent);

  return (
    <HistoryEventRow>
      <HistoryEventAvatars users={[userFrom, userTo]} />

      <HistoryInfo>
        <HistoryDetails>
          <HistoryEventDetails date={historyEvent.blockTimestamp}>
            Transferred from <UserTagInline user={userFrom} disableAvatar /> to
            <UserTagInline
              user={userTo}
              disableAvatar
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
