import { length } from 'ramda';

import Grid from 'components/base/Grid';

import BidActivityCard from 'components/bids/BidActivityCard';

import BidActivityCardReceived from './BidActivityCardReceived';
import ActivityEmptyState from 'components/activity/ActivityEmptyState';
import OfferActivityCard from 'components/transactions/offer/OfferActivityCard';
import OfferReceivedCard from 'components/transactions/offer/OfferReceivedCard';

import { OfferFragment } from 'graphql/hasura/hasura-fragments.generated';

import { UserBids } from 'graphql/hasura/queries/user-bids.generated';

interface PrimaryBidsTableProps {
  bids: UserBids['bidsReceived'];
}

export function PrimaryBidsTable(props: PrimaryBidsTableProps): JSX.Element {
  const { bids } = props;

  if (length(bids) === 0) {
    return (
      <ActivityEmptyState
        title="Bids you’ve placed will be shown here"
        description="When you place a bid on an artwork, it will show up here."
      />
    );
  }

  return (
    <Grid css={{ gap: '$7', marginBottom: '$10' }}>
      {bids.map((bid, key) => {
        return (
          <BidActivityCard
            key={key}
            bid={bid}
            auction={bid.auction}
            artwork={bid.artwork}
          />
        );
      })}
    </Grid>
  );
}

interface SecondaryBidsTableProps {
  bids: UserBids['bidsReceived'];
}

export function SecondaryBidsTable(
  props: SecondaryBidsTableProps
): JSX.Element {
  const { bids } = props;

  if (length(bids) === 0) {
    return (
      <ActivityEmptyState
        title="Bids you’ve received will be shown here"
        description="When you receive a bid on an artwork, it will show up here."
      />
    );
  }

  return (
    <Grid css={{ gap: '$7', marginBottom: '$10' }}>
      {bids.map((bid, key) => (
        <BidActivityCardReceived
          key={key}
          bid={bid}
          auction={bid.auction}
          artwork={bid.artwork}
        />
      ))}
    </Grid>
  );
}

interface OffersTableProps {
  offers: OfferFragment[];
  type: 'sent' | 'received';
}

export function OffersTable(props: OffersTableProps): JSX.Element {
  const { offers, type } = props;

  const noOffers = length(offers) === 0;

  if (noOffers) {
    return (
      <ActivityEmptyState
        title="No active offers"
        description={
          type === 'received'
            ? `When you recieve an Offer for an NFT, it will show up here.`
            : `When you make an Offer for an NFT, it will show up here.`
        }
      />
    );
  }

  if (type === 'received') {
    return (
      <Grid css={{ gap: '$7', marginBottom: '$10' }}>
        {offers.map((offer) => (
          <OfferReceivedCard
            key={`${offer.artwork.contractAddress}-${offer.artwork.tokenId}`}
            offer={offer}
            artwork={offer.artwork}
          />
        ))}
      </Grid>
    );
  }

  return (
    <Grid css={{ gap: '$7', marginBottom: '$10' }}>
      {offers.map((offer) => (
        <OfferActivityCard
          key={`${offer.artwork.contractAddress}-${offer.artwork.tokenId}`}
          offer={offer}
          artwork={offer.artwork}
        />
      ))}
    </Grid>
  );
}
