import { parseISO, differenceInMinutes } from 'date-fns/fp';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { getMostRecentAuction } from 'utils/auctions/auctions';
import { formatETHWithSuffix } from 'utils/formatters';
import { getButtonProps } from './utils';
import { Market } from 'utils/markets/markets';
import { TestId } from './types';

import MarketWidgetContainer from './MarketWidgetContainer';
import { TransactionActionButton } from 'components/transactions/generic/TransactionActionButtons';
import Grid from 'components/base/Grid';
import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import Heading from 'components/base/Heading';
import MarketWidgetCountdownNotice from './MarketWidgetCountdownNotice';
import UserTagInline from 'components/users/UserTagInline';
import AuctionCountdown from './AuctionCountdown';

interface MarketWidgetLiveAuctionProps {
  artwork: ArtworkFragmentExtended;
  market: Market;
  isCurrentUserOwner: boolean;
  isCurrentUserActor: boolean;
  testId: TestId;
}

export default function MarketWidgetLiveAuction(
  props: MarketWidgetLiveAuctionProps
) {
  const { market, artwork, isCurrentUserActor, isCurrentUserOwner, testId } =
    props;

  const mostRecentAuction = getMostRecentAuction(artwork);

  const buttonProps = getButtonProps(artwork);

  const expiryDateObject = parseISO(`${market?.eventDate}Z`);
  const minutesRemaining = differenceInMinutes(Date.now(), expiryDateObject);

  return (
    <MarketWidgetContainer
      // the data-testid attribute is used by the testing
      // library and gets removed at the build step
      data-testid={testId}
    >
      <Box css={{ padding: '$6' }}>
        <Grid
          css={{
            marginBottom: '$3',
            '@bp0': { gridTemplateColumns: '1fr 1fr' },
          }}
        >
          <Box>
            <Flex css={{ justifyContent: 'space-between' }}>
              <Heading size={1} css={{ color: '$black60' }}>
                Current bid
              </Heading>
            </Flex>
            <Heading size={4} css={{ marginBottom: '$1' }}>
              {formatETHWithSuffix(market.amountInEth)}
            </Heading>
            <UserTagInline
              avatarSize={24}
              user={mostRecentAuction.highestBidderUser}
            />
          </Box>
          <AuctionCountdown endsAt={market.eventDate} />
        </Grid>
        {/* if current user owns the nft, tell them it’s in auction */}
        {isCurrentUserOwner ? (
          <Box style={{ pointerEvents: 'none' }}>
            <TransactionActionButton
              {...buttonProps.placeBid({
                buttonType: 'disabled',
                label: 'In auction',
              })}
            />
          </Box>
        ) : // if current user is an actor, they are the highest bidder
        isCurrentUserActor ? (
          <Box style={{ pointerEvents: 'none' }}>
            <TransactionActionButton
              {...buttonProps.placeBid({
                buttonType: 'success',
                label: 'Highest bid',
              })}
            />
          </Box>
        ) : // handle final 2 mins
        minutesRemaining < 2 ? (
          <Grid css={{ gap: '$4' }}>
            <MarketWidgetCountdownNotice
              title="Auction ending"
              subtitle="If you were to place a bid at this time there is a high chance that it would result in an error"
            />

            <TransactionActionButton
              {...buttonProps.placeBid({
                buttonType: 'primary',
                label: 'I understand, continue',
              })}
            />
          </Grid>
        ) : // handle final 15 mins
        minutesRemaining < 15 ? (
          <Grid css={{ gap: '$4' }}>
            <MarketWidgetCountdownNotice
              title="Taking final bids"
              subtitle="Any bids placed in the last 15 minutes will reset the countdown back to 15 minutes"
            />

            <TransactionActionButton
              {...buttonProps.placeBid({ buttonType: 'primary' })}
            />
          </Grid>
        ) : (
          // otherwise render the default action
          <Box>
            <TransactionActionButton
              {...buttonProps.placeBid({ buttonType: 'primary' })}
            />
          </Box>
        )}
      </Box>
    </MarketWidgetContainer>
  );
}
