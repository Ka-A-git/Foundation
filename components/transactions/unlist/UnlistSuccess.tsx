import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import TransactionActionButtons from '../generic/TransactionActionButtons';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { buildArtworkPath, buildUserProfilePath } from 'utils/artwork/artwork';

interface UnlistSuccessProps {
  artwork: ArtworkFragmentExtended;
}

export default function UnlistSuccess(props: UnlistSuccessProps) {
  const { artwork } = props;

  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
  const profilePath = buildUserProfilePath({ user: artwork?.owner });

  return (
    <TransactionProgressPane
      title="This NFT has been unlisted"
      description="The NFT has been unlisted from Foundation."
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
