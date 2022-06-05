import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import {
  ButtonGrid,
  TransactionActionButton,
} from '../generic/TransactionActionButtons';

import { CollectionFragment } from 'graphql/hasura/hasura-fragments.generated';

import { buildCollectionPath } from 'utils/collections';

interface CreateCollectionSuccessProps {
  collection: CollectionFragment;
}

export default function CreateCollectionSuccess(
  props: CreateCollectionSuccessProps
) {
  const { collection } = props;

  const collectionPath = buildCollectionPath(collection);

  return (
    <TransactionProgressPane
      fireConfetti
      title="Your smart contract was deployed!"
      description="Congratulations! Your smart contract has been deployed to the Ethereum blockchain."
      status="success"
      meta={
        <ButtonGrid>
          <TransactionActionButton
            href={collectionPath}
            label="View your collection"
          />
        </ButtonGrid>
      }
    />
  );
}
