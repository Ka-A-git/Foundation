import { styled } from 'stitches.config';

import { Authorization } from 'utils/artwork/artwork';
import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';
import { isActorInMarket } from './utils';
import { areKeysEqual } from 'utils/users';
import { isAllTrue, isAnyTrue } from 'utils/helpers';
import {
  getLastSoldForMarket,
  getPriorityMarketFromArtwork,
  findMarketByType,
} from 'utils/markets/markets';

import Flex from 'components/base/Flex';
import GraySquare from 'components/base/GraySquare';
import MarketWidgetLiveAuction from './MarketWidgetLiveAuction';
import MarketWidgetOffer from './MarketWidgetOffer';
import MarketWidgetBuyNow from './MarketWidgetBuyNow';
import MarketWidgetAuction from './MarketWidgetAuction';
import MarketWidgetContainer from './MarketWidgetContainer';

import { ArtworkEvent } from 'types/Event';

const getMarketData = (artwork: ArtworkFragmentExtended) => ({
  priorityMarket: getPriorityMarketFromArtwork(artwork),
  lastSoldForMarket: getLastSoldForMarket(artwork),
});
interface MarketWidgetStateProps {
  artwork: ArtworkFragmentExtended;
  currentUserPublicKey: string;
  authorization: Authorization;
  mintEvent: ArtworkEvent;
  isLoading: boolean;
}

export default function MarketWidgetState(props: MarketWidgetStateProps) {
  const { artwork, currentUserPublicKey, authorization, mintEvent, isLoading } =
    props;

  const { priorityMarket, lastSoldForMarket } = getMarketData(artwork);

  const isLiveAuction = priorityMarket?.marketType === 'LIVE_AUCTION';

  const isCurrentUserOwner = areKeysEqual([
    artwork?.ownerPublicKey,
    currentUserPublicKey,
  ]);

  // the "actor" is someone involved with the market (e.g. buyer or seller)
  const isCurrentUserActor = isActorInMarket({
    market: priorityMarket,
    currentUserPublicKey,
    artwork,
  });

  if (isLoading) {
    return (
      <MarketWidgetContainer css={{ height: 160, padding: '$6' }}>
        <Flex css={{ marginBottom: '$4', justifyContent: 'space-between' }}>
          <GraySquare css={{ width: '48%', height: 48, borderRadius: '$2' }} />
          <GraySquare css={{ width: '48%', height: 48, borderRadius: '$2' }} />
        </Flex>
        <GraySquare css={{ width: '100%', height: 48, borderRadius: '$2' }} />
      </MarketWidgetContainer>
    );
  }

  // when in a live auction, short-circuit at the top-level
  if (isLiveAuction) {
    return (
      <MarketWidgetLiveAuction
        isCurrentUserActor={isCurrentUserActor}
        isCurrentUserOwner={isCurrentUserOwner}
        artwork={artwork}
        market={priorityMarket}
        testId="live-auction"
      />
    );
  }

  const buyNowMarket = findMarketByType(artwork, 'BUY_NOW');

  // we are already short-circuiting 'LIVE_AUCTION' above
  const auctionMarket =
    findMarketByType(artwork, 'LISTED_AUCTION') ||
    findMarketByType(artwork, 'ENDED_AUCTION');

  const offerMarket = findMarketByType(artwork, 'OFFER');

  const activeMarkets = [buyNowMarket, auctionMarket].filter(Boolean);
  const isAuctionEnded = auctionMarket?.marketType === 'ENDED_AUCTION';

  // this bit of logic determines whether we show one or more columns
  const hasMultipleColumns = isAnyTrue([
    // if there’s more than 2 markets return true
    activeMarkets.length > 1,
    // otherwise return true if current owner and no ended auction
    isAllTrue([isCurrentUserOwner, !isAuctionEnded]),
  ]);

  // logic to determine if there’s two columns side-by-side
  const activeMarketCount = hasMultipleColumns ? 2 : 1;

  return (
    <MarketWidgetContainer>
      <MarketWidgetInner count={activeMarketCount}>
        <MarketWidgetBuyNow
          authorization={authorization}
          artwork={artwork}
          buyNowMarket={buyNowMarket}
          auctionMarket={auctionMarket}
          isCurrentUserOwner={isCurrentUserOwner}
        />
        <MarketWidgetAuction
          artwork={artwork}
          auctionMarket={auctionMarket}
          offerMarket={offerMarket}
          buyNowMarket={buyNowMarket}
          currentUserPublicKey={currentUserPublicKey}
          isCurrentUserOwner={isCurrentUserOwner}
          authorization={authorization}
        />
      </MarketWidgetInner>
      <MarketWidgetOffer
        testId="offer"
        currentUserPublicKey={currentUserPublicKey}
        isCurrentUserOwner={isCurrentUserOwner}
        offerMarket={offerMarket}
        auctionMarket={auctionMarket}
        // we fall-back to the last sold for when there’s no offer
        lastSoldForMarket={lastSoldForMarket}
        artwork={artwork}
        // this prop is used for styling changes based
        // on other markets showing in the widget
        hasOtherMarkets={isAnyTrue([
          buyNowMarket,
          auctionMarket,
          isCurrentUserOwner,
        ])}
        mintEvent={mintEvent}
      />
    </MarketWidgetContainer>
  );
}

const MarketWidgetInner = styled(Flex, {
  position: 'relative',
  '@bp0-max': {
    flexDirection: 'column',
  },
  variants: {
    count: {
      1: {},
      2: {
        '&:after': {
          content: '',
          position: 'absolute',
          borderBottom: 'solid 2px $black5',
          left: 0,
          right: 0,
          top: '50%',

          '@bp0': {
            top: '$6',
            bottom: '$6',
            left: '50%',
            borderLeft: 'solid 1px $black5',
            borderBottom: 'unset',
            width: 1,
          },
        },
      },
    },
  },
});
