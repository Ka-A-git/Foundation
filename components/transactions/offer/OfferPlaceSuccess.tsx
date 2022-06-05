import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import TransactionActionButtons from '../generic/TransactionActionButtons';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { buildArtworkPath } from 'utils/artwork/artwork';

interface OfferPlaceSuccessProps {
  artwork: ArtworkFragmentExtended;
}

// TODO: Rename this file to OfferMakeSuccess
export default function OfferPlaceSuccess(props: OfferPlaceSuccessProps) {
  const { artwork } = props;

  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });

  return (
    <TransactionProgressPane
      title="Offer made!"
      description="Your Offer has been sent to the owner. They have 24 hours to accept your offer. If not accepted, the Offer will expire and will be returned to your Offer Balance."
      status="success"
      meta={
        <TransactionActionButtons
          buttons={[{ href: artworkPath, label: 'View NFT' }]}
        />
      }
      fireConfetti={true}
    />
  );
}
