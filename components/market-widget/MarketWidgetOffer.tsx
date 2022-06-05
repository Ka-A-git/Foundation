import { getButtonProps, isActorInMarket } from './utils';
import { formatETHWithSuffix } from 'utils/formatters';

import { Market } from 'utils/markets/markets';

import MarketWidgetOfferInfo from './MarketWidgetOfferInfo';

import { TestId } from './types';
import { ArtworkEvent } from 'types/Event';
import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';
import { timeAgoInWords } from 'utils/dates/dates';

interface MarketWidgetOfferProps {
  lastSoldForMarket: Market;
  testId: TestId;
  offerMarket: Market;
  auctionMarket: Market;
  currentUserPublicKey: string;
  isCurrentUserOwner: boolean;
  artwork: ArtworkFragmentExtended;
  hasOtherMarkets: boolean;
  mintEvent: ArtworkEvent;
}

export default function MarketWidgetOffer(props: MarketWidgetOfferProps) {
  const {
    offerMarket,
    auctionMarket,
    artwork,
    currentUserPublicKey,
    isCurrentUserOwner,
    lastSoldForMarket,
    testId,
    hasOtherMarkets,
    mintEvent,
  } = props;

  const isCurrentUserActor = isActorInMarket({
    market: offerMarket,
    currentUserPublicKey,
    artwork,
  });

  const mintEventInWords = timeAgoInWords(mintEvent?.blockTimestamp, 'long');
  const buttonProps = getButtonProps(artwork);

  const makeOfferButtonProps = buttonProps.makeOffer(
    // if there is other markets, we don’t want
    // this to be a primary (black) button
    { buttonType: hasOtherMarkets ? 'secondary' : 'primary' }
  );

  const isAuctionEnded = auctionMarket?.marketType === 'ENDED_AUCTION';

  // offer is open, current user is owner
  if (offerMarket) {
    return (
      <MarketWidgetOfferInfo
        testId={testId}
        label="Active Offer"
        value={formatETHWithSuffix(offerMarket.amountInEth)}
        button={
          // when current user owns the artwork, show accept offer button
          isCurrentUserOwner
            ? buttonProps.acceptOffer({
                buttonType: isAuctionEnded ? 'secondary' : 'primary',
              })
            : // when user is market actor, show highest offer button
            isCurrentUserActor
            ? buttonProps.highestOffer({ buttonType: 'success' })
            : // otherwise show make offer button
              makeOfferButtonProps
        }
        hasOtherMarkets={hasOtherMarkets}
        offerMarket={offerMarket}
      />
    );
  }
  // if the current user is the owner, render nothing
  if (isCurrentUserOwner) {
    return null;
  }

  if (lastSoldForMarket) {
    return (
      <MarketWidgetOfferInfo
        testId={testId}
        label="Last sold"
        value={formatETHWithSuffix(lastSoldForMarket.amountInEth)}
        button={makeOfferButtonProps}
        hasOtherMarkets={hasOtherMarkets}
        offerMarket={null}
      />
    );
  }

  // otherwise render the make offer button
  return (
    <MarketWidgetOfferInfo
      testId={testId}
      label={`Minted ${mintEventInWords}`}
      // pass empty value here
      value=""
      button={makeOfferButtonProps}
      hasOtherMarkets={hasOtherMarkets}
      offerMarket={null}
    />
  );
}
