import { InfiniteData } from 'react-query';
import { ReactNode } from 'react';
import NextLink from 'next/link';
import { groupWith, last } from 'ramda';
import useAlgoliaArtworks, {
  AlgoliaArtworksSearch,
  mapFacet,
  MarketAvailability,
  useAlgoliaArtworksFilters,
  useResetFilters,
} from 'hooks/queries/algolia/use-algolia-artworks';

import useModal from 'hooks/use-modal';

import ButtonWithClose from 'components/base/ButtonWithClose';
import ButtonV2 from 'components/base/ButtonV2';
import Box from 'components/base/Box';
import CardGrid from 'components/CardGrid';
import Flex from 'components/base/Flex';
import Heading from 'components/base/Heading';
import Text from 'components/base/Text';
import Button from 'components/base/Button';
import CollectionPriceFilters from './CollectionPriceFilters';
import ArtworkCardAlgolia from 'components/cards/artwork/ArtworkCardAlgolia';
import InfiniteScrollButton from 'components/feed/InfiniteScrollButton';
import CollectionSortBy from './CollectionSortByV2';
import CollectionFilterButtons from './CollectionFilterButtons';
import ArtworkAvailabilityModal from 'components/modals/v2/ArtworkAvailabilityModal';
import ArtworkPriceFilterModal from 'components/modals/v2/ArtworkPriceFilterModal';
import CollectionAttributeModal, {
  withOrWithoutValue,
} from 'components/modals/v2/CollectionAttributeModal';
import ArtworkCardSkeleton from 'components/cards/artwork/ArtworkCardSkeleton';
import Paragraph from 'components/base/Paragraph';
import CollectionEmptyState from './CollectionEmptyState';

import MediaIcons from 'assets/images/media.svg';

import { getGridSpacingStyles } from 'utils/styles';
import { getFirstValue, isAllTrue, notEmptyOrNil } from 'utils/helpers';
import { styled } from 'stitches.config';

import { ModalKey } from 'types/modal';

interface CollectionArtworksProps {
  contractAddress: string;
  isOwnerOnCollection: boolean;
  isOwnerOrAdmin: boolean;
  unstyledCollection: boolean;
  isEmptyCollection: boolean;
}

export default function CollectionArtworks(props: CollectionArtworksProps) {
  const {
    contractAddress,
    isOwnerOnCollection,
    isOwnerOrAdmin,
    isEmptyCollection,
    unstyledCollection,
  } = props;

  const [filtersData] = useAlgoliaArtworksFilters({
    contractAddress,
  });

  const moderationStatuses = isOwnerOrAdmin
    ? [
        'moderationStatus:ACTIVE',
        'moderationStatus:UNDER_REVIEW',
        'moderationStatus:TAKEDOWN_REQUESTED',
        'moderationStatus:SUSPENDED',
      ]
    : 'moderationStatus:ACTIVE';

  const { priceFilterAttribute, minPrice, maxPrice } = filtersData;

  const hasPriceFilters = isAllTrue([priceFilterAttribute, maxPrice]);

  const marketAvailability = getFirstValue(filtersData.marketAvailability);

  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    useAlgoliaArtworks(
      {
        contractAddress,
        searchIndex: filtersData.searchIndex,
        searchTerm: '',
        options: {
          numericFilters: hasPriceFilters
            ? [
                `${priceFilterAttribute} >= ${minPrice || 0}`,
                `${priceFilterAttribute} <= ${maxPrice}`,
              ]
            : minPrice
            ? [`${priceFilterAttribute} >= ${minPrice}`]
            : [],
          facets: [
            'latestBuyNow.amountInETH',
            'latestOffer.amountInETH',
            'auction.currentPrice',
            'marketAvailability',
          ],
          facetFilters: [
            moderationStatuses,
            'isDeleted:false',
            `collection.contractAddress:${contractAddress}`,
            filtersData.marketAvailability.map((facetName) =>
              mapFacet('marketAvailability', facetName)
            ),
            // TODO: split into helper function with comments
            ...groupWith((a, b) => {
              const [attrOne] = a.split(':');
              const [attrTwo] = b.split(':');
              return attrOne === attrTwo;
            }, filtersData.attributes),
          ],
        },
      },
      { keepPreviousData: true, refetchOnWindowFocus: false }
    );

  const hasAttributes = notEmptyOrNil(filtersData.attributes);

  return (
    <Box>
      {!isEmptyCollection && (
        <Box css={{ ...getGridSpacingStyles('marginBottom'), marginTop: -1 }}>
          {/* mobile nav */}
          <NavigationContainer
            viewport="mobile"
            css={{ flexDirection: 'column', gap: '$4' }}
          >
            <Flex css={{ flexGrow: 1, justifyContent: 'space-between' }}>
              <Flex css={{ gap: '$2' }}>
                <ArtworkAvailabilityModal contractAddress={contractAddress} />
                <ArtworkPriceFilterModal contractAddress={contractAddress} />
                <CollectionAttributeModal contractAddress={contractAddress} />
              </Flex>
              <CollectionSortBy contractAddress={contractAddress} />
            </Flex>
            {hasAttributes && (
              <AppliedFilters contractAddress={contractAddress} />
            )}
          </NavigationContainer>

          {/* desktop nav */}
          <NavigationContainer
            viewport="desktop"
            css={{ flexDirection: 'column', gap: '$4' }}
          >
            <Flex css={{ flexGrow: 1, justifyContent: 'space-between' }}>
              <Flex>
                <CollectionFilterButtons contractAddress={contractAddress} />
                <CollectionPriceFilters contractAddress={contractAddress} />
                <CollectionAttributeModal contractAddress={contractAddress} />
              </Flex>
              <CollectionSortBy contractAddress={contractAddress} />
            </Flex>
            {/* TODO: extract into re-usable component */}
            {hasAttributes && (
              <AppliedFilters contractAddress={contractAddress} />
            )}
          </NavigationContainer>
        </Box>
      )}

      <ArtworkResults
        isLoading={isLoading}
        contractAddress={contractAddress}
        isOwnerOnCollection={isOwnerOnCollection}
        unstyledCollection={unstyledCollection}
        isEmptyCollection={isEmptyCollection}
        hasFilters={filtersData.hasFilters}
        data={data}
        marketAvailability={marketAvailability}
        fetchMoreComponent={
          <InfiniteScrollButton
            handleNextPage={fetchNextPage}
            isFetching={isFetching}
            hasNextPage={hasNextPage}
          />
        }
      />
    </Box>
  );
}

interface ArtworkResultsProps {
  data: InfiniteData<AlgoliaArtworksSearch>;
  fetchMoreComponent: ReactNode;
  contractAddress: string;
  isLoading: boolean;
  isOwnerOnCollection: boolean;
  unstyledCollection: boolean;
  isEmptyCollection: boolean;
  hasFilters: boolean;
  marketAvailability: MarketAvailability;
}

function ArtworkResults(props: ArtworkResultsProps) {
  const {
    data,
    isLoading,
    fetchMoreComponent,
    contractAddress,
    isOwnerOnCollection,
    unstyledCollection,
    isEmptyCollection,
    hasFilters,
    marketAvailability,
  } = props;

  const { setCurrentModal } = useModal();

  if (isLoading) {
    return (
      <CardGrid>
        {[...Array(8)].map((_, index) => (
          <ArtworkCardSkeleton key={index} />
        ))}
      </CardGrid>
    );
  }

  const artworkPages = data?.pages ?? [];

  const artworks = artworkPages.flatMap((page) => page.hits);

  const hasResults = notEmptyOrNil(artworks);

  if (hasResults) {
    return (
      <>
        <CardGrid>
          {artworks.map((artwork) => (
            <ArtworkCardAlgolia
              key={artwork.objectID}
              artwork={artwork}
              marketAvailability={marketAvailability}
            />
          ))}
        </CardGrid>
        {fetchMoreComponent}
      </>
    );
  }

  if (hasFilters) {
    return <NoResults contractAddress={contractAddress} />;
  }

  if (isOwnerOnCollection && unstyledCollection) {
    return (
      <Flex
        css={{
          paddingY: '$5',
          marginX: 'auto',
          maxWidth: 500,
          minHeight: 400,
          '@bp1': {
            minHeight: 600,
          },
        }}
        center
        expandVertical
      >
        <Heading
          size={{ '@initial': 3, '@bp1': 4 }}
          css={{ textAlign: 'center', marginBottom: '$5' }}
        >
          Customize your collection
        </Heading>
        <Paragraph
          css={{
            textAlign: 'center',
            marginX: 'auto',
            marginBottom: '$7',
            maxWidth: 280,
          }}
        >
          Before you mint an NFT to your collection, customize it by uploading a
          logo, cover image, and description.
        </Paragraph>
        <Button
          color="black"
          hoverable
          shape="regular"
          size="large"
          onClick={() => setCurrentModal(ModalKey.EDIT_COLLECTION)}
          css={{ minWidth: 200 }}
        >
          Edit Collection
        </Button>
      </Flex>
    );
  }

  if (isOwnerOnCollection && isEmptyCollection) {
    return (
      <Flex
        css={{
          paddingY: '$5',
          minHeight: 400,
          '@bp1': {
            minHeight: 600,
          },
        }}
        center
        expandVertical
      >
        <MediaIcons />

        <Heading
          size={{ '@initial': 3, '@bp1': 4 }}
          css={{ textAlign: 'center', marginBottom: '$5', paddingTop: '$6' }}
        >
          Add NFTs to your collection
        </Heading>
        <Paragraph
          css={{
            textAlign: 'center',
            marginX: 'auto',
            marginBottom: '$7',
            maxWidth: 280,
          }}
        >
          This collection is currently empty. Get it started by minting the
          first NFT.
        </Paragraph>
        <NextLink
          href={`/create/upload?contractAddress=${contractAddress}`}
          passHref
          prefetch={false}
        >
          <Button
            as="a"
            color="black"
            hoverable
            shape="regular"
            size="large"
            css={{ minWidth: 200 }}
          >
            Mint an NFT
          </Button>
        </NextLink>
      </Flex>
    );
  }

  return <CollectionEmptyState isEmptyCollection={isEmptyCollection} />;
}

interface NoResultsProps {
  contractAddress: string;
}

function NoResults(props: NoResultsProps) {
  const { contractAddress } = props;

  const resetFilters = useResetFilters({
    contractAddress,
  });

  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 540,
        flexGrow: 1,
        backgroundColor: '$black5',
        borderRadius: '$3',
      }}
    >
      <Box css={{ maxWidth: 580, marginX: 'auto' }}>
        <Heading size={2} css={{ marginBottom: '$3', textAlign: 'center' }}>
          No results found
        </Heading>
        <Text
          size={1}
          css={{ color: '$black60', marginBottom: '$5', textAlign: 'center' }}
        >
          Adjust the selected filters to see more of this Collection.
        </Text>
        <Button
          size="regular"
          color="black"
          shape="regular"
          hoverable
          css={{ marginX: 'auto', paddingX: '$4' }}
          onClick={resetFilters}
        >
          Clear filters
        </Button>
      </Box>
    </Flex>
  );
}

const NavigationContainer = styled(Flex, {
  variants: {
    viewport: {
      mobile: {
        justifyContent: 'space-between',
        '@bp2': {
          display: 'none',
        },
      },
      desktop: {
        marginBottom: '$6',
        '@bp2-max': {
          display: 'none',
        },
      },
    },
  },
});

interface AppliedFiltersProps {
  contractAddress: string;
}

function AppliedFilters(props: AppliedFiltersProps) {
  const { contractAddress } = props;

  const [filtersData, setFilters] = useAlgoliaArtworksFilters({
    contractAddress,
  });

  const resetFilters = useResetFilters({ contractAddress });

  return (
    <>
      <Flex css={{ alignItems: 'center', flexWrap: 'wrap', gap: '$2' }}>
        {filtersData.attributes.map((attribute) => (
          <ButtonWithClose
            variant="outline"
            size={0}
            key={attribute}
            onClick={() =>
              setFilters({
                attributes: withOrWithoutValue(
                  attribute,
                  filtersData.attributes
                ),
              })
            }
          >
            {getAttributeName(attribute)}
          </ButtonWithClose>
        ))}
        <ButtonV2 type="button" variant="ghost" onClick={resetFilters} size={0}>
          Clear all
        </ButtonV2>
      </Flex>
    </>
  );
}

function getAttributeName(attribute: string) {
  return last(attribute.split(':'));
}
