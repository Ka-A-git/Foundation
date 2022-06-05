import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import {
  ButtonGrid,
  TransactionActionButton,
} from '../generic/TransactionActionButtons';

import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';

import { buildUserProfilePath } from 'utils/artwork/artwork';

interface BurnSuccessProps {
  creator: UserFragment;
}

export default function BurnSuccess(props: BurnSuccessProps) {
  const { creator } = props;

  const profilePath = buildUserProfilePath({ user: creator });

  return (
    <TransactionProgressPane
      title="This NFT has been burned"
      description="This NFT has been burned, and it will no longer be displayed on Foundation."
      status="success"
      meta={
        <ButtonGrid>
          <TransactionActionButton
            href={profilePath}
            label="View profile"
            variants={{ color: 'white' }}
          />
        </ButtonGrid>
      }
    />
  );
}
