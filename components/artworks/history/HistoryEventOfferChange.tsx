import { HistoryEventProps } from './types';

import HistoryEventGeneric from 'components/artworks/history/HistoryEventGeneric';

export default function HistoryEventOfferChange(
  props: HistoryEventProps
): JSX.Element {
  const { historyEvent } = props;

  return (
    <HistoryEventGeneric label="Offer changed by" historyEvent={historyEvent} />
  );
}
