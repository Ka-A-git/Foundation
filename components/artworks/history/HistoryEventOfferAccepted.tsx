import HistoryEventSale from './HistoryEventSale';

import { HistoryEventProps } from './types';

export default function HistoryEventOfferAccepted(
  props: HistoryEventProps
): JSX.Element {
  const { historyEvent, userTo } = props;

  return (
    <HistoryEventSale
      amountInETH={Number(historyEvent.data.amountInETH)}
      historyEvent={historyEvent}
      user={userTo}
      label="Offer by"
      secondLabel="accepted"
    />
  );
}
