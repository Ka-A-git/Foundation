/*

  _________________ ___________
  |  ___| ___ \ ___ \  _  | ___ \
  | |__ | |_/ / |_/ / | | | |_/ /
  |  __||    /|    /| | | |    /
  | |___| |\ \| |\ \\ \_/ / |\ \
  \_____\___________|_____\_____|
  /  __ \  _  |  _  \  ___/  ___|
  | /  \/ | | | | | | |__ \ `--.
  | |   | | | | | | |  __| `--. \
  | \__/\ \_/ / |/ /| |___/\__/ /
  \____/\___/|___/ \____/\____/

  A list of the error codes returned from the FND smart
  contracts and which revert reasons they map to.

*/

import { reject } from 'ramda';

export type TransactionErrorAction = 'back-to-profile' | 'retry';

type TransactionStateCopy = Record<
  string,
  {
    msg: string;
    title?: string;
    description?: string;
    action?: TransactionErrorAction;
  }
>;

const transactionErrorCopyRaw: TransactionStateCopy = {
  '0xa2ee8940': { msg: 'FoundationTreasuryNode_Address_Is_Not_A_Contract()' },
  '0xaf8db333': { msg: 'FoundationTreasuryNode_Caller_Not_Admin()' },
  '0x16b5016f': { msg: 'NFTMarketBuyPrice_Cannot_Buy_At_Lower_Price(uint256)' },
  '0xda48e184': { msg: 'NFTMarketBuyPrice_Cannot_Buy_Unset_Price()' },
  '0xc09f8e82': {
    msg: 'NFTMarketBuyPrice_Cannot_Cancel_Unset_Price()',
    title: 'Buy Now price already removed',
    description: 'The Buy Now price for this NFT has already been removed.',
    action: 'back-to-profile',
  },
  '0xf049b41a': {
    msg: 'NFTMarketBuyPrice_Only_Owner_Can_Cancel_Price(address)',
  },
  '0x697d918e': { msg: 'NFTMarketBuyPrice_Only_Owner_Can_Set_Price(address)' },
  '0xb6950f36': { msg: 'NFTMarketBuyPrice_Price_Already_Set()' },
  '0x35ec82cb': { msg: 'NFTMarketBuyPrice_Price_Too_High()' },
  '0x32f3b033': { msg: 'NFTMarketBuyPrice_Seller_Mismatch(address)' },
  '0x8d6d22b6': { msg: 'NFTMarketCore_FETH_Address_Is_Not_A_Contract()' },
  '0x37de3dd9': { msg: 'NFTMarketCore_Only_FETH_Can_Transfer_ETH()' },
  '0x57a016b3': { msg: 'NFTMarketCore_Seller_Not_Found()' },
  '0x415e743e': {
    msg: 'NFTMarketCreators_Address_Does_Not_Support_IRoyaltyRegistry()',
  },
  '0x83a483f5': { msg: 'NFTMarketOffer_Cannot_Be_Made_While_In_Auction()' },
  '0x24237361': { msg: 'NFTMarketOffer_Offer_Below_Min_Amount(uint256)' },
  '0x8c9e57cf': { msg: 'NFTMarketOffer_Offer_Expired(uint256)' },
  '0xa7d95dc3': { msg: 'NFTMarketOffer_Offer_From_Does_Not_Match(address)' },
  '0xe40a30e6': {
    msg: 'NFTMarketOffer_Offer_Must_Be_At_Least_Min_Amount(uint256)',
  },
  '0x47164762': {
    msg: 'NFTMarketOffer_Provided_Contract_And_TokenId_Count_Must_Match()',
  },
  '0xfedbcec6': { msg: 'NFTMarketOffer_Reason_Required()' },
  '0x38079382': { msg: 'NFTMarketPrivateSale_Can_Be_Offered_For_24Hrs_Max()' },
  '0xded83ec0': {
    msg: 'NFTMarketPrivateSale_Proxy_Address_Is_Not_A_Contract()',
  },
  '0x98dbee1b': { msg: 'NFTMarketPrivateSale_Sale_Expired()' },
  '0xd0be1ad3': {
    msg: 'NFTMarketPrivateSale_Signature_Canceled_Or_Already_Claimed()',
  },
  '0x39027716': { msg: 'NFTMarketPrivateSale_Signature_Verification_Failed()' },
  '0xf8c47820': { msg: 'NFTMarketPrivateSale_Too_Much_Value_Provided()' },
  '0x7618a003': { msg: 'NFTMarketReserveAuction_Already_Listed(uint256)' },
  '0xcd698a19': {
    msg: 'NFTMarketReserveAuction_Bid_Must_Be_At_Least_Min_Amount(uint256)',
  },
  '0xfbaca1c1': {
    msg: 'NFTMarketReserveAuction_Cannot_Admin_Cancel_Without_Reason()',
  },
  '0x31e6f71c': {
    msg: 'NFTMarketReserveAuction_Cannot_Bid_Lower_Than_Reserve_Price(uint256)',
  },
  '0x3feeb88d': {
    msg: 'NFTMarketReserveAuction_Cannot_Bid_On_Ended_Auction(uint256)',
  },
  '0x125197d1': {
    msg: 'NFTMarketReserveAuction_Cannot_Bid_On_Nonexistent_Auction()',
  },
  '0xe3a2ab04': {
    msg: 'NFTMarketReserveAuction_Cannot_Cancel_Nonexistent_Auction()',
  },
  '0x4b6ad8fa': {
    msg: 'NFTMarketReserveAuction_Cannot_Finalize_Already_Settled_Auction()',
    title: 'Auction already settled',
    description:
      'This auction has already been settled and the NFT transferred to the new owner’s wallet.',
    action: 'back-to-profile',
  },
  '0x3a017f60': {
    msg: 'NFTMarketReserveAuction_Cannot_Finalize_Auction_In_Progress(uint256)',
  },
  '0xe1405768': {
    msg: 'NFTMarketReserveAuction_Cannot_Rebid_Over_Outstanding_Bid()',
    title: 'Bid already placed',
    description: 'You have already placed a bid on this auction.',
    action: 'back-to-profile',
  },
  '0x5aea7c47': {
    msg: 'NFTMarketReserveAuction_Cannot_Update_Auction_In_Progress()',
  },
  '0xccd285bd': {
    msg: 'NFTMarketReserveAuction_Exceeds_Max_Duration(uint256)',
  },
  '0x9299180e': {
    msg: 'NFTMarketReserveAuction_Less_Than_Extension_Duration(uint256)',
  },
  '0x3a970fe6': {
    msg: 'NFTMarketReserveAuction_Must_Set_Non_Zero_Reserve_Price()',
  },
  '0xe64526ee': { msg: 'NFTMarketReserveAuction_Not_Matching_Seller(address)' },
  '0x9802550c': {
    msg: 'NFTMarketReserveAuction_Only_Owner_Can_Update_Auction(address)',
    title: 'You don’t own this NFT',
    description: 'Only the owner of the NFT can set the reserve price.',
    action: 'back-to-profile',
  },
  '0x4b669ac7': { msg: 'NFTMarketReserveAuction_Price_Already_Set()' },
  '0xe2bbc1e3': { msg: ' NFTMarketReserveAuction_Too_Much_Value_Provided()' },
};

// reject items that have no title
export const transactionErrorCopy = reject(
  (obj) => !obj.title,
  transactionErrorCopyRaw
);

export type TransactionErrorCode = keyof typeof transactionErrorCopy;
