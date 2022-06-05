export type TransactionType =
  | 'burn'
  | 'transfer'
  | 'offer-accept'
  | 'offer-place'
  | 'auction-change-reserve'
  | 'auction-cancel'
  | 'auction-finalize'
  | 'buy-now-remove'
  | 'buy-now-set'
  | 'buy-now-accept'
  | 'list-auction'
  | 'collection-create'
  | 'collection-self-destruct'
  | 'bid-place'
  | 'mint'
  | 'add-tags';

type TransactionCopy = {
  description: string;
  title: string;
};

export type TransactionStateCopy = {
  error: Pick<TransactionCopy, 'description'>;
  pending: TransactionCopy;
};

// TODO: Add more copy to this page - success, prior to signing the tx in your wallet, etc.

export const transactionCopy: Record<TransactionType, TransactionStateCopy> = {
  'offer-accept': {
    error: {
      description: 'There was an error with accepting the Offer for the NFT.',
    },
    pending: {
      title: 'Accepting the Offer…',
      description:
        "The Offer is being accepted on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  'offer-place': {
    error: {
      description: 'There was an error with making an Offer on the NFT.',
    },
    pending: {
      title: 'Making the Offer…',
      description:
        "Your Offer is being confirmed on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  'auction-change-reserve': {
    error: {
      description: 'There was an error with changing the price of the NFT.',
    },
    pending: {
      title: 'Changing the reserve price…',
      description:
        "The reserve price is being changed on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  'auction-cancel': {
    error: {
      description: 'There was an error with unlisting your NFT.',
    },
    pending: {
      title: 'Unlisting…',
      description:
        "The NFT is being unlisted on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  'auction-finalize': {
    error: {
      description: 'There was an error with settling the auction.',
    },
    pending: {
      title: 'Settling…',
      description:
        "This auction is being settled on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  burn: {
    error: {
      description: 'There was an error with burning your NFT.',
    },
    pending: {
      title: 'Burning…',
      description:
        "The NFT being burned on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  transfer: {
    error: {
      description: 'There was an error with transferring the NFT.',
    },
    pending: {
      title: 'Transferring…',
      description:
        "The NFT is being transferred on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  'buy-now-remove': {
    error: {
      description:
        'There was an error with removing the Buy Now price on your NFT.',
    },
    pending: {
      title: 'Removing Buy Now price…',
      description:
        "The Buy Now price is being removed on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  'buy-now-set': {
    error: {
      description:
        'There was an error with setting a Buy Now price on the NFT.',
    },
    pending: {
      title: 'Setting Buy Now price…',
      description:
        "The Buy Now price is being set on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  'buy-now-accept': {
    error: {
      description: 'There was an error with buying the NFT.',
    },
    pending: {
      title: 'Buying…',
      description:
        "The sale is being confirmed on the Ethereum blockchain. You can leave this page if you'd like.",
    },
  },
  'list-auction': {
    error: {
      description: 'There was an error while trying to list your NFT.',
    },
    pending: {
      title: 'Your NFT is being listed…',
      description:
        'The reserve price is being set on the Ethereum blockchain. You can leave this page if you’d like.',
    },
  },
  'collection-create': {
    error: {
      description:
        'There was an error while trying to deploy the smart contract.',
    },
    pending: {
      title: 'Your smart contract is being created…',
      description:
        'The smart contract is being deployed to the Ethereum mainnet.',
    },
  },
  'collection-self-destruct': {
    error: {
      description:
        'There was an error while trying to self destruct the collection.',
    },
    pending: {
      title: 'This collection is self-destructing…',
      description:
        'Your transaction has been submitted, and the collection will self-destruct shortly. You’re free to leave this page if you like.',
    },
  },
  'bid-place': {
    error: {
      description: 'There was an error while trying to bid on this NFT.',
    },
    pending: {
      title: 'Your bid has been submitted…',
      description:
        'Your bid is being confirmed on the Ethereum blockchain. You’re free to leave this page if you like.',
    },
  },
  mint: {
    error: {
      description: 'There was an error while trying to mint this NFT.',
    },
    pending: {
      title: 'Your NFT is being minted…',
      description:
        'Your artwork is being minted as an NFT on the Ethereum blockchain. You can leave this page if you’d like.',
    },
  },
  'add-tags': {
    error: {
      description: 'There was an error while trying to add tags to this NFT.',
    },
    pending: {
      title: 'Saving tags',
      description: 'The tags for this NFT are being saved…',
    },
  },
};
