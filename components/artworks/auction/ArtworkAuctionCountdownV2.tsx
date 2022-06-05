import { length } from 'ramda';

import useCountdown, { CountdownPart } from 'hooks/use-countdown';

import Box from 'components/base/Box';
import Grid from 'components/base/Grid';
import Flex from 'components/base/Flex';
import Heading from 'components/base/Heading';
import {
  ActivityMetaLabel,
  ActivityMetaValue,
} from 'components/activity/ActivityMetaPrimary';

interface ArtworkAuctionCountdownTimerProps {
  timestamp: number;
  className?: string;
  valueKey?: keyof CountdownPart;
}

export default function ArtworkAuctionCountdownTimerV2(
  props: ArtworkAuctionCountdownTimerProps
): JSX.Element {
  const { timestamp, className, valueKey = 'label' } = props;

  const { countdownParts, hasEnded } = useCountdown(timestamp);

  if (hasEnded) {
    return (
      <Box className={className}>
        <ActivityMetaValue>—</ActivityMetaValue>
        <ActivityMetaLabel css={{ color: '$black60' }}>
          Auction has ended
        </ActivityMetaLabel>
      </Box>
    );
  }

  return (
    <Grid
      css={{
        gap: '$2',
        gridTemplateColumns: `repeat(${length(countdownParts)}, 70px)`,
      }}
    >
      {countdownParts.map((part, key) => (
        <Box key={key}>
          <ActivityMetaValue>{part.value}</ActivityMetaValue>
          <ActivityMetaLabel>{part[valueKey]}</ActivityMetaLabel>
        </Box>
      ))}
    </Grid>
  );
}

type AuctionCountdownTimerInlineProps = ArtworkAuctionCountdownTimerProps;

export function AuctionCountdownTimerInline(
  props: AuctionCountdownTimerInlineProps
): JSX.Element {
  const { timestamp, valueKey = 'label' } = props;

  const { countdownParts, hasEnded } = useCountdown(timestamp);

  if (hasEnded) {
    return (
      <Flex css={{ gap: '$3', alignItems: 'center' }}>
        <CountdownPartComponent label="h" value={0} />
        <CountdownPartComponent label="m" value={0} />
        <CountdownPartComponent label="s" value={0} />
      </Flex>
    );
  }

  return (
    <Flex css={{ gap: '$3', alignItems: 'center' }}>
      {countdownParts.map((part, key) => (
        <CountdownPartComponent
          key={key}
          label={part[valueKey]}
          value={part.value}
        />
      ))}
    </Flex>
  );
}

interface CountdownPartComponentProps {
  label: string | number;
  value: string | number;
}

function CountdownPartComponent(props: CountdownPartComponentProps) {
  const { label, value } = props;
  return (
    <Flex css={{ alignItems: 'baseline', gap: '$2' }}>
      <Heading size={4}>{value}</Heading>
      <Heading size={1} css={{ color: '$black60' }}>
        {label}
      </Heading>
    </Flex>
  );
}
