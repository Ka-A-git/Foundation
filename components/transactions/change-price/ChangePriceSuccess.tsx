import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import TransactionActionButtons from '../generic/TransactionActionButtons';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { buildArtworkPath, buildUserProfilePath } from 'utils/artwork/artwork';

interface ChangePriceSuccessProps {
  artwork: ArtworkFragmentExtended;
}

export default function ChangePriceSuccess(props: ChangePriceSuccessProps) {
  const { artwork } = props;

  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
  const profilePath = buildUserProfilePath({ user: artwork?.owner });

  return (
    <TransactionProgressPane
      title="Reserve price changed"
      description="The reserve price has been changed for your NFT."
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
