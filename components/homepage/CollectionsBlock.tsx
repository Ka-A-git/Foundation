import { useCallback } from 'react';
import NextLink from 'next/link';
import { compose } from 'ramda';
import { styled } from 'stitches.config';

import Flex from 'components/base/Flex';
import Link from 'components/base/Link';
import Grid from 'components/base/Grid';
import Box from 'components/base/Box';
import Overlay from 'components/base/Overlay';
import FeaturedSectionHeading from 'components/FeaturedSectionHeading';
import { CollectionSection } from 'components/collections/CollectionSection';
import ArtworkCard from 'components/cards/artwork/ArtworkCard';

import { buildCollectionPath, isSharedContract } from 'utils/collections';
import { FeaturedCollection } from 'utils/homepage';
import {
  buildImgixUrlNew,
  COLLECTION_IMAGE_IMGIX_BLUR,
  whenURLIsValid,
} from 'utils/assets';
import { getFirstValue, notEmpty } from 'utils/helpers';

import useSegmentEvent, {
  SegmentAuctionEvent,
} from 'hooks/analytics/use-segment-event';

import {
  ArtworkFragment,
  AuctionFragment,
  CollectionFragment,
} from 'graphql/hasura/hasura-fragments.generated';

interface IndexPageProps {
  collections: FeaturedCollection[];
}

// Unsafe because this depends on various padding/margin/gap
// values which might be changed. Collectively these are used
// to offset the horizontal scroll position of a collection section
// so that it appears at the very bottom of the section on mobile.
const UNSAFE_GAP_HEIGHT = 16;
const UNSAFE_USER_BADGE_HEIGHT = 48;
const UNSAFE_USER_BADGE_PADDING_BOTTOM = 48;
const UNSAFE_SCROLLBAR_OFFSET =
  UNSAFE_USER_BADGE_HEIGHT +
  UNSAFE_GAP_HEIGHT +
  UNSAFE_USER_BADGE_PADDING_BOTTOM;

type SegmentCollectionEvent = {
  contractAddress: string;
};

export default function CollectionsBlock(props: IndexPageProps): JSX.Element {
  const { collections } = props;
  const [sendSegmentEvent] = useSegmentEvent();

  console.log(collections);

  const handleFeaturedArtworkSegmentEvent = useCallback(
    (auction: AuctionFragment, artwork: ArtworkFragment) => {
      sendSegmentEvent<SegmentAuctionEvent>({
        eventName: 'featured_artwork_clicked',
        payload: {
          auctionId: auction?.auctionId,
          contractAddress: artwork.contractAddress,
          tokenId: artwork.tokenId,
        },
      });
    },
    [sendSegmentEvent]
  );

  const handleFeaturedCollectionSegmentEvent = useCallback(
    (collection: CollectionFragment) => {
      sendSegmentEvent<SegmentCollectionEvent>({
        eventName: 'featured_collection_clicked',
        payload: {
          contractAddress: collection.contractAddress,
        },
      });
    },
    [sendSegmentEvent]
  );

  if (collections.length === 0) {
    return null;
  }

  return (
    <Container>
      <FeaturedSectionHeading>Curated Collections</FeaturedSectionHeading>
      <CollectionWrapper>
        <CollectionSection.Provider mobileLayoutBreakpoint={5}>
          {collections.map((collection) => {
            const isSharedCollection = isSharedContract(
              collection.contractAddress
            );
            const backgroundImageUrl = buildCollectionBlockBackgroundImageUrl(
              isSharedCollection
                ? collection.creator.coverImageUrl
                : collection.coverImageUrl
            );
            const hasBackgroundImage = notEmpty(backgroundImageUrl);

            const userBlock = (
              <CollectionSection.User
                hasDarkBackground={hasBackgroundImage}
                user={collection.creator}
              />
            );

            return (
              <Collection
                css={{
                  backgroundImage: `url(${backgroundImageUrl})`,
                  backgroundColor: hasBackgroundImage ? `$black100` : `$black5`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',

                  // Needed for overlay
                  position: 'relative',
                }}
                key={collection.contractAddress}
              >
                {hasBackgroundImage && (
                  <Overlay css={{ zIndex: 2, pointerEvents: 'none' }} />
                )}
                <Grid
                  css={{
                    zIndex: 3,
                    position: 'relative',
                    color: hasBackgroundImage ? '$white100' : '$black100',
                    gridTemplateColumns: '1fr',
                    gap: '$4',
                    '@bp0': {
                      gap: '$7',
                    },
                    '@bp5': {
                      gridTemplateColumns: '1fr minmax(min-content, 3fr)',
                    },
                  }}
                >
                  <Flex
                    css={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      height: '100%',
                      paddingX: '$6',
                      '@bp4': {
                        paddingX: 0,
                      },
                    }}
                  >
                    <Flex
                      css={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 'inherit',
                        '@bp5': {
                          alignItems: 'flex-start',
                        },
                      }}
                    >
                      <NextLink href={buildCollectionPath(collection)} passHref>
                        <Link
                          css={{
                            display: 'flex',
                            textDecoration: 'none',
                            color: 'inherit',
                            height: 'inherit',
                            '@bp5': {
                              flexGrow: 1,
                              marginBottom: '$6',
                            },
                          }}
                          onClick={() =>
                            handleFeaturedCollectionSegmentEvent(collection)
                          }
                        >
                          <CollectionSection.Details
                            artworkCount={
                              collection.artworkCount.aggregate.count
                            }
                            collection={collection}
                            hasDarkBackground={true}
                          />
                        </Link>
                      </NextLink>
                      <Box
                        css={{
                          display: 'none',
                          '@bp0': {
                            display: 'block',
                            marginLeft: '$4',
                          },
                          '@bp5': {
                            display: 'none',
                          },
                        }}
                      >
                        {userBlock}
                      </Box>
                    </Flex>
                    <Box
                      css={{
                        display: 'none',
                        '@bp5': {
                          display: 'flex',
                          marginTop: '$6',
                        },
                      }}
                    >
                      {userBlock}
                    </Box>
                  </Flex>
                  <CollectionSection.Grid
                    css={{
                      // This padding pushes the horizontal scrollbar to the bottom of the card
                      // Unsafe because it's a hard coded pixel value
                      paddingBottom: UNSAFE_SCROLLBAR_OFFSET,
                      '@bp0': {
                        // This padding pushes the horizontal scrollbar to the bottom of the card
                        paddingBottom: '$8',
                      },
                      '@bp4': {
                        paddingBottom: 0,
                      },
                    }}
                  >
                    {collection.artworks.map((artwork) => {
                      return (
                        <Flex
                          key={artwork.id}
                          onClick={() => {
                            handleFeaturedArtworkSegmentEvent(
                              getFirstValue(artwork.auctions),
                              artwork
                            );
                          }}
                        >
                          <ArtworkCard
                            key={artwork.tokenId}
                            artwork={artwork}
                            creator={artwork.creator}
                            currentUserPublicKey={''} // TODO: scott will fix soon
                          />
                        </Flex>
                      );
                    })}
                  </CollectionSection.Grid>
                  <Box
                    css={{
                      display: 'flex',
                      position: 'absolute',
                      bottom: '$8',
                      left: '$6',

                      '@bp0-max': {
                        marginTop: `-${UNSAFE_SCROLLBAR_OFFSET}px`,
                      },

                      '@bp0': {
                        display: 'none',
                      },
                    }}
                  >
                    {userBlock}
                  </Box>
                </Grid>
              </Collection>
            );
          })}
        </CollectionSection.Provider>
      </CollectionWrapper>
    </Container>
  );
}

const Container = styled(Box, {
  marginTop: '$9',
  '@bp2': {
    marginTop: 0,
  },
});

const CollectionWrapper = styled('div', {
  '@bp4-max': {
    width: '100vw',
    // Offset parent padding
    marginLeft: '-$6',
  },
});

const Collection = styled('div', {
  overflow: 'hidden',
  marginBottom: '2px',
  paddingTop: '$8',

  '&:last-child': {
    marginBottom: 0,
  },

  '@bp4': {
    padding: '$8',
    marginBottom: '$6',
    borderRadius: '$4',
  },
});

const buildCollectionBlockBackgroundImageUrl = compose<string, string>(
  whenURLIsValid(
    buildImgixUrlNew({
      blur: COLLECTION_IMAGE_IMGIX_BLUR,
      'max-w': 1600,
      'max-h': 596,
      auto: 'format,compress',
      fit: 'crop',
      exp: -5,
    })
  )
);
