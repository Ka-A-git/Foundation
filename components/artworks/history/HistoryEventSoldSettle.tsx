import HistoryEventSale from './HistoryEventSale';

import { HistoryEventProps } from './types';

export default function HistoryEventSoldSettle(
  props: HistoryEventProps
): JSX.Element {
  const { historyEvent } = props;

  return (
    <HistoryEventSale
      amountInETH={Number(historyEvent.data.amountInETH)}
      historyEvent={historyEvent}
      user={historyEvent.user}
      label="Auction won by"
    />
  );
}
