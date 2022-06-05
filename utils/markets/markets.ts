import { flip, indexOf, reject, sortWith, isNil, propOr } from 'ramda';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { parseDateToUnix } from 'utils/dates/dates';
import { isAuctionLive } from 'utils/auctions/auctions';
import { getFirstValue, isAnyTrue, maybeToString } from 'utils/helpers';
import { AuctionStatus } from 'types/Auction';
import { BuyNowStatus } from 'types/BuyNow';
import { OfferStatus } from 'types/Offer';

type BuyNowMarket = ArtworkFragmentExtended['buyNows'][0];
type PrivateSaleMarket = ArtworkFragmentExtended['mostRecentPrivateSales'][0];
type OfferMarket = ArtworkFragmentExtended['offers'][0];
type AuctionMarket = ArtworkFragmentExtended['auctions'][0];

export type MarketUser = OfferMarket['userBuyer'];

export type MarketType =
  | 'LIVE_AUCTION'
  | 'LISTED_AUCTION'
  | 'ENDED_AUCTION'
  | 'FINALIZED_AUCTION'
  | 'PRIVATE_SALE'
  | 'BUY_NOW'
  | 'OFFER';

export type Market = {
  id: string;
  marketType: MarketType;
  marketActors: string[];
  marketUsers: MarketUser[];
  marketOwner: string;
  eventDate: string;
  amountInEth: number;
  buyer: string;
  seller: string;
};

export type ArtworkMarkets = Pick<
  ArtworkFragmentExtended,
  'mostRecentPrivateSales' | 'buyNows' | 'offers' | 'auctions'
>;

export const MARKET_PRIORITY: MarketType[] = [
  'LIVE_AUCTION',
  'ENDED_AUCTION',
  'BUY_NOW',
  'LISTED_AUCTION',
  'FINALIZED_AUCTION',
  'OFFER',
  'PRIVATE_SALE',
];

const sortByMarketPriority = (a: Market, b: Market) =>
  indexOf(a.marketType, MARKET_PRIORITY) -
  indexOf(b.marketType, MARKET_PRIORITY);

const sortByMarketDate = (a: Market, b: Market) => {
  return a.eventDate === null
    ? 0
    : parseDateToUnix(b.eventDate) - parseDateToUnix(a.eventDate);
};

export function getLatestMarketFromArtwork(artwork: ArtworkMarkets) {
  const markets = normalizeArtworkMarkets(artwork);
  return getFirstValue(markets);
}

export function getPriorityMarketFromArtwork(artwork: ArtworkMarkets) {
  const markets = normalizeArtworkMarkets(artwork);
  const sortedMarkets = sortWith(
    [sortByMarketPriority, flip(sortByMarketDate)],
    markets
  );
  return getFirstValue(sortedMarkets);
}

export function findMarketByType(
  artwork: ArtworkMarkets,
  marketType: MarketType
) {
  const markets = normalizeArtworkMarkets(artwork);
  return markets.find((market) => market.marketType === marketType);
}

export function getLastSoldForMarket(artwork: ArtworkMarkets) {
  const privateSales = getValueOrEmptyList(
    artwork,
    'mostRecentPrivateSales'
  ).map(createPrivateSaleMarket);

  // get accepted buy nows
  const buyNows = getValueOrEmptyList(artwork, 'buyNows')
    .filter((buyNow) => [BuyNowStatus.Accepted].includes(buyNow.status))
    .map(createBuyNowMarket);

  // get accepted offers
  const offers = getValueOrEmptyList(artwork, 'offers')
    .filter((offer) => [OfferStatus.Accepted].includes(offer.status))
    .map(createOfferMarket);

  // get ended and finalized auctions
  const auctions = getValueOrEmptyList(artwork, 'auctions')
    .filter((auction) =>
      [AuctionStatus.ENDED, AuctionStatus.FINALIZED].includes(auction.status)
    )
    .map(createAuctionMarket);

  const mergedMarkets = [...privateSales, ...buyNows, ...offers, ...auctions];

  const sortedMarkets = mergedMarkets.sort(sortByMarketDate);

  return getFirstValue(sortedMarkets);
}

export function normalizeArtworkMarkets(artwork: ArtworkMarkets) {
  const privateSales = getValueOrEmptyList(
    artwork,
    'mostRecentPrivateSales'
  ).map(createPrivateSaleMarket);

  // get open buy nows
  const buyNows = getValueOrEmptyList(artwork, 'buyNows')
    .filter((buyNow) => [BuyNowStatus.Open].includes(buyNow.status))
    .map(createBuyNowMarket);

  // get highest offers
  const offers = getValueOrEmptyList(artwork, 'offers')
    .filter((offer) => [OfferStatus.Highest].includes(offer.status))
    .map(createOfferMarket);

  // get open and ended auctions
  const auctions = getValueOrEmptyList(artwork, 'auctions')
    .filter((auction) =>
      [AuctionStatus.OPEN, AuctionStatus.ENDED].includes(auction.status)
    )
    .map(createAuctionMarket);

  const mergedMarkets = [...privateSales, ...buyNows, ...offers, ...auctions];

  return mergedMarkets.sort(sortByMarketDate);
}

function createBuyNowMarket(market: BuyNowMarket): Market {
  return {
    id: market.id,
    amountInEth: market.amountInETH,
    marketType: 'BUY_NOW',
    marketActors: rejectNils([market.seller, market.buyer]),
    marketUsers: [],
    marketOwner: market.seller,
    eventDate: market.acceptedAt,
    seller: market.seller,
    buyer: market.buyer,
  };
}

function createPrivateSaleMarket(market: PrivateSaleMarket): Market {
  return {
    id: market.id,
    amountInEth: market.saleAmountInETH,
    marketType: 'PRIVATE_SALE',
    marketActors: rejectNils([market.seller, market.buyer]),
    marketUsers: [],
    marketOwner: market.seller,
    eventDate: market.soldAt,
    seller: market.seller,
    buyer: market.buyer,
  };
}

function createOfferMarket(market: OfferMarket): Market {
  return {
    id: market.id,
    amountInEth: market.amountInETH,
    marketType: 'OFFER',
    marketActors: rejectNils([market.seller, market.buyer]),
    marketUsers: rejectNils([market.userBuyer]),
    marketOwner: market.seller,
    eventDate: market.expiresAt,
    seller: market.seller,
    buyer: market.buyer,
  };
}

function createAuctionMarket(market: AuctionMarket): Market {
  const unixEndDate = parseDateToUnix(market.endsAt);

  const isLive = isAuctionLive(unixEndDate);
  const isEnded = market.status === AuctionStatus.ENDED;
  const isFinalized = market.status === AuctionStatus.FINALIZED;

  return {
    id: market.id,
    amountInEth: isAnyTrue([isEnded, isLive, isFinalized])
      ? market.highestBidAmount
      : market.reservePriceInETH,
    marketType: isEnded
      ? 'ENDED_AUCTION'
      : isFinalized
      ? 'FINALIZED_AUCTION'
      : isLive
      ? 'LIVE_AUCTION'
      : 'LISTED_AUCTION',
    marketActors: rejectNils([market.seller, market.highestBidder]),
    marketUsers: rejectNils([market.highestBidderUser]),
    marketOwner: market.seller,
    eventDate: market.endsAt,
    seller: market.seller,
    buyer: market.highestBidder,
  };
}

const rejectNils = reject(isNil);

export function getValueOrEmptyList<
  T extends ArtworkMarkets,
  U extends keyof T
>(artwork: T, key: U) {
  return propOr<[], T, T[U]>([], maybeToString(key), artwork);
}
