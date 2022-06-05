import Button from 'components/base/Button';
import {
  ButtonGrid,
  TransactionActionButton,
} from 'components/transactions/generic/TransactionActionButtons';
import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';

export default function ApprovedCreatorGuard() {
  return (
    <TransactionProgressPane
      key="approved-creator"
      status="warning"
      title="You’re not an approved creator"
      description="The wallet that is currently connected is not approved to be a creator on Foundation."
      meta={
        <ButtonGrid>
          <TransactionActionButton href="/" label="Back home" />
          <Button
            as="a"
            hoverable
            size="large"
            shape="regular"
            color="white"
            css={{ width: '100%' }}
            target="_blank"
            rel="noreferrer"
            href="https://help.foundation.app/hc/en-us/articles/4490682972315-FAQ-Creator-Invites"
          >
            Learn more
          </Button>
        </ButtonGrid>
      }
    />
  );
}
