export enum ComputedArtworkStatus {
  /** The original mint event for the NFT */
  Minted = 'MINT',
  /** The NFT has been listed for sale */
  Listed = 'LIST',

  ListedButNotByMe = 'LISTED_BUT_NOT_BY_ME',

  LiveAuction = 'LIVE_AUCTION',

  Unsettled = 'UNSETTLED',
  /** The sale has been settled on-chain and the NFT was transferred to the new owner */
  Settled = 'SETTLE',
  /** The NFT was transferred from one address to another */
  Transferred = 'TRANSFER',
  /** The NFT was burned and now no longer available on-chain */
  Burned = 'BURN',

  PrivateSale = 'PRIVATE_SALE',

  BuyNowPriceSet = 'BUY_NOW_PRICE_SET',
  BuyNowPriceChange = 'BUY_NOW_PRICE_CHANGE',
  BuyNowPriceCanceled = 'BUY_NOW_PRICE_CANCEL',
  BuyNowPriceAccepted = 'BUY_NOW_PRICE_ACCEPT',
  OfferAccepted = 'OFFER_ACCEPT',
  OfferCreated = 'OFFER_CREATE',
  OfferOutbid = 'OFFER_OUTBID',
  OfferExpired = 'OFFER_EXPIRE',
  OfferCanceled = 'OFFER_CANCEL',
  OfferChanged = 'OFFER_CHANGE',
}

// enums are uppercase in the db
export enum ArtworkStatusInDB {
  Minted = 'MINTED',
}

export enum ArtworkAndOwnerStatus {
  MintedOwner = 'MintedOwner',
  MintedNonOwner = 'MintedNonOwner',
  TransferredOwner = 'TransferredOwner',
  TransferredNonOwner = 'TransferredNonOwner',
  ListedOwner = 'ListedOwner',
  ListedNonOwner = 'ListedNonOwner',
  PriceChangedOwner = 'PriceChangedOwner',
  PriceChangedNonOwner = 'PriceChangedNonOwner',
  UnlistedOwner = 'UnlistedOwner',
  UnlistedNonOwner = 'UnlistedNonOwner',
  InAuctionOwner = 'InAuctionOwner',
  InAuctionNonOwner = 'InAuctionNonOwner',
  SoldOwner = 'SoldOwner',
  SoldNonOwner = 'SoldNonOwner',
  SettledOwner = 'SettledOwner',
  SettledNonOwner = 'SettledNonOwner',
}

export enum ArtworkSortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum ArtworkSortKey {
  Price = 'Price',
  DateMinted = 'Date Minted',
}

export enum ArtworkFilter {
  LiveAuction = 'Live auction',
  ReserveNotMet = 'Reserve not met',
  Sold = 'Sold',
}
