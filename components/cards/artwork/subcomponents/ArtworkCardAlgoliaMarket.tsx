import ArtworkMetaGeneric, {
  ArtworkMetaLiveAuction,
  ArtworkCardMetaEndedAuction,
} from './meta/ArtworkCardMetaGeneric';

import useCountdown from 'hooks/use-countdown';

import {
  AlgoliaArtwork,
  AlgoliaArtworkAvailability,
  AlgoliaArtworkMarketAvailability,
  AlgoliaAuctionStatus,
} from 'types/Algolia';
import { OfferFragment } from 'graphql/hasura/hasura-fragments.generated';

import { formatETHWithSuffix } from 'utils/formatters';
import { parseAlgoliaTimestamp } from 'utils/dates/dates';
import { isAllTrue, isNumber, notEmptyOrNil } from 'utils/helpers';
import { areKeysEqual } from 'utils/users';
import { MarketAvailability } from 'hooks/queries/algolia/use-algolia-artworks';

interface ArtworkCardAlgoliaMarketProps {
  auction: AlgoliaArtwork['auction'];
  artwork: AlgoliaArtwork;
  owner: AlgoliaArtwork['owner'];
  marketAvailability: MarketAvailability;
}

export default function ArtworkCardAlgoliaMarket(
  props: ArtworkCardAlgoliaMarketProps
): JSX.Element {
  const { auction, artwork, owner, marketAvailability } = props;

  const endsAt = parseUnixToIso(auction?.endsAt);

  const timestamp = parseAlgoliaTimestamp(auction?.endsAt);

  const { hasEnded } = useCountdown(timestamp);

  const isCreatorOwner = areKeysEqual([
    owner?.publicKey,
    artwork?.creator?.publicKey,
  ]);

  const activeOffer = getActiveOffer(artwork);

  // available market types (minus HAS_ACTIVE_OFFER)
  const availableMarketTypes: MarketAvailability[] = [
    'HAS_ACTIVE_BUY_NOW',
    'LIVE_AUCTION',
    'RESERVE_NOT_MET',
  ];
  const hasMarketAvailability =
    availableMarketTypes.includes(marketAvailability);

  if (
    (!hasMarketAvailability &&
      artwork.availability === AlgoliaArtworkAvailability.LIVE_AUCTION) ||
    marketAvailability === 'LIVE_AUCTION'
  ) {
    return (
      <ArtworkMetaLiveAuction
        label="Current bid"
        value={formatETHWithSuffix(auction?.currentPrice)}
        endsAt={endsAt}
      />
    );
  }

  if (
    (!hasMarketAvailability &&
      artwork.marketAvailability?.includes(
        AlgoliaArtworkMarketAvailability.HAS_ACTIVE_BUY_NOW
      )) ||
    marketAvailability === 'HAS_ACTIVE_BUY_NOW'
  ) {
    return (
      <ArtworkMetaGeneric
        label="Buy Now"
        owner={owner}
        value={formatETHWithSuffix(artwork?.latestBuyNow?.amountInETH)}
        isCreatorOwner={isCreatorOwner}
        activeOffer={activeOffer}
      />
    );
  }

  if (
    (!hasMarketAvailability && auction?.status === AlgoliaAuctionStatus.OPEN) ||
    marketAvailability === 'RESERVE_NOT_MET'
  ) {
    return (
      <ArtworkMetaGeneric
        label="Reserve"
        owner={owner}
        value={formatETHWithSuffix(auction?.currentPrice)}
        isCreatorOwner={isCreatorOwner}
        activeOffer={activeOffer}
      />
    );
  }

  if (auction?.status === AlgoliaAuctionStatus.ENDED) {
    return (
      <ArtworkCardMetaEndedAuction
        label="Winning bid"
        owner={owner}
        value={formatETHWithSuffix(auction?.currentPrice)}
        isCreatorOwner={isCreatorOwner}
        activeOffer={activeOffer}
      />
    );
  }

  const hasLastSoldPrice = isAllTrue([
    isAllTrue([hasEnded, auction?.status === AlgoliaAuctionStatus.FINALIZED]),
    // avoid rendering 0 ETH price
    isNumber(auction?.currentPrice),
  ]);

  if (hasLastSoldPrice) {
    return (
      <ArtworkMetaGeneric
        label="Last sold"
        owner={owner}
        value={formatETHWithSuffix(auction?.currentPrice)}
        isCreatorOwner={isCreatorOwner}
        activeOffer={activeOffer}
        isSecondary
      />
    );
  }

  return owner || activeOffer ? (
    <ArtworkMetaGeneric
      owner={owner}
      activeOffer={activeOffer}
      isCreatorOwner={isCreatorOwner}
    />
  ) : null;
}

// algolia dates are formatted as unix epoch (numbers)
// the artwork card supports dates in iso string format
function getActiveOffer(
  artwork: AlgoliaArtwork
): Pick<OfferFragment, 'expiresAt' | 'amountInETH'> {
  const latestOffer = artwork?.latestOffer;

  return latestOffer?.status === 'HIGHEST'
    ? {
        ...latestOffer,
        // therefore we need to convert them into iso strings
        expiresAt: parseUnixToIso(latestOffer.expiresAt),
      }
    : undefined;
}

const parseUnixToIso = <T extends string | number>(date: T) => {
  return notEmptyOrNil(date)
    ? new Date(Number(date) * 1000).toISOString()
    : null;
};
