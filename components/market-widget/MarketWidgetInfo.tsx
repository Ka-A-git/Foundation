import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import Heading from 'components/base/Heading';
import {
  ActionButton,
  TransactionActionButton,
} from 'components/transactions/generic/TransactionActionButtons';
import MarketWidgetPopover from './MarketWidgetPopover';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';
import { Authorization } from 'utils/artwork/artwork';

import { TestId } from './types';

export interface MarketWidgetInfoProps {
  label: string;
  value: string;
  testId: TestId;
  button: ActionButton;
  authorization?: Authorization;
  artwork?: ArtworkFragmentExtended;
  type?: 'auction' | 'buy-now';
  hidePopover?: boolean;
}

export default function MarketWidgetInfo(props: MarketWidgetInfoProps) {
  const {
    label,
    value,
    testId,
    button,
    authorization,
    artwork,
    type,
    hidePopover,
  } = props;
  return (
    <Flex
      data-testid={testId}
      css={{
        flex: 1,
        position: 'relative',
        padding: '$4',
        '@bp0': {
          padding: '$6',
        },
      }}
    >
      <Box css={{ width: '100%' }}>
        <Box>
          <Heading size={1} css={{ color: '$black60' }}>
            {label}
          </Heading>
          <Heading size={4} css={{ marginBottom: '$3' }}>
            {value}
          </Heading>
        </Box>
        <TransactionActionButton {...button} />
      </Box>
      {!hidePopover && (
        <MarketWidgetPopover
          artwork={artwork}
          type={type}
          authorization={authorization}
        />
      )}
    </Flex>
  );
}
