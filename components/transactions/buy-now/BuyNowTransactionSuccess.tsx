import Text from 'components/base/Text';
import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import TransactionActionButtons, {
  ButtonGrid,
  TransactionActionButton,
} from '../generic/TransactionActionButtons';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { buildCollectionPath, isFNDContractAddress } from 'utils/collections';
import { buildArtworkPath, buildUserProfilePath } from 'utils/artwork/artwork';
import { formatETHWithSuffix } from 'utils/formatters';

import { BuyNowMode } from './types';

interface BuyNowTransactionSuccessProps {
  artwork: ArtworkFragmentExtended;
  buyNowPrice: number;
  buyNowMode: BuyNowMode;
}

export default function BuyNowTransactionSuccess(
  props: BuyNowTransactionSuccessProps
) {
  const { artwork, buyNowPrice, buyNowMode } = props;

  const formattedPrice = formatETHWithSuffix(buyNowPrice);

  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
  const profilePath = buildUserProfilePath({ user: artwork?.owner });
  const isFndContract = isFNDContractAddress(artwork?.contractAddress);
  const collectionPath = buildCollectionPath(artwork?.collection);

  return (
    <TransactionProgressPane
      title={
        buyNowMode === 'set' ? 'Buy Now price set' : 'Buy Now price changed'
      }
      description={buildSuccessMessage(buyNowMode, formattedPrice)}
      status="success"
      meta={
        buyNowMode === 'set' && isFndContract ? (
          <TransactionActionButtons
            buttons={[
              {
                href: artworkPath,
                label: 'View NFT',
                variants: { color: 'white' },
              },
              {
                href: profilePath,
                label: 'View Profile',
                variants: { color: 'white' },
              },
            ]}
          />
        ) : buyNowMode === 'set' ? (
          <TransactionActionButtons
            buttons={[
              {
                href: artworkPath,
                label: 'View NFT',
                variants: { color: 'white' },
              },
              {
                href: collectionPath,
                label: 'View collection',
                variants: { color: 'white' },
              },
            ]}
          />
        ) : (
          <ButtonGrid>
            <TransactionActionButton
              href={buildArtworkPath({ artwork, user: artwork.creator })}
              variants={{ color: 'white' }}
              label="View NFT"
            />
          </ButtonGrid>
        )
      }
      fireConfetti={true}
    />
  );
}

// TODO: Move this copy to lib/transactionCopy

const buildSuccessMessage = (buyNowMode: BuyNowMode, buyNowPrice: string) => {
  return buyNowMode === 'set' ? (
    <>
      You have set a Buy Now price of{' '}
      <Text css={{ display: 'inline' }} weight="semibold">
        {buyNowPrice}
      </Text>{' '}
      for the NFT.
    </>
  ) : (
    <>
      You have set a new Buy Now price of{' '}
      <Text css={{ display: 'inline' }} weight="semibold">
        {buyNowPrice}
      </Text>{' '}
      for the NFT.
    </>
  );
};
