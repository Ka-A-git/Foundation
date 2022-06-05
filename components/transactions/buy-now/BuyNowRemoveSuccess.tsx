import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import {
  ButtonGrid,
  TransactionActionButton,
} from '../generic/TransactionActionButtons';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { buildArtworkPath } from 'utils/artwork/artwork';

interface BuyNowRemoveSuccessProps {
  artwork: ArtworkFragmentExtended;
}

export default function BuyNowRemoveSuccess(props: BuyNowRemoveSuccessProps) {
  const { artwork } = props;

  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });

  return (
    <TransactionProgressPane
      title="Buy Now price was removed"
      description={
        <>Your NFT Buy Now price has been removed from our marketplace.</>
      }
      status="success"
      meta={
        <ButtonGrid>
          <TransactionActionButton
            href={artworkPath}
            variants={{ color: 'white' }}
            label="View NFT"
          />
        </ButtonGrid>
      }
    />
  );
}
