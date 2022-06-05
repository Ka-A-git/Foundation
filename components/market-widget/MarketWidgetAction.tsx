import Flex from 'components/base/Flex';
import Heading from 'components/base/Heading';

import {
  ActionButton,
  TransactionActionButton,
} from 'components/transactions/generic/TransactionActionButtons';

import { TestId } from './types';

interface MarketWidgetActionProps {
  title: string;
  subtitle: string;
  testId: TestId;
  button: ActionButton;
}

export default function MarketWidgetAction(props: MarketWidgetActionProps) {
  const { title, subtitle, button, testId } = props;

  return (
    <Flex
      // the data-testid attribute is used by the testing
      // library and gets removed at the build step
      data-testid={testId}
      css={{ flex: 1, padding: '$6' }}
    >
      <Flex css={{ width: '100%', flexDirection: 'column' }}>
        <Flex css={{ flexDirection: 'column', flexGrow: 1 }}>
          <Heading size={1} css={{ textAlign: 'center' }}>
            {title}
          </Heading>
          <Heading
            size={1}
            css={{
              paddingBottom: '$6',
              color: '$black60',
              textAlign: 'center',
            }}
          >
            {subtitle}
          </Heading>
        </Flex>

        <TransactionActionButton {...button} />
      </Flex>
    </Flex>
  );
}
