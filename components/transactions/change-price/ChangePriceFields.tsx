import ETHField from 'components/forms/fields/ETHField';
import ExternalLink from 'components/links/ExternalLink';
import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import TransactionParagraph from '../TransactionParagraph';
import TransactionHeading from '../TransactionHeading';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

export default function ChangePriceFields() {
  return (
    <TransitionPane>
      <TransactionCard>
        <Box>
          <TransactionHeading css={{ marginBottom: '$7' }}>
            Change reserve
          </TransactionHeading>
          <Box css={{ marginBottom: '$7' }}>
            <ETHField placeholder="1" name="reservePrice" />
          </Box>

          <TransactionParagraph
            size="sub"
            css={{ marginBottom: '$5', color: '$black60' }}
          >
            This price will be made public. Bidders will not be able to bid
            below this price. Once a bid has been placed, a 24 hour auction for
            the piece will begin.
          </TransactionParagraph>
          <Flex
            css={{
              marginBottom: '$5',
              '@bp1': { marginBottom: '$8' },
            }}
          >
            <ExternalLink
              rel="noopener noreferrer"
              target="_blank"
              href="https://help.foundation.app/hc/en-us/articles/4562018706459"
            >
              Learn how our auctions work.
            </ExternalLink>
          </Flex>
        </Box>
        <TransactionSubmitButton
          label="Change reserve"
          submittingLabel="Changing reserve…"
          submittedLabel="Reserve changed"
        />
      </TransactionCard>
    </TransitionPane>
  );
}
