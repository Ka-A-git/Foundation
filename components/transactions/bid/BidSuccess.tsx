import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import TransactionActionButtons from '../generic/TransactionActionButtons';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { buildArtworkPath, buildUserProfilePath } from 'utils/artwork/artwork';

interface BidSuccessProps {
  artwork: ArtworkFragmentExtended;
}

export default function BidSuccess(props: BidSuccessProps) {
  const { artwork } = props;

  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
  const profilePath = buildUserProfilePath({ user: artwork?.owner });

  return (
    <TransactionProgressPane
      fireConfetti
      title="Your bid was placed successfully."
      description="Your bid was confirmed on the Ethereum network. Please keep an eye on this auction in case someone outbids you before it’s over."
      status="success"
      meta={
        <TransactionActionButtons
          buttons={[
            { href: artworkPath, label: 'View NFT' },
            {
              href: profilePath,
              label: 'View profile',
              variants: { color: 'white' },
            },
          ]}
        />
      }
    />
  );
}
