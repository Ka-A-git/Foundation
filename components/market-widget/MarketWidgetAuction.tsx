import { Market } from 'utils/markets/markets';
import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { formatETHWithSuffix } from 'utils/formatters';
import { getButtonProps, isActorInMarket } from './utils';

import MarketWidgetAction from './MarketWidgetAction';
import MarketWidgetInfo from './MarketWidgetInfo';
import { Authorization } from 'utils/artwork/artwork';

interface MarketWidgetAuctionProps {
  auctionMarket: Market;
  buyNowMarket: Market;
  offerMarket: Market;
  artwork: ArtworkFragmentExtended;
  authorization: Authorization;
  currentUserPublicKey: string;
  isCurrentUserOwner: boolean;
}

export default function MarketWidgetAuction(props: MarketWidgetAuctionProps) {
  const {
    artwork,
    auctionMarket,
    buyNowMarket,
    offerMarket,
    authorization,
    currentUserPublicKey,
    isCurrentUserOwner,
  } = props;

  const buttonProps = getButtonProps(artwork);

  const isActorInOffer = isActorInMarket({
    currentUserPublicKey,
    market: offerMarket,
    artwork,
  });

  // make the button a secondary style when the current user
  // has a highest offer or there’s a Buy Now market
  const auctionButtonType =
    buyNowMarket || isActorInOffer ? 'secondary' : 'primary';

  // if there’s an auction, render the info
  if (auctionMarket) {
    return (
      <MarketWidgetInfo
        type="auction"
        authorization={authorization}
        artwork={artwork}
        testId="auction"
        hidePopover={auctionMarket.marketType === 'ENDED_AUCTION'}
        label={
          auctionMarket.marketType === 'ENDED_AUCTION'
            ? 'Winning bid'
            : 'Reserve'
        }
        value={formatETHWithSuffix(auctionMarket.amountInEth)}
        button={
          // when the auction is ended, render settle button
          auctionMarket.marketType === 'ENDED_AUCTION'
            ? buttonProps.settleAuction({ buttonType: 'primary' })
            : // is user is owner, show change price option
            isCurrentUserOwner
            ? buttonProps.changeListPrice({ buttonType: 'secondary' })
            : // otherwise render the place bid button
              buttonProps.placeBid({
                buttonType: auctionButtonType,
              })
        }
      />
    );
  }

  if (isCurrentUserOwner) {
    return (
      <MarketWidgetAction
        testId="auction"
        title="Auction"
        subtitle="24 hr with reserve price"
        button={buttonProps.listAuction({ buttonType: 'secondary' })}
      />
    );
  }

  return null;
}
