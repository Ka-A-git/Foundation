import {
  ButtonGrid,
  TransactionActionButton,
} from 'components/transactions/generic/TransactionActionButtons';
import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';

interface SelfDestructSuccessProps {
  profilePath: string;
}

export default function SelfDestructSuccess(props: SelfDestructSuccessProps) {
  const { profilePath } = props;

  return (
    <TransactionProgressPane
      title="This collection has self-destructed."
      description="This collection has successfully self-destructed, and it will no longer be displayed on Foundation."
      status="success"
      meta={
        <ButtonGrid>
          <TransactionActionButton href={profilePath} label="Back to profile" />
        </ButtonGrid>
      }
    />
  );
}
