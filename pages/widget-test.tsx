import { addMinutes } from 'date-fns/fp';
import { assocPath, path } from 'ramda';

import Body from 'components/base/Body';
import Grid from 'components/base/Grid';
import Heading from 'components/base/Heading';
import Box from 'components/base/Box';
import ArtworkCard from 'components/cards/artwork/ArtworkCard';
import MarketWidgetState from 'components/market-widget/MarketWidgetState';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import {
  ARTWORK_ACTIVE_OFFER,
  ARTWORK_MINTED,
  ARTWORK_LISTED_AUCTION_BUY_NOW,
  ARTWORK_LISTED_AUCTION,
  ARTWORK_LISTED_AUCTION_ACCEPTED_BUY_NOW,
  ARTWORK_LISTED_AUCTION_HIGHEST_OFFER,
  ARTWORK_UNSETTLED_NO_ACTIVE_MARKETS,
  ARTWORK_LIVE_AUCTION,
  MINT_EVENT,
  ARTWORK_LISTED_WITH_ACTIVE_OFFER,
  ARTWORK_AUCTION_LAST_SOLD,
} from 'utils/artwork/artwork.fixtures';

export default function WidgetTest() {
  const minsFromNow = addMinutes(10, Date.now());

  const ARTWORK_LIVE_AUCTION_FUTURE = assocPath(
    ['auctions', 0, 'endsAt'],
    minsFromNow.toISOString(),
    ARTWORK_LIVE_AUCTION
  );

  const fourHoursFromNow = addMinutes(240, Date.now());

  const ARTWORK_LISTED_AUCTION_HIGHEST_OFFER_LIVE = assocPath(
    ['offers', 0, 'expiresAt'],
    fourHoursFromNow.toISOString(),
    ARTWORK_LISTED_AUCTION_HIGHEST_OFFER
  );

  return (
    <Body css={{ maxWidth: 1080, paddingY: '$10' }}>
      <Grid css={{ gap: '$10' }}>
        <TestBlock
          title="ARTWORK_MINTED"
          artwork={ARTWORK_MINTED}
          currentUserPublicKey={null}
        />

        <TestBlock
          title="ARTWORK_MINTED_OWNER"
          artwork={ARTWORK_MINTED}
          currentUserPublicKey={ARTWORK_MINTED.ownerPublicKey}
        />

        <TestBlock
          title="ARTWORK_ACTIVE_OFFER"
          artwork={ARTWORK_ACTIVE_OFFER}
          currentUserPublicKey={null}
        />

        <TestBlock
          title="ARTWORK_ACTIVE_OFFER_OWNER"
          artwork={ARTWORK_ACTIVE_OFFER}
          currentUserPublicKey={ARTWORK_ACTIVE_OFFER.ownerPublicKey}
        />

        <TestBlock
          title="ARTWORK_LISTED_AUCTION_BUY_NOW"
          artwork={ARTWORK_LISTED_AUCTION_BUY_NOW}
          currentUserPublicKey={null}
        />

        <TestBlock
          title="ARTWORK_LISTED_AUCTION_BUY_NOW_OWNER"
          artwork={ARTWORK_LISTED_AUCTION_BUY_NOW}
          currentUserPublicKey={ARTWORK_LISTED_AUCTION_BUY_NOW.ownerPublicKey}
        />

        <TestBlock
          title="ARTWORK_LISTED_AUCTION"
          artwork={ARTWORK_LISTED_AUCTION}
          currentUserPublicKey={null}
        />

        <TestBlock
          title="ARTWORK_LISTED_AUCTION_OWNER"
          artwork={ARTWORK_LISTED_AUCTION}
          currentUserPublicKey={ARTWORK_LISTED_AUCTION.ownerPublicKey}
        />

        <TestBlock
          title="ARTWORK_LISTED_AUCTION_ACCEPTED_BUY_NOW"
          artwork={ARTWORK_LISTED_AUCTION_ACCEPTED_BUY_NOW}
          currentUserPublicKey={null}
        />

        <TestBlock
          title="ARTWORK_LISTED_AUCTION_ACCEPTED_BUY_NOW_OWNER"
          artwork={ARTWORK_LISTED_AUCTION_ACCEPTED_BUY_NOW}
          currentUserPublicKey={
            ARTWORK_LISTED_AUCTION_ACCEPTED_BUY_NOW.ownerPublicKey
          }
        />

        <TestBlock
          title="ARTWORK_LISTED_AUCTION_HIGHEST_OFFER"
          artwork={ARTWORK_LISTED_AUCTION_HIGHEST_OFFER}
          currentUserPublicKey={null}
        />

        <TestBlock
          title="ARTWORK_LISTED_AUCTION_HIGHEST_OFFER_LIVE"
          artwork={ARTWORK_LISTED_AUCTION_HIGHEST_OFFER_LIVE}
          currentUserPublicKey={
            ARTWORK_LISTED_AUCTION_HIGHEST_OFFER_LIVE.ownerPublicKey
          }
        />

        <TestBlock
          title="ARTWORK_LISTED_AUCTION_HIGHEST_OFFER_LIVE"
          artwork={ARTWORK_LISTED_AUCTION_HIGHEST_OFFER_LIVE}
          currentUserPublicKey={path(
            ['offers', 0, 'buyer'],
            ARTWORK_LISTED_AUCTION_HIGHEST_OFFER_LIVE
          )}
        />

        <TestBlock
          title="ARTWORK_LIVE_AUCTION"
          artwork={ARTWORK_LIVE_AUCTION_FUTURE}
          currentUserPublicKey={null}
        />

        <TestBlock
          title="ARTWORK_LIVE_AUCTION_OWNER"
          artwork={ARTWORK_LIVE_AUCTION_FUTURE}
          currentUserPublicKey={ARTWORK_LIVE_AUCTION_FUTURE.ownerPublicKey}
        />

        <TestBlock
          title="ARTWORK_LIVE_AUCTION_HIGHEST_BIDDER"
          artwork={ARTWORK_LIVE_AUCTION_FUTURE}
          currentUserPublicKey={path<string>(
            ['auctions', 0, 'highestBidder'],
            ARTWORK_LIVE_AUCTION_FUTURE
          )}
        />

        <TestBlock
          title="ARTWORK_UNSETTLED_NO_ACTIVE_MARKETS_OWNER"
          artwork={ARTWORK_UNSETTLED_NO_ACTIVE_MARKETS}
          currentUserPublicKey={
            ARTWORK_UNSETTLED_NO_ACTIVE_MARKETS.ownerPublicKey
          }
        />

        <TestBlock
          title="ARTWORK_LISTED_WITH_ACTIVE_OFFER_OWNER"
          artwork={ARTWORK_LISTED_WITH_ACTIVE_OFFER}
          currentUserPublicKey={ARTWORK_LISTED_WITH_ACTIVE_OFFER.ownerPublicKey}
        />

        <TestBlock
          title="ARTWORK_AUCTION_LAST_SOLD"
          artwork={ARTWORK_AUCTION_LAST_SOLD}
          currentUserPublicKey={null}
        />
      </Grid>
    </Body>
  );
}

interface TestBlockProps {
  title: string;
  artwork: ArtworkFragmentExtended;
  currentUserPublicKey: string;
}

function TestBlock(props: TestBlockProps) {
  const { title, artwork, currentUserPublicKey } = props;

  return (
    <Grid css={{ gap: '$4' }}>
      <Heading size={1}>{title}</Heading>
      <Grid css={{ gap: '$8', gridTemplateColumns: '340px auto' }}>
        <ArtworkCard
          artwork={artwork}
          creator={artwork.creator}
          currentUserPublicKey={currentUserPublicKey}
        />
        <Box>
          <MarketWidgetState
            artwork={artwork}
            currentUserPublicKey={currentUserPublicKey}
            authorization={null}
            mintEvent={MINT_EVENT}
            isLoading={false}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
