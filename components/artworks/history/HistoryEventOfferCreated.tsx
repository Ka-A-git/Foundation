import { HistoryEventProps } from './types';

import HistoryEventGeneric from 'components/artworks/history/HistoryEventGeneric';

export default function HistoryEventOfferCreated(
  props: HistoryEventProps
): JSX.Element {
  const { historyEvent } = props;

  return (
    <HistoryEventGeneric label="Offer made by" historyEvent={historyEvent} />
  );
}
