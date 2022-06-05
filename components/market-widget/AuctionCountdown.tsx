import { parseDateToUnix } from 'utils/dates/dates';
import useCountdown from 'hooks/use-countdown';
import { differenceInMinutes, parseISO } from 'date-fns';

import Box from 'components/base/Box';
import Text from 'components/base/Text';
import Grid from 'components/base/Grid';
import Heading from 'components/base/Heading';
import ArtworkCardMetaLabel, {
  ArtworkCardMetaValue,
} from 'components/cards/artwork/subcomponents/meta/ArtworkCardMetaLabel';
import Flex from 'components/base/Flex';

interface AuctionCountdownProps {
  endsAt: string;
  isCompact?: boolean;
}

export default function AuctionCountdown(
  props: AuctionCountdownProps
): JSX.Element {
  const { endsAt, isCompact = false } = props;

  const timestamp = parseDateToUnix(endsAt);
  const expiryDateObject = parseISO(`${endsAt}Z`);
  const minutesRemaining = differenceInMinutes(expiryDateObject, Date.now());
  const { countdownParts, hasEnded } = useCountdown(timestamp);
  const length = countdownParts.length;

  if (!hasEnded) {
    if (isCompact) {
      return (
        <Box>
          <ArtworkCardMetaLabel color="dark" css={{ marginBottom: '$1' }}>
            Ends in
          </ArtworkCardMetaLabel>
          {minutesRemaining < 2 ? (
            <Heading
              size={2}
              css={{
                whiteSpace: 'nowrap',
              }}
            >
              2 minutes
            </Heading>
          ) : (
            <Flex>
              {countdownParts.map((part, key) => (
                <ArtworkCardMetaValue
                  key={key}
                  css={{
                    paddingRight: length !== key + 1 ? '$2' : 0,
                  }}
                >
                  {part.formattedValue}
                  {part.shortLabel}
                </ArtworkCardMetaValue>
              ))}
            </Flex>
          )}
        </Box>
      );
    }
    return (
      <Box
        css={{
          '@bp0-max': {
            borderTop: '1px solid $black10',
            paddingTop: '$3',
            marginTop: '$3',
          },
          '@bp0': {
            borderLeft: '1px solid $black10',
            paddingLeft: '$6',
          },

          position: 'relative',
        }}
      >
        <Heading
          css={{
            color: '$black60',
            '@bp0-max': {
              marginBottom: '$1',
            },
          }}
        >
          Auction ends in
        </Heading>
        {minutesRemaining < 2 ? (
          <Heading
            size={{ '@bp0-max': 2, '@initial': 3, '@bp0': 4 }}
            css={{
              whiteSpace: 'nowrap',
            }}
          >
            2 minutes
          </Heading>
        ) : (
          <Grid
            css={{
              gridGap: '$4',
              gridTemplateColumns: `repeat(${length}, 65px)`,
            }}
          >
            {countdownParts.map((part, key) => (
              <Box key={key}>
                <Heading
                  size={{ '@bp0-max': 2, '@initial': 3, '@bp0': 4 }}
                  css={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {part.value}
                </Heading>
                <Text
                  size={{ '@initial': 0, '@bp0': 1 }}
                  weight="semibold"
                  css={{ color: '$black60' }}
                >
                  {part.label}
                </Text>
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    );
  }

  return null;
}
