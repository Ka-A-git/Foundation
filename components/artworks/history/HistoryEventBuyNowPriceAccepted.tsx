import { HistoryEventProps } from './types';

import HistoryEventSale from './HistoryEventSale';

export default function HistoryEventBuyNowPriceAccepted(
  props: HistoryEventProps
): JSX.Element {
  const { historyEvent, userFrom } = props;

  const amountInETH =
    historyEvent.data.creatorFee +
    historyEvent.data.f8nFee +
    historyEvent.data.ownerRev;

  return (
    <HistoryEventSale
      amountInETH={amountInETH}
      historyEvent={historyEvent}
      user={userFrom}
      label="Bought by"
    />
  );
}
