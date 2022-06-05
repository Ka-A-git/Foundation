import { HistoryEventProps } from './types';

import HistoryEventGeneric from 'components/artworks/history/HistoryEventGeneric';

export default function HistoryEventBuyNowPriceCancel(
  props: HistoryEventProps
): JSX.Element {
  const { historyEvent } = props;

  return (
    <HistoryEventGeneric
      label="Buy Now price removed by"
      historyEvent={historyEvent}
    />
  );
}
