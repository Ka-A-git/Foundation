import * as Types from './types-hasura.generated';

export type ArtworkFragment = (
  Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
  & { privateSales: Array<(
    Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
    & { price: Types.Private_Sale['saleAmountInETH'] }
  )> }
);

export type CollectionFragment = Pick<Types.Collection, 'collectionImageUrl' | 'contractAddress' | 'slug' | 'coverImageUrl' | 'createdAt' | 'creatorAddress' | 'description' | 'id' | 'name' | 'symbol' | 'updatedAt' | 'contractType' | 'moderationStatus' | 'hiddenAt' | 'deletedAt'>;

export type UserFragment = Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>;

export type InviteFragment = Pick<Types.Invite_Code, 'senderPublicKey' | 'redeemerPublicKey' | 'redeemedAt'>;

export type FollowFragment = Pick<Types.Follow, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'followedUser' | 'isFollowing'>;

export type SocialVerificationFragment = Pick<Types.Social_Verification, 'id' | 'user' | 'createdAt' | 'updatedAt' | 'expiresAt' | 'lastCheckedAt' | 'socialVerificationURL' | 'verificationText' | 'userId' | 'username' | 'isValid' | 'service' | 'failedReason' | 'status'>;

export type AuctionFragment = (
  Pick<Types.Auction, 'auctionId' | 'canceledAt' | 'createdAt' | 'endsAt' | 'finalizedAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'isPrimarySale' | 'reservePriceInETH' | 'seller' | 'startsAt' | 'status' | 'tokenId' | 'updatedAt'>
  & { highestBidderUser?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'>> }
);

export type BidFragment = Pick<Types.Bid, 'auctionId' | 'bidAmount' | 'bidder' | 'contractAddress' | 'createdAt' | 'datePlaced' | 'id' | 'seller' | 'status' | 'tokenId' | 'updatedAt'>;

export type LatestArtworkEventFragment = { latestEvents: Array<Pick<Types.Event, 'id' | 'eventType' | 'data'>> };

export type ArtworkEventFragment = Pick<Types.Event, 'id' | 'eventType' | 'data' | 'blockTimestamp' | 'publicKey' | 'tokenId' | 'tokenCreator'>;

export type SplitRecipientFragment = Pick<Types.Split_Recipient, 'contractAddress' | 'createdAt' | 'id' | 'indexOfShare' | 'publicKey' | 'sharePercent' | 'updatedAt'>;

export type ArtworkSplitRecipientsFragment = { splitRecipients: { aggregate?: Types.Maybe<Pick<Types.Split_Recipient_Aggregate_Fields, 'count'>> } };

export type MostRecentPrivateSaleFragment = { mostRecentPrivateSales: Array<Pick<Types.Private_Sale, 'id' | 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'saleAmountInETH' | 'seller' | 'buyer'>> };

export type MostRecentBuyNowFragment = { buyNows: Array<Pick<Types.Buy_Now, 'id' | 'status' | 'amountInETH' | 'acceptedAt' | 'seller' | 'buyer'>> };

export type MostRecentOfferFragment = { offers: Array<(
    Pick<Types.Offer, 'id' | 'status' | 'amountInETH' | 'acceptedAt' | 'expiresAt' | 'seller' | 'buyer'>
    & { userBuyer: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'> }
  )> };

export type MostRecentAuctionFragment = { auctions: Array<(
    Pick<Types.Auction, 'auctionId' | 'canceledAt' | 'createdAt' | 'endsAt' | 'finalizedAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'isPrimarySale' | 'reservePriceInETH' | 'seller' | 'startsAt' | 'status' | 'tokenId' | 'updatedAt'>
    & { highestBidderUser?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'>> }
  )> };

export type ArtworkFragmentExtended = (
  Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
  & { owner?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'symbol' | 'contractAddress' | 'slug' | 'name' | 'collectionImageUrl' | 'coverImageUrl' | 'contractType' | 'moderationStatus'>>, privateSales: Array<(
    Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
    & { price: Types.Private_Sale['saleAmountInETH'] }
  )>, latestEvents: Array<Pick<Types.Event, 'id' | 'eventType' | 'data'>>, splitRecipients: { aggregate?: Types.Maybe<Pick<Types.Split_Recipient_Aggregate_Fields, 'count'>> }, auctions: Array<(
    Pick<Types.Auction, 'auctionId' | 'canceledAt' | 'createdAt' | 'endsAt' | 'finalizedAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'isPrimarySale' | 'reservePriceInETH' | 'seller' | 'startsAt' | 'status' | 'tokenId' | 'updatedAt'>
    & { highestBidderUser?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'>> }
  )>, offers: Array<(
    Pick<Types.Offer, 'id' | 'status' | 'amountInETH' | 'acceptedAt' | 'expiresAt' | 'seller' | 'buyer'>
    & { userBuyer: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'> }
  )>, buyNows: Array<Pick<Types.Buy_Now, 'id' | 'status' | 'amountInETH' | 'acceptedAt' | 'seller' | 'buyer'>>, mostRecentPrivateSales: Array<Pick<Types.Private_Sale, 'id' | 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'saleAmountInETH' | 'seller' | 'buyer'>> }
);

export type PrivateSaleFragment = (
  Pick<Types.Private_Sale, 'deadlineAt' | 'ipfsPath' | 'soldAt'>
  & { price: Types.Private_Sale['saleAmountInETH'] }
  & { buyer: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>, seller: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>, artwork: (
    Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
    & { creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'slug'>>, privateSales: Array<(
      Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
      & { price: Types.Private_Sale['saleAmountInETH'] }
    )> }
  ) }
);

export type CollectionFragmentExtended = (
  Pick<Types.Collection, 'collectionImageUrl' | 'contractAddress' | 'slug' | 'coverImageUrl' | 'createdAt' | 'creatorAddress' | 'description' | 'id' | 'name' | 'symbol' | 'updatedAt' | 'contractType' | 'moderationStatus' | 'hiddenAt' | 'deletedAt'>
  & { creator: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'> }
);

export type ActivityBidFragment = (
  Pick<Types.Bid, 'auctionId' | 'bidAmount' | 'bidder' | 'contractAddress' | 'createdAt' | 'datePlaced' | 'id' | 'seller' | 'status' | 'tokenId' | 'updatedAt'>
  & { auction: (
    Pick<Types.Auction, 'auctionId' | 'canceledAt' | 'createdAt' | 'endsAt' | 'finalizedAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'isPrimarySale' | 'reservePriceInETH' | 'seller' | 'startsAt' | 'status' | 'tokenId' | 'updatedAt'>
    & { highestBidderUser?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name'>> }
  ), artwork?: Types.Maybe<(
    Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
    & { creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'collectionImageUrl' | 'coverImageUrl' | 'slug'>>, privateSales: Array<(
      Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
      & { price: Types.Private_Sale['saleAmountInETH'] }
    )> }
  )> }
);

export type UserProfileFragment = (
  Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>
  & { acceptedInvite?: Types.Maybe<Pick<Types.Invite_Code, 'senderPublicKey' | 'redeemerPublicKey' | 'redeemedAt'>>, twitSocialVerifs: Array<Pick<Types.Social_Verification, 'id' | 'user' | 'createdAt' | 'updatedAt' | 'expiresAt' | 'lastCheckedAt' | 'socialVerificationURL' | 'verificationText' | 'userId' | 'username' | 'isValid' | 'service' | 'failedReason' | 'status'>>, instaSocialVerifs: Array<Pick<Types.Social_Verification, 'id' | 'user' | 'createdAt' | 'updatedAt' | 'expiresAt' | 'lastCheckedAt' | 'socialVerificationURL' | 'verificationText' | 'userId' | 'username' | 'isValid' | 'service' | 'failedReason' | 'status'>>, followerCount: { aggregate?: Types.Maybe<Pick<Types.Follow_Aggregate_Fields, 'count'>> }, followingCount: { aggregate?: Types.Maybe<Pick<Types.Follow_Aggregate_Fields, 'count'>> } }
);

export type OfferFragment = (
  Pick<Types.Offer, 'amountInETH' | 'status' | 'expiresAt'>
  & { buyer: Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>, artwork?: Types.Maybe<(
    Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'width' | 'height' | 'duration' | 'mimeType' | 'mintTxHash' | 'assetId' | 'assetStatus' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus' | 'moderationFrom' | 'latestTxDate' | 'assetVersion' | 'ownerPublicKey' | 'publicKey' | 'tags' | 'contractAddress' | 'activeSalePriceInETH' | 'lastSalePriceInETH' | 'isIndexed'>
    & { creator?: Types.Maybe<Pick<Types.User, 'userIndex' | 'publicKey' | 'username' | 'profileImageUrl' | 'coverImageUrl' | 'name' | 'bio' | 'isApprovedCreator' | 'moderationStatus' | 'joinedWaitlistAt' | 'createdAt' | 'isApprovedForMigrationAt' | 'isAdmin' | 'links'>>, collection?: Types.Maybe<Pick<Types.Collection, 'collectionImageUrl' | 'coverImageUrl' | 'slug'>>, privateSales: Array<(
      Pick<Types.Private_Sale, 'ipfsPath' | 'deadlineAt' | 'soldAt' | 'buyer' | 'seller'>
      & { price: Types.Private_Sale['saleAmountInETH'] }
    )> }
  )> }
);

export const FollowFragment = /*#__PURE__*/ `
    fragment FollowFragment on follow {
  id
  createdAt
  updatedAt
  user
  followedUser
  isFollowing
}
    `;
export const ArtworkEventFragment = /*#__PURE__*/ `
    fragment ArtworkEventFragment on event {
  id
  eventType
  data
  blockTimestamp
  publicKey
  data
  tokenId
  tokenCreator
}
    `;
export const SplitRecipientFragment = /*#__PURE__*/ `
    fragment SplitRecipientFragment on split_recipient {
  contractAddress
  createdAt
  id
  indexOfShare
  publicKey
  sharePercent
  updatedAt
}
    `;
export const ArtworkFragment = /*#__PURE__*/ `
    fragment ArtworkFragment on artwork {
  id
  name
  description
  assetScheme
  assetHost
  assetPath
  assetIPFSPath
  metadataScheme
  metadataHost
  metadataPath
  metadataIPFSPath
  width
  height
  duration
  mimeType
  mintTxHash
  assetId
  assetStatus
  mintTxHash
  tokenId
  status
  hiddenAt
  deletedAt
  moderationStatus
  moderationFrom
  latestTxDate
  assetVersion
  ownerPublicKey
  publicKey
  tags
  contractAddress
  activeSalePriceInETH
  lastSalePriceInETH
  isIndexed
  privateSales {
    ipfsPath
    deadlineAt
    soldAt
    price: saleAmountInETH
    buyer
    seller
  }
}
    `;
export const LatestArtworkEventFragment = /*#__PURE__*/ `
    fragment LatestArtworkEventFragment on artwork {
  latestEvents: event(
    where: {eventType: {_nin: ["MIGRATE_CREATOR", "MIGRATE_CREATOR_PAYMENT_ADDRESS", "MIGRATE_OWNER", "MIGRATE_SELLER", "SELL", "PRICE_CHANGE"]}}
    limit: 1
    order_by: {blockTimestamp: desc_nulls_last}
  ) {
    id
    eventType
    data
  }
}
    `;
export const ArtworkSplitRecipientsFragment = /*#__PURE__*/ `
    fragment ArtworkSplitRecipientsFragment on artwork {
  splitRecipients: splitRecipients_aggregate {
    aggregate {
      count
    }
  }
}
    `;
export const MostRecentAuctionFragment = /*#__PURE__*/ `
    fragment MostRecentAuctionFragment on artwork {
  auctions(
    where: {status: {_in: ["OPEN", "FINALIZED", "ENDED"]}}
    order_by: {endsAt: desc_nulls_first}
    limit: 5
  ) {
    auctionId
    canceledAt
    createdAt
    endsAt
    finalizedAt
    highestBidAmount
    highestBidder
    id
    isPrimarySale
    reservePriceInETH
    seller
    startsAt
    status
    tokenId
    updatedAt
    highestBidderUser {
      userIndex
      publicKey
      username
      profileImageUrl
      coverImageUrl
      name
    }
  }
}
    `;
export const MostRecentOfferFragment = /*#__PURE__*/ `
    fragment MostRecentOfferFragment on artwork {
  offers(
    where: {status: {_in: ["ACCEPTED", "HIGHEST"]}}
    order_by: {placedAt: desc}
    limit: 5
  ) {
    id
    status
    amountInETH
    acceptedAt
    expiresAt
    seller
    buyer
    userBuyer {
      userIndex
      publicKey
      username
      profileImageUrl
      coverImageUrl
      name
    }
  }
}
    `;
export const MostRecentBuyNowFragment = /*#__PURE__*/ `
    fragment MostRecentBuyNowFragment on artwork {
  buyNows(
    where: {status: {_in: ["ACCEPTED", "OPEN"]}}
    order_by: {createdAt: desc}
    limit: 5
  ) {
    id
    status
    amountInETH
    acceptedAt
    seller
    buyer
  }
}
    `;
export const MostRecentPrivateSaleFragment = /*#__PURE__*/ `
    fragment MostRecentPrivateSaleFragment on artwork {
  mostRecentPrivateSales: privateSales(
    where: {soldAt: {_is_null: false}}
    limit: 1
  ) {
    id
    ipfsPath
    deadlineAt
    soldAt
    saleAmountInETH
    seller
    buyer
  }
}
    `;
export const UserFragment = /*#__PURE__*/ `
    fragment UserFragment on user {
  userIndex
  publicKey
  username
  profileImageUrl
  coverImageUrl
  name
  bio
  isApprovedCreator
  moderationStatus
  joinedWaitlistAt
  createdAt
  isApprovedForMigrationAt
  isAdmin
  links
}
    `;
export const ArtworkFragmentExtended = /*#__PURE__*/ `
    fragment ArtworkFragmentExtended on artwork {
  ...ArtworkFragment
  ...LatestArtworkEventFragment
  ...ArtworkSplitRecipientsFragment
  ...MostRecentAuctionFragment
  ...MostRecentOfferFragment
  ...MostRecentBuyNowFragment
  ...MostRecentPrivateSaleFragment
  owner {
    ...UserFragment
  }
  creator: user {
    ...UserFragment
  }
  collection {
    symbol
    contractAddress
    slug
    name
    collectionImageUrl
    coverImageUrl
    contractType
    moderationStatus
  }
}
    ${ArtworkFragment}
${LatestArtworkEventFragment}
${ArtworkSplitRecipientsFragment}
${MostRecentAuctionFragment}
${MostRecentOfferFragment}
${MostRecentBuyNowFragment}
${MostRecentPrivateSaleFragment}
${UserFragment}`;
export const PrivateSaleFragment = /*#__PURE__*/ `
    fragment PrivateSaleFragment on private_sale {
  deadlineAt
  ipfsPath
  price: saleAmountInETH
  soldAt
  buyer: userBuyer {
    ...UserFragment
  }
  seller: userSeller {
    ...UserFragment
  }
  artwork: artworkForSale {
    ...ArtworkFragment
    creator: user {
      ...UserFragment
    }
    collection {
      slug
    }
  }
}
    ${UserFragment}
${ArtworkFragment}`;
export const CollectionFragment = /*#__PURE__*/ `
    fragment CollectionFragment on collection {
  collectionImageUrl
  contractAddress
  slug
  coverImageUrl
  createdAt
  creatorAddress
  description
  id
  name
  symbol
  updatedAt
  contractType
  moderationStatus
  hiddenAt
  deletedAt
}
    `;
export const CollectionFragmentExtended = /*#__PURE__*/ `
    fragment CollectionFragmentExtended on collection {
  ...CollectionFragment
  creator: user {
    ...UserFragment
  }
}
    ${CollectionFragment}
${UserFragment}`;
export const BidFragment = /*#__PURE__*/ `
    fragment BidFragment on bid {
  auctionId
  bidAmount
  bidder
  contractAddress
  createdAt
  datePlaced
  id
  seller
  status
  tokenId
  updatedAt
}
    `;
export const AuctionFragment = /*#__PURE__*/ `
    fragment AuctionFragment on auction {
  auctionId
  canceledAt
  createdAt
  endsAt
  finalizedAt
  highestBidAmount
  highestBidder
  id
  isPrimarySale
  reservePriceInETH
  seller
  startsAt
  status
  tokenId
  updatedAt
  highestBidderUser {
    userIndex
    publicKey
    username
    profileImageUrl
    coverImageUrl
    name
  }
}
    `;
export const ActivityBidFragment = /*#__PURE__*/ `
    fragment ActivityBidFragment on bid {
  ...BidFragment
  auction {
    ...AuctionFragment
  }
  artwork {
    ...ArtworkFragment
    creator: user {
      ...UserFragment
    }
    collection {
      collectionImageUrl
      coverImageUrl
      slug
    }
  }
}
    ${BidFragment}
${AuctionFragment}
${ArtworkFragment}
${UserFragment}`;
export const InviteFragment = /*#__PURE__*/ `
    fragment InviteFragment on invite_code {
  senderPublicKey
  redeemerPublicKey
  redeemedAt
}
    `;
export const SocialVerificationFragment = /*#__PURE__*/ `
    fragment SocialVerificationFragment on social_verification {
  id
  user
  createdAt
  updatedAt
  expiresAt
  lastCheckedAt
  socialVerificationURL
  verificationText
  userId
  username
  isValid
  service
  failedReason
  status
}
    `;
export const UserProfileFragment = /*#__PURE__*/ `
    fragment UserProfileFragment on user {
  ...UserFragment
  acceptedInvite {
    ...InviteFragment
  }
  twitSocialVerifs: socialVerifications(
    where: {isValid: {_eq: true}, service: {_eq: "TWITTER"}}
    limit: 1
  ) {
    ...SocialVerificationFragment
  }
  instaSocialVerifs: socialVerifications(
    where: {isValid: {_eq: true}, service: {_eq: "INSTAGRAM"}}
    limit: 1
  ) {
    ...SocialVerificationFragment
  }
  followerCount: follows_aggregate(where: {isFollowing: {_eq: true}}) {
    aggregate {
      count
    }
  }
  followingCount: following_aggregate(where: {isFollowing: {_eq: true}}) {
    aggregate {
      count
    }
  }
}
    ${UserFragment}
${InviteFragment}
${SocialVerificationFragment}`;
export const OfferFragment = /*#__PURE__*/ `
    fragment OfferFragment on offer {
  amountInETH
  status
  expiresAt
  buyer: userBuyer {
    ...UserFragment
  }
  artwork {
    ...ArtworkFragment
    creator: user {
      ...UserFragment
    }
    collection {
      collectionImageUrl
      coverImageUrl
      slug
    }
  }
}
    ${UserFragment}
${ArtworkFragment}`;