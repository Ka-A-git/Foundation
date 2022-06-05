import { cond, curry, pathEq, T } from 'ramda';

import { HistoryEventProps } from './types';

import HistoryEventMinted from 'components/artworks/history/HistoryEventMinted';
import HistoryEventListed from 'components/artworks/history/HistoryEventListed';
import HistoryEventBid from 'components/artworks/history/HistoryEventBid';
import HistoryEventSoldSettle from 'components/artworks/history/HistoryEventSoldSettle';
import HistoryEventTransferred from 'components/artworks/history/HistoryEventTransferred';
import HistoryEventReserveChanged from 'components/artworks/history/HistoryEventReserveChanged';
import HistoryEventUnlisted from 'components/artworks/history/HistoryEventUnlisted';
import HistoryEventPrivateSale from 'components/artworks/history/HistoryEventPrivateSale';
import HistoryEventBuyNowPriceSet from './HistoryEventBuyNowPriceSet';
import HistoryEventBuyNowPriceChange from './HistoryEventBuyNowPriceChange';
import HistoryEventBuyNowPriceCancel from './HistoryEventBuyNowPriceCancel';
import HistoryEventBuyNowPriceAccepted from './HistoryEventBuyNowPriceAccepted';
import HistoryEventOfferChange from './HistoryEventOfferChange';
import HistoryEventOfferOutbid from './HistoryEventOfferOutbid';
import HistoryEventOfferCreated from './HistoryEventOfferCreated';
import HistoryEventOfferAccepted from './HistoryEventOfferAccepted';

import { EventType } from 'types/Event';

const eventStatusEq = curry(
  (event: EventType, historyItem: HistoryEventProps) =>
    pathEq(['historyEvent', 'eventType'], event, historyItem)
);

// the history events we want to render and to which components
const renderHistoryItem = cond<HistoryEventProps, JSX.Element>([
  [(props) => eventStatusEq(EventType.Minted, props), HistoryEventMinted],
  [(props) => eventStatusEq(EventType.Listed, props), HistoryEventListed],
  [(props) => eventStatusEq(EventType.Bid, props), HistoryEventBid],
  // Bundles sold and settled event
  [(props) => eventStatusEq(EventType.Sold, props), HistoryEventSoldSettle],
  [
    (props) => eventStatusEq(EventType.PrivateSale, props),
    HistoryEventPrivateSale,
  ],
  [
    (props) => eventStatusEq(EventType.Transferred, props),
    HistoryEventTransferred,
  ],
  [
    (props) => eventStatusEq(EventType.PriceChanged, props),
    HistoryEventReserveChanged,
  ],
  [(props) => eventStatusEq(EventType.Unlisted, props), HistoryEventUnlisted],
  [
    (props) => eventStatusEq(EventType.BuyNowPriceSet, props),
    HistoryEventBuyNowPriceSet,
  ],
  [
    (props) => eventStatusEq(EventType.BuyNowPriceChanged, props),
    HistoryEventBuyNowPriceChange,
  ],
  [
    (props) => eventStatusEq(EventType.BuyNowPriceCanceled, props),
    HistoryEventBuyNowPriceCancel,
  ],
  [
    (props) => eventStatusEq(EventType.BuyNowPriceAccepted, props),
    HistoryEventBuyNowPriceAccepted,
  ],
  [
    (props) => eventStatusEq(EventType.OfferAccepted, props),
    HistoryEventOfferAccepted,
  ],
  [
    (props) => eventStatusEq(EventType.OfferCreated, props),
    HistoryEventOfferCreated,
  ],
  [
    (props) => eventStatusEq(EventType.OfferChanged, props),
    HistoryEventOfferChange,
  ],
  [
    (props) => eventStatusEq(EventType.OfferOutbid, props),
    HistoryEventOfferOutbid,
  ],
  [T, () => null],
]);

export default function ProvenanceEvent(props: HistoryEventProps): JSX.Element {
  return renderHistoryItem(props);
}
