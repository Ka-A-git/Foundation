import { take } from 'ramda';
import { useCallback } from 'react';

import Flex from 'components/base/Flex';
import Box from 'components/base/Box';
import CardGrid from 'components/CardGrid';
import ArtworkCardSkeleton from 'components/cards/artwork/ArtworkCardSkeleton';
import ArtworkCard from 'components/cards/artwork/ArtworkCard';

import {
  TrendingAuctions as ITrendingAuctions,
  useTrendingAuctions,
} from 'graphql/hasura/queries/trending-auctions.generated';
import { scoreTrendingArtwork } from 'queries/artworks';

import Artwork from 'types/Artwork';

import { parseDateToUnix } from 'utils/dates/dates';
import { getFirstValue, notEmptyOrNil } from 'utils/helpers';
import useSegmentEvent, {
  SegmentAuctionEvent,
} from 'hooks/analytics/use-segment-event';
import {
  ArtworkFragment,
  AuctionFragment,
} from 'graphql/hasura/hasura-fragments.generated';

const TRENDING_AUCTION_COUNT = 8;

export default function TrendingAuctions(): JSX.Element {
  const { data: auctionData, isLoading } = useTrendingAuctions(
    { limit: 48 },
    { select: selectTrendingAuctions, refetchOnWindowFocus: false }
  );

  const [sendSegmentEvent] = useSegmentEvent();

  const handleSegmentEvent = useCallback(
    (auction: AuctionFragment, artwork: ArtworkFragment) => {
      sendSegmentEvent<SegmentAuctionEvent>({
        eventName: 'trending_auction_clicked',
        payload: {
          auctionId: auction?.auctionId,
          contractAddress: artwork.contractAddress,
          tokenId: artwork.tokenId,
        },
      });
    },
    [sendSegmentEvent]
  );

  if (isLoading) {
    return (
      <Box>
        <CardGrid>
          {[...Array(TRENDING_AUCTION_COUNT)].map((_, key) => (
            <ArtworkCardSkeleton key={key} />
          ))}
        </CardGrid>
      </Box>
    );
  }

  const hasAuctionArtworks = notEmptyOrNil(auctionData);

  if (!hasAuctionArtworks) {
    return null;
  }

  const topEightAuctions = take(TRENDING_AUCTION_COUNT, auctionData);

  return (
    <Box>
      <CardGrid>
        {topEightAuctions.map((artwork: Artwork) => (
          <Flex
            key={artwork.id}
            onClick={() => {
              handleSegmentEvent(getFirstValue(artwork.auctions), artwork);
            }}
          >
            <ArtworkCard
              artwork={artwork}
              creator={artwork.creator}
              currentUserPublicKey={null}
            />
          </Flex>
        ))}
      </CardGrid>
    </Box>
  );
}

function selectTrendingAuctions(res: ITrendingAuctions) {
  const order = res.auctions.map((a) => ({
    tokenId: a.artwork.tokenId,
    bidVolumeInETH: a.bidVolumeInETH.aggregate.sum.bidAmount,
    numberOfBids: a.bidCount.aggregate.count,
    dateEnding: parseDateToUnix(a.endsAt),
  }));

  const auctionArtworks = res.auctions.map((auction) => auction.artwork);

  return auctionArtworks.sort((a, b) => {
    const artwork1 = order.find((o) => o.tokenId === a.tokenId);
    const artwork2 = order.find((o) => o.tokenId === b.tokenId);

    return scoreTrendingArtwork(artwork2) - scoreTrendingArtwork(artwork1);
  });
}
