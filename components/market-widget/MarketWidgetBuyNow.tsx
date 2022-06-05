import { Market } from 'utils/markets/markets';
import { formatETHWithSuffix } from 'utils/formatters';
import { getButtonProps } from './utils';
import { Authorization } from 'utils/artwork/artwork';

import MarketWidgetAction from './MarketWidgetAction';
import MarketWidgetInfo from './MarketWidgetInfo';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

interface MarketWidgetBuyNowProps {
  buyNowMarket: Market;
  auctionMarket: Market;
  isCurrentUserOwner: boolean;
  artwork: ArtworkFragmentExtended;
  authorization: Authorization;
}

export default function MarketWidgetBuyNow(props: MarketWidgetBuyNowProps) {
  const {
    artwork,
    buyNowMarket,
    auctionMarket,
    isCurrentUserOwner,
    authorization,
  } = props;

  const buttonProps = getButtonProps(artwork);

  // if we have a Buy Now market, render out the info
  if (buyNowMarket) {
    return (
      <MarketWidgetInfo
        type="buy-now"
        authorization={authorization}
        artwork={artwork}
        testId="buy-now"
        label="Buy Now"
        value={formatETHWithSuffix(buyNowMarket.amountInEth)}
        button={
          isCurrentUserOwner
            ? buttonProps.changeBuyNowPrice({ buttonType: 'secondary' })
            : buttonProps.buyNow({ buttonType: 'primary' })
        }
      />
    );
  }

  const isEndedAuction = auctionMarket?.marketType === 'ENDED_AUCTION';

  // if it’s an ended auction, don’t render anything
  if (isEndedAuction) {
    return null;
  }

  // otherwise render the owner controls
  if (isCurrentUserOwner) {
    return (
      <MarketWidgetAction
        testId="buy-now"
        title="Buy Now"
        subtitle="Fixed price to buy"
        button={buttonProps.setBuyNowPrice({ buttonType: 'secondary' })}
      />
    );
  }

  // default to returning nothing
  return null;
}
