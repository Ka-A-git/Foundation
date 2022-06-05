import useExpiryCountdown from 'hooks/use-expiry-count-down';

import { notEmptyOrNil } from 'utils/helpers';
import { areKeysEqual } from 'utils/users';
import { Market, MarketUser } from 'utils/markets/markets';
import { MarketWidgetInfoProps } from './MarketWidgetInfo';

import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import Heading from 'components/base/Heading';
import ProgressCircle from 'components/cards/artwork/subcomponents/ProgressCircle';
import UserTagInline from 'components/users/UserTagInline';
import Tooltip from 'components/Tooltip';

import { TransactionActionButton } from 'components/transactions/generic/TransactionActionButtons';
import { CSS } from 'stitches.config';

type MarketWidgetOfferInfoProps = MarketWidgetInfoProps & {
  hasOtherMarkets: boolean;
  offerMarket: Market;
};

export default function MarketWidgetOfferInfo(
  props: MarketWidgetOfferInfoProps
) {
  const { label, value, button, hasOtherMarkets, testId, offerMarket } = props;

  const offerBuyer = offerMarket?.marketUsers?.find((user) =>
    areKeysEqual([user.publicKey, offerMarket.buyer])
  );

  return (
    <Flex
      // the data-testid attribute is used by the testing
      // library and gets removed at the build step
      data-testid={testId}
      css={{
        justifyContent: 'space-between',
        padding: '$4',
        borderTop: hasOtherMarkets ? 'solid 1px $black10' : null,
        flexDirection: 'column',
        '@bp0': {
          padding: '$6',
          alignItems: 'center',
          flexDirection: 'row',
        },
      }}
    >
      <Flex css={{ alignItems: 'center', flexWrap: 'wrap' }}>
        {/* when there’s an active offer, render the progress indicator */}
        {offerMarket?.marketType === 'OFFER' && (
          <OfferProgressCircle
            css={{ marginRight: '$4' }}
            expiryDate={offerMarket.eventDate}
            size={40}
            strokeWidth={6}
          />
        )}
        <Box
          css={{
            '@bp0-max': {
              paddingBottom: '$2',
            },
          }}
        >
          <Heading size={1} css={{ color: '$black60' }}>
            {label}
          </Heading>
          {notEmptyOrNil(value) && <Heading size={3}>{value}</Heading>}
        </Box>
        {offerBuyer && <OfferBuyer offerBuyer={offerBuyer} />}
      </Flex>
      <TransactionActionButton {...button} />
    </Flex>
  );
}

interface OfferProgressCircleProps {
  expiryDate: string;
  size: number;
  strokeWidth: number;
  css?: CSS;
}

export function OfferProgressCircle(props: OfferProgressCircleProps) {
  const { expiryDate, size, strokeWidth, css } = props;

  const { percent, timeRemaining } = useExpiryCountdown({ expiryDate });

  return (
    <Tooltip
      content={`Expires in ${timeRemaining}`}
      animation="shift-away"
      hideOnClick={false}
    >
      <Box css={{ cursor: 'pointer', ...css }}>
        <ProgressCircle
          percent={percent}
          size={size}
          strokeWidth={strokeWidth}
        />
      </Box>
    </Tooltip>
  );
}

interface OfferBuyerProps {
  offerBuyer: MarketUser;
}

function OfferBuyer(props: OfferBuyerProps) {
  const { offerBuyer } = props;

  return (
    <Box
      css={{
        width: '100%',
        marginBottom: '$4',
        '@bp0': {
          width: 'unset',
          alignSelf: 'flex-start',
          borderLeft: '1px solid $black5',
          marginLeft: '$4',
          paddingLeft: '$4',
          // optically align in the widget
          marginTop: -2,
        },
      }}
    >
      <UserTagInline avatarSize={24} user={offerBuyer} />
    </Box>
  );
}
