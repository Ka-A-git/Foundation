import { useEffect } from 'react';

import ArtworkMeta from './ArtworkMeta';
import ArtworkHeader from './ArtworkHeader';
import PopoverShare from 'components/popover/PopoverShare';
import ArtworkProvenance from './ArtworkProvenance';
import ArtworkMediaGeneric from './media/ArtworkMediaGeneric';
import ArtworkMediaModel from './media/ArtworkMediaModel';
import ArtworkPagePopover from './ArtworkPagePopover';
import ArtworkMediaFallback from './media/ArtworkMediaFallback';
import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import Grid from 'components/base/Grid';
import Body from 'components/base/Body';
import ArtworkFooter from './ArtworkFooter';
import Heading from 'components/base/Heading';
import MarketWidgetState from 'components/market-widget/MarketWidgetState';
import OwnerInfo from 'components/market-widget/OwnerInfo';

import NotAllowedIcon from 'assets/icons/not-allowed.svg';
import AdminShield from 'assets/icons/admin-shield.svg';

import useArtworkByContractTokenId from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import useArtworkEventsByContractSlugTokenId from 'hooks/queries/hasura/artworks/use-artwork-events-by-contract-slug-token-id';
import { useUsersFromHistoryEvents } from 'hooks/queries/hasura/users/use-users-by-public-keys-v2';
import useArtworkActivity from 'hooks/queries/hasura/artworks/use-artwork-activity';
import useModal from 'hooks/use-modal';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';
import { ArtworkEvent } from 'types/Event';
import { BasicArtwork } from 'types/Artwork';
import { ModalKey } from 'types/modal';

import {
  ArtworkPageArtwork,
  ArtworkPageSplitRecipient,
} from 'queries/server/artwork-page';

import {
  buildArtworkPath,
  getAuthorization,
  getComputedArtworkStatus,
  getFallbackArtworkUrl,
  hasActiveBuyNow,
} from 'utils/artwork/artwork';
import { isAnyTrue, noop } from 'utils/helpers';
import {
  buildArtworkPageAssetUrl,
  buildFallbackCoverImageUrl,
  isModel,
} from 'utils/assets';
import { getLatestArtworkEvent, isAuctionLive } from 'utils/auctions/auctions';
import { areKeysEqual } from 'utils/users';
import { parseDateToUnix } from 'utils/dates/dates';
import { isSharedContract } from 'utils/collections';
import { Attributes } from 'components/modals/v2/CollectionAttributeModal';

type PageContextArtwork =
  | { pageContext: 'preview-page'; artwork: BasicArtwork }
  | { pageContext: 'artwork-page'; artwork: ArtworkFragmentExtended };

type ArtworkPageProps = PageContextArtwork & {
  artwork: ArtworkFragmentExtended;
  percentSplits: ArtworkPageSplitRecipient[];
  currentUserPublicKey: string;
  currentUserIsAdmin?: boolean;
  isCurrentUserLoading: boolean;
  isUnsupportedAsset?: boolean;
  mintEvent?: ArtworkEvent;
  tags?: string[];
  collection: ArtworkPageArtwork['collection'];
  artworkAttributes: Attributes[];
  totalArtworks: number;
};

export default function ArtworkPage(props: ArtworkPageProps) {
  const {
    artwork,
    percentSplits,
    tags,
    currentUserPublicKey,
    isCurrentUserLoading,
    isUnsupportedAsset = false,
    collection,
    mintEvent,
    currentUserIsAdmin = false,
    pageContext,
    artworkAttributes,
    totalArtworks,
  } = props;

  const { setCurrentModal } = useModal();
  const creator = artwork?.creator;

  const tokenId = artwork?.tokenId;
  const contractSlug = collection?.slug;

  const { data: artworkActivityData, isLoading: isArtworkActivityLoading } =
    useArtworkActivity(
      { tokenId, contractSlug, currentUserPublicKey },
      { enabled: !isCurrentUserLoading, refetchInterval: 10 * 1000 }
    );

  const artworkPath = buildArtworkPath({
    user: creator,
    artwork,
  });

  const assetUrl = buildArtworkPageAssetUrl(artwork);
  const isModelMedia = isModel(assetUrl);

  const isCreator = areKeysEqual([artwork?.publicKey, currentUserPublicKey]);
  const isOwner = areKeysEqual([currentUserPublicKey, artwork?.ownerPublicKey]);
  const isCreatorOwner = areKeysEqual([
    artwork?.ownerPublicKey,
    artwork?.publicKey,
  ]);

  const status = getComputedArtworkStatus({
    mostRecentActiveAuction: artworkActivityData?.activeAuction,
    latestArtworkEvent: getLatestArtworkEvent({
      latestEvents: artworkActivityData?.latestArtworkEvents,
    }),
    currentUserPublicKey,
    isCreatorOwner,
  });

  const artworkData: ArtworkFragmentExtended = {
    latestEvents: artworkActivityData?.latestArtworkEvents,
    auctions: [artworkActivityData?.activeAuction],
    splitRecipients: artworkActivityData?.splitRecipients,
    privateSales: [],
    mostRecentPrivateSales: [],
    offers: [],
    buyNows: [],
    ...artwork,
  };

  const { data: liveArtworkData, isLoading: isLiveArtworkDataLoading } =
    useArtworkByContractTokenId(
      { tokenId, contractSlug },
      { refetchInterval: 10 * 1000, initialData: { artworks: [artworkData] } }
    );

  const { data: history, isLoading: isHistoryLoading } =
    useArtworkEventsByContractSlugTokenId(
      { tokenId, contractSlug },
      { refetchInterval: 10 * 1000 }
    );

  const { data: historyUsersData, isLoading: isHistoryUsersLoading } =
    useUsersFromHistoryEvents(history);

  const isSharedCollection =
    pageContext === 'artwork-page'
      ? isSharedContract(collection?.contractAddress)
      : true;

  // to prevent overflow issue with Safari 13
  useEffect(() => {
    document.body.classList.add('webkit-fit-content');
    return () => {
      document.body.classList.remove('webkit-fit-content');
    };
  }, []);

  const isLoading = isAnyTrue([
    isHistoryUsersLoading,
    isHistoryLoading,
    isArtworkActivityLoading,
    isCurrentUserLoading,
  ]);

  const isLiveArtworkLoading = isAnyTrue([
    !liveArtworkData,
    isLiveArtworkDataLoading,
  ]);

  const auctionEndsAt = artworkActivityData?.activeAuction?.endsAt;
  const unixEndDate = parseDateToUnix(auctionEndsAt);
  const isArtworkAuctionLive = isAuctionLive(unixEndDate);

  const hasBuyNow = hasActiveBuyNow(liveArtworkData);

  const authorization = getAuthorization({
    isOwner,
    isCreator,
    isCreatorOwner,
    status,
    hasBuyNow,
    isArtworkAuctionLive,
  });

  const getHero = () => {
    if (isModelMedia) {
      return <ArtworkMediaModel assetUrl={assetUrl} />;
    }

    if (isUnsupportedAsset) {
      const fallbackImage = getFallbackArtworkUrl(collection);

      return (
        <ArtworkMediaFallback
          artwork={artwork}
          imageUrl={
            fallbackImage
              ? buildFallbackCoverImageUrl(fallbackImage)
              : undefined
          }
        />
      );
    }

    return <ArtworkMediaGeneric artwork={artwork} />;
  };

  return (
    <>
      <Box
        css={{
          background: '$white100',
          boxShadow: pageContext === 'artwork-page' ? '$2' : 'none',
          // related to <ArtworkFooter />
          position: 'relative',
          zIndex: 10,
          transform: 'translate3d(0,0,0)',
          minHeight: '100vh',
        }}
      >
        {getHero()}
        <Body>
          <Grid
            css={{
              backgroundColor: '$white100',
              paddingTop: '$7',
              alignItems: 'flex-start',
              maxWidth: 720,
              marginX: 'auto',
              '@bp4': {
                paddingTop: '$9',
                maxWidth: 'unset',
                gridTemplateColumns: '1fr 1fr',
                gridGap: '$9',
              },
            }}
          >
            <ArtworkHeader
              artwork={liveArtworkData}
              collection={collection}
              creator={creator}
              mintEvent={mintEvent}
              percentSplits={percentSplits}
            />
            <Box>
              <MarketWidgetState
                authorization={authorization}
                currentUserPublicKey={currentUserPublicKey}
                artwork={liveArtworkData}
                mintEvent={mintEvent}
                isLoading={isLiveArtworkLoading}
              />
              <OwnerInfo
                isOwner={isOwner}
                artwork={liveArtworkData}
                artworkPath={artworkPath}
                authorization={authorization}
                isLoading={isLiveArtworkLoading}
              />
            </Box>
          </Grid>
          <Grid
            css={{
              paddingTop: '$7',
              paddingBottom: '$10',
              gridTemplateColumns: '1fr',
              gridGap: '$7',
              maxWidth: 720,
              marginX: 'auto',
              '@bp4': {
                paddingY: '$10',
                maxWidth: 'unset',
                gridTemplateColumns: '1fr 1fr',
                gridGap: '$11',
              },
            }}
          >
            <Box>
              <ArtworkMeta
                description={artwork.description}
                artwork={artwork}
                collection={collection}
                creatorPublicKey={creator?.publicKey}
                currentUserPublicKey={currentUserPublicKey}
                tags={tags}
                artworkAttributes={artworkAttributes}
                totalArtworks={totalArtworks}
              />
              <Flex
                css={{
                  paddingY: '$6',
                  '@bp4': {
                    paddingY: '$8',
                  },
                }}
              >
                <Flex
                  css={{ marginRight: '$4', '@bp0': { marginRight: '$6' } }}
                >
                  <ArtworkPagePopover
                    authorization={authorization}
                    size="regular"
                    artwork={liveArtworkData}
                    currentUserPublicKey={currentUserPublicKey}
                    setIsHovered={noop}
                    options={[
                      {
                        css: { color: '$red100' },
                        enabled: currentUserIsAdmin,
                        icon: <AdminShield />,
                        children: 'Admin Tools',
                        onClick: () => {
                          return setCurrentModal(ModalKey.ADMIN_TOOLS);
                        },
                      },
                      {
                        enabled: true,
                        icon: <NotAllowedIcon />,
                        children: (
                          <span style={{ color: '#F93A3A' }}>Report</span>
                        ),
                        onClick: () => {
                          return setCurrentModal(ModalKey.REPORT);
                        },
                      },
                    ]}
                  />
                </Flex>
                <PopoverShare
                  artwork={artwork}
                  creator={creator}
                  shareType="artwork"
                />
              </Flex>
            </Box>
            <ArtworkProvenance
              artwork={liveArtworkData}
              artworkActivityData={artworkActivityData}
              history={history?.events}
              historyUsersData={historyUsersData.users}
              isLoading={isLoading}
              status={status}
            />
          </Grid>
          {pageContext === 'artwork-page' && (
            <Heading
              size={4}
              css={{
                display: 'none',
                '@bp2': {
                  paddingBottom: '$8',
                  display: 'block',
                },
              }}
            >
              More from this {isSharedCollection ? 'creator' : 'collection'}
            </Heading>
          )}
        </Body>
      </Box>
      {pageContext === 'artwork-page' && (
        <ArtworkFooter
          isSharedCollection={isSharedCollection}
          currentUserPublicKey={currentUserPublicKey}
          artwork={artwork}
          creator={creator}
          collection={collection}
        />
      )}
    </>
  );
}
