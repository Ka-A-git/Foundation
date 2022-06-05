import { CSS } from 'stitches.config';

import ArtworkAuctionCountdown from '../auction/ArtworkAuctionCountdown';
import UserTag from 'components/users/UserTag';
import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import Box from 'components/base/Box';
import GraySquare from 'components/base/GraySquare';
import ETHinUSD from 'components/ETHinUSD';

import { isAuctionEnded, isAuctionNotYetListed } from 'utils/auctions/auctions';
import { isTransferredOwnerMostRecent } from 'utils/artwork/artwork';
import { parseDateToUnix } from 'utils/dates/dates';
import { formatETHWithSuffix } from 'utils/formatters';

import { AuctionFragment } from 'graphql/hasura/hasura-fragments.generated';
import {
  ArtworkInfoBlock,
  ArtworkInfoContainer,
  ArtworkInfoHeading,
} from '../ArtworkInfo';
import { Market } from 'utils/markets/markets';
import { OfferProgressCircle } from 'components/market-widget/MarketWidgetOfferInfo';

interface FeaturedArtworkPriceProps {
  auction: AuctionFragment;
  buyNow: Market;
  offer: Market;
  isLoading: boolean;
}

const priceStyles = {
  whiteSpace: 'pre',
  textAlign: 'left',
  paddingBottom: '$1',
  '@bp0': {
    paddingRight: '$7',
  },
  '@bp3': {
    marginBottom: 0,
  },
};

export default function FeaturedArtworkPrice(
  props: FeaturedArtworkPriceProps
): JSX.Element {
  const { auction, buyNow, offer, isLoading } = props;

  const isEnded = isAuctionEnded(parseDateToUnix(auction?.endsAt));
  const isNotYetListed = isAuctionNotYetListed(auction);

  // TODO: pass in the new artwork history here (and simplify the logic)
  const hasDifferentOwner = isTransferredOwnerMostRecent([]);

  if (isLoading) {
    return (
      <Flex
        css={{
          flexDirection: 'column',
          '@bp3': {
            flexDirection: 'row',
            paddingBottom: 0,
          },
        }}
      >
        <SkeletonLoadingBlock css={priceStyles} />
        <SkeletonLoadingBlock />
      </Flex>
    );
  }

  if (hasDifferentOwner && !buyNow && !offer) {
    return (
      <ArtworkInfoContainer>
        <ArtworkInfoBlock>
          <ArtworkInfoHeading spacing="large">Owned by</ArtworkInfoHeading>
          <Flex css={{ marginY: 'auto' }}>
            <UserTag user={auction.highestBidderUser} />
          </Flex>
        </ArtworkInfoBlock>
      </ArtworkInfoContainer>
    );
  }

  if (isNotYetListed && !buyNow && !offer) {
    return null;
  }

  if (isEnded && !buyNow && !offer) {
    return (
      <ArtworkInfoContainer>
        <Price
          label="Sold for"
          amountInETH={auction.highestBidAmount}
          css={priceStyles}
        />
        <ArtworkInfoBlock>
          <ArtworkInfoHeading spacing="large">Owned by</ArtworkInfoHeading>
          <Flex css={{ marginY: 'auto' }}>
            <UserTag user={auction.highestBidderUser} />
          </Flex>
        </ArtworkInfoBlock>
      </ArtworkInfoContainer>
    );
  }

  // If an active offer is present
  if (offer) {
    return (
      <Flex css={{ alignItems: 'center' }}>
        <OfferProgressCircle
          css={{ marginRight: '$4' }}
          expiryDate={offer.eventDate}
          size={46}
          strokeWidth={6}
        />
        <Price label="Active Offer" amountInETH={offer.amountInEth} />
      </Flex>
    );
  }

  // If there is both a reserve price and a buy now price set
  if (!auction?.highestBidder && buyNow) {
    return (
      <Flex css={{ gap: '$7' }}>
        <Price label="Buy Now" amountInETH={buyNow.amountInEth} />

        <Box css={{ borderLeft: '1px solid $black5' }} />

        <Price label="Reserve price" amountInETH={auction.reservePriceInETH} />
      </Flex>
    );
  }

  // If there is only a reserve price set
  if (!auction?.highestBidder) {
    return <Price label="Reserve" amountInETH={auction.reservePriceInETH} />;
  }

  // If there is only a buy now price set
  if (buyNow) {
    return <Price label="Buy Now" amountInETH={buyNow.amountInEth} />;
  }

  return (
    <ArtworkInfoContainer>
      <Price
        label="Current bid"
        amountInETH={auction.highestBidAmount}
        css={priceStyles}
      />
      <ArtworkInfoBlock>
        <ArtworkAuctionCountdown endDate={parseDateToUnix(auction?.endsAt)} />
      </ArtworkInfoBlock>
    </ArtworkInfoContainer>
  );
}

interface SkeletonLoadingBlockProps {
  css?: CSS;
}

function SkeletonLoadingBlock(props: SkeletonLoadingBlockProps): JSX.Element {
  const { css } = props;
  return (
    <Box css={css}>
      <GraySquare
        css={{
          marginBottom: '$2',
          height: 18,
          width: 80,
          '@bp3': { height: 20 },
        }}
      />
      <GraySquare
        css={{
          marginBottom: '$2',
          height: 35,
          width: 150,
          '@bp3': { height: 44 },
        }}
      />
      <GraySquare
        css={{
          height: 18,
          width: 50,
          '@bp3': { height: 20 },
        }}
      />
    </Box>
  );
}

interface PriceProps {
  label: string;
  amountInETH: number | string;
  css?: CSS;
}

function Price(props: PriceProps): JSX.Element {
  const { label, amountInETH, css } = props;
  return (
    <ArtworkInfoBlock css={css}>
      <ArtworkInfoHeading spacing="regular">{label}</ArtworkInfoHeading>
      <Text
        css={{
          fontSize: '$3',
          marginBottom: '$2',
          fontWeight: '$semibold',
          whiteSpace: 'nowrap',
          '@bp3': {
            fontSize: '$4',
          },
        }}
      >
        {formatETHWithSuffix(Number(amountInETH))}
      </Text>
      <Text size={1} weight="semibold" css={{ color: '$black60' }}>
        <ETHinUSD amount={amountInETH} />
      </Text>
    </ArtworkInfoBlock>
  );
}
