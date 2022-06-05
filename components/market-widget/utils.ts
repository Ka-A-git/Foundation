import { propOr, reject, isNil, curry } from 'ramda';

import { ActionButton } from 'components/transactions/generic/TransactionActionButtons';

import { Market } from 'utils/markets/markets';
import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import {
  buildArtworkListPath,
  buildArtworkPath,
  buildArtworkTokenPath,
} from 'utils/artwork/artwork';
import { buildBidPath } from 'utils/bids/bids';

type ButtonType = 'primary' | 'secondary' | 'success' | 'disabled';

const getButtonVariants = (
  buttonType: ButtonType
): ActionButton['variants'] => {
  if (buttonType === 'primary') {
    return { color: 'black' };
  }
  if (buttonType === 'secondary') {
    return { color: 'white' };
  }
  if (buttonType === 'success') {
    return { color: 'green' };
  }
  if (buttonType === 'disabled') {
    return { color: 'gray' };
  }
};

interface GetButtonPropsArgs {
  buttonType: ButtonType;
}

interface GetButtonPropsWithLabelArgs extends GetButtonPropsArgs {
  label?: string;
}

// TODO: use named arguments for these link
// builder functions to make things clear
export const getButtonProps = curry((artwork: ArtworkFragmentExtended) => {
  return {
    listAuction: ({ buttonType }: GetButtonPropsArgs): ActionButton => ({
      href: buildArtworkListPath(artwork),
      label: 'List',
      variants: getButtonVariants(buttonType),
    }),
    changeListPrice: ({ buttonType }: GetButtonPropsArgs): ActionButton => {
      const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
      return {
        href: `${artworkPath}/change-price`,
        label: 'Change reserve',
        variants: getButtonVariants(buttonType),
      };
    },
    settleAuction: ({ buttonType }: GetButtonPropsArgs): ActionButton => {
      const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
      return {
        href: `${artworkPath}/settle`,
        label: 'Settle auction',
        variants: getButtonVariants(buttonType),
      };
    },
    buyNow: ({ buttonType }: GetButtonPropsArgs): ActionButton => {
      const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
      return {
        href: `${artworkPath}/buy-now`,
        label: 'Buy now',
        variants: getButtonVariants(buttonType),
      };
    },
    setBuyNowPrice: ({ buttonType }: GetButtonPropsArgs): ActionButton => ({
      href: `/create/${buildArtworkTokenPath(artwork)}/buy-now`,
      label: 'Set price',
      variants: getButtonVariants(buttonType),
    }),
    changeBuyNowPrice: ({ buttonType }: GetButtonPropsArgs): ActionButton => ({
      href: `/create/${buildArtworkTokenPath(artwork)}/buy-now`,
      label: 'Change price',
      variants: getButtonVariants(buttonType),
    }),
    makeOffer: ({ buttonType }: GetButtonPropsArgs): ActionButton => {
      const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
      return {
        href: `${artworkPath}/offer`,
        label: 'Make offer',
        variants: getButtonVariants(buttonType),
      };
    },
    highestOffer: ({ buttonType }: GetButtonPropsArgs): ActionButton => {
      const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
      return {
        href: `${artworkPath}/offer`,
        label: 'Highest Offer',
        variants: getButtonVariants(buttonType),
        css: { pointerEvents: 'none' },
      };
    },
    acceptOffer: ({ buttonType }: GetButtonPropsArgs): ActionButton => {
      const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
      return {
        href: `${artworkPath}/offer/accept`,
        label: 'Accept offer',
        variants: getButtonVariants(buttonType),
      };
    },
    placeBid: ({
      buttonType,
      label = 'Place bid',
    }: GetButtonPropsWithLabelArgs): ActionButton => ({
      href: buildBidPath({ creator: artwork.creator, artwork }),
      label,
      variants: getButtonVariants(buttonType),
    }),
  };
});

interface ActorInMarketArgs {
  market: Market;
  currentUserPublicKey: string;
  artwork: ArtworkFragmentExtended;
}

export function isActorInMarket(args: ActorInMarketArgs) {
  const { market, currentUserPublicKey, artwork } = args;

  const priorityMarketActors = propOr<[], Market, string[]>(
    [],
    'marketActors',
    market
  );

  const marketActors = reject(isNil, [
    ...priorityMarketActors,
    artwork?.ownerPublicKey,
  ]);

  const isCurrentUserActor = marketActors.includes(currentUserPublicKey);

  return isCurrentUserActor;
}
