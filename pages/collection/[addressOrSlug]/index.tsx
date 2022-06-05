import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { cond } from 'ramda';
import { useAccount } from 'wagmi';

import Page from 'components/Page';
import Body from 'components/base/Body';
import Flex from 'components/base/Flex';
import Box from 'components/base/Box';
import CollectionLogo from 'components/collections/CollectionLogo';
import CollectionMintButton from 'components/collections/CollectionMintButton';
import ContractPill from 'components/collections/ContractPill';
import CollectionHeroContainer from 'components/collections/CollectionHeroContainer';
import CollectionArtworks from 'components/collections/CollectionArtworks';
import CollectionTitle from 'components/collections/CollectionTitle';
import EditCollectionModal from 'components/modals/EditCollectionModal';
import CollectionOwnersModal from 'components/modals/CollectionOwnersModal';
import CollectionNotAdded from 'components/collections/CollectionNotAdded';
import CollectionAdminPopover from 'components/collections/CollectionAdminPopover';
import CollectionWarningBlock from 'components/trust-safety/CollectionWarningBlock';
import EditCollectionButton from 'components/collections/EditCollectionButton';
import UserTag from 'components/users/UserTag';
import ReportModal from 'components/modals/ReportModal';
import AdminToolsModal from 'components/modals/AdminToolsModal';
import ModerationBanner from 'components/admin/ModerationBanner';
import MarkdownText from 'components/base/MarkdownText';
import CollectionSalesHistory from 'components/collections/CollectionSalesHistory';
import { TabsWithLinks } from 'components/tabs/Tabs';

import { buildEtherscanLink } from 'lib/etherscanAddresses';

import { PageColorMode } from 'types/page';
import { ModalKey } from 'types/modal';

import { CollectionFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';
import { CollectionStats } from 'graphql/hasura/queries/collection-stats.generated';
import { useCollectionArtworkCounts } from 'graphql/hasura/queries/collection-artwork-counts.generated';

import useCollectionByContractSlug from 'hooks/queries/hasura/collections/use-collection-by-contract-slug';
import useModal from 'hooks/use-modal';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import useCollectionTabs, {
  CollectionTab,
  CollectionTabValue,
  isTabActive,
} from 'hooks/use-collection-tabs';
import useCanSelfDestructCollection from 'hooks/web3/use-can-self-destruct-collection';
import useReferral from 'hooks/web3/use-referral';

import {
  getCollectionByContractSlug,
  getCollectionStats,
} from 'queries/hasura/collections';

import { isAllTrue, isAnyTrue, isEmptyOrNil } from 'utils/helpers';
import { buildAvatarUrl, buildCoverImageUrl } from 'utils/assets';
import { areKeysEqual } from 'utils/users';
import { buildCollectionPath, isSharedContract } from 'utils/collections';
import { isFlaggedForModeration } from 'utils/moderation';

interface PageProps {
  collection: CollectionFragmentExtended;
  collectionStats: CollectionStats;
}

export default function CollectionPage(props: PageProps) {
  const { collection: initialCollectionData, collectionStats } = props;

  const { setCurrentModal } = useModal();
  const [{ data: currentUser }] = useAccount();

  const contractSlug = initialCollectionData?.slug;

  const { data: userData, isLoading: isUserDataLoading } = useUserByPublicKey(
    { publicKey: currentUser?.address },
    { refetchOnWindowFocus: false }
  );

  const currentUserIsAdmin = userData?.user?.isAdmin;

  const indexedStates = currentUserIsAdmin ? [true, false] : [true];

  const { data: collection } = useCollectionByContractSlug(
    { contractSlug: contractSlug, indexedStates },
    {
      refetchOnWindowFocus: false,
      initialData: { collections: [initialCollectionData] },
    }
  );

  // Check to see if ref query param is set and create cookie
  useReferral({ contractAddress: collection?.contractAddress });

  const { currentTab, tabs: visibleTabs } = useCollectionTabs({
    collection,
  });

  const emptyState = isEmptyOrNil(collection?.coverImageUrl);
  const colorState = emptyState ? 'dark' : 'light';

  const { data: artworkCounts } = useCollectionArtworkCounts(
    { contractSlug },
    { refetchOnWindowFocus: false, enabled: Boolean(contractSlug) }
  );

  const coverImageUrl = buildCoverImageUrl(collection?.coverImageUrl);

  const isCurrentUsersCollection = areKeysEqual([
    collection?.creatorAddress,
    currentUser?.address,
  ]);

  const isAdminOrCurrentUserOwner = isAnyTrue([
    isCurrentUsersCollection,
    currentUserIsAdmin,
  ]);

  const artworksTotalCount =
    artworkCounts?.artworksTotalCount?.aggregate?.count;

  const { isSuccess: isCanBurnSuccess } = useCanSelfDestructCollection(
    initialCollectionData?.contractAddress,
    {
      enabled: isAllTrue([
        initialCollectionData?.contractAddress,
        isCurrentUsersCollection,
        artworksTotalCount === 0,
      ]),
    }
  );

  if (!collection) {
    return (
      <CollectionNotAdded
        isCurrentUserAdmin={currentUserIsAdmin}
        isLoading={isUserDataLoading}
      />
    );
  }

  const unstyledCollection =
    !collection.coverImageUrl ||
    !collection.collectionImageUrl ||
    !collection.name;

  const isEmptyCollection = artworksTotalCount === 0;

  const collectionPath = buildCollectionPath(collection);

  const collectionModerationStatus = collection?.moderationStatus;
  const isCollectionModerated = isFlaggedForModeration(
    collectionModerationStatus
  );

  const isSharedCollection = isSharedContract(collection?.contractAddress);

  if (isCollectionModerated && !currentUserIsAdmin) {
    return <CollectionWarningBlock collection={collection} />;
  }

  const reviewText = isCurrentUsersCollection
    ? 'Your collection is under review.'
    : 'This collection is under review.';

  const suspendedText = isCurrentUsersCollection
    ? 'Your collection has been removed.'
    : 'This collection has been removed.';

  return (
    <>
      {isCollectionModerated && isAdminOrCurrentUserOwner && (
        <ModerationBanner
          status={collectionModerationStatus}
          reviewText={reviewText}
          suspendedText={suspendedText}
          takedownText=""
        />
      )}
      {currentUserIsAdmin && (
        <AdminToolsModal
          publicKey={currentUser?.address}
          entityId={collection.id}
          context="collection"
          moderationStatus={collectionModerationStatus}
          moderationFrom=""
        />
      )}
      {/* TODO: do we put this at the top scope or is better
        coupled with the component that triggers it? */}
      <CollectionOwnersModal contractSlug={collection.slug} />
      <EditCollectionModal contractAddress={collection.contractAddress} />
      <ReportModal
        publicKey={currentUser?.address}
        reportedPublicKey={collection.creatorAddress}
        pageType="Collection"
      />
      <Page
        headerMode={collection.coverImageUrl && PageColorMode.dark}
        image={coverImageUrl}
        title={collection.name}
        description={collection.description}
        absolute
      >
        <CollectionHeroContainer
          contractSlug={contractSlug}
          coverImage={coverImageUrl}
          collectionStats={collectionStats}
          collection={collection}
          creator={collection?.creator}
          currentUser={userData?.user}
          isOwner={isCurrentUsersCollection}
          isAdminOrCurrentUserOwner={isAdminOrCurrentUserOwner}
          canBurnCollection={isCanBurnSuccess}
        >
          <Flex
            css={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              paddingY: '$10',
              '@bp2': {
                paddingY: 0,
                flexDirection: 'row',
                alignItems: 'flex-end',
                textAlign: 'left',
              },
            }}
          >
            <Flex
              css={{
                flexDirection: 'column',
                alignItems: 'center',
                '@bp2': { alignItems: 'flex-start' },
              }}
            >
              {collection.collectionImageUrl && (
                <CollectionLogo
                  alt={collection.name}
                  stroke={{ '@initial': 2, '@bp4': 3 }}
                  css={{
                    width: 100,
                    height: 100,
                    '@bp1': {
                      width: 160,
                      height: 160,
                    },
                  }}
                  imageUrl={buildAvatarUrl(160, collection.collectionImageUrl)}
                />
              )}
              <Box
                css={{
                  marginTop: '$6',
                  marginBottom: '$7',
                  '@bp2': {
                    marginTop: '$8',
                    marginBottom: '$7',
                  },
                }}
              >
                <ContractPill
                  frosted={!emptyState}
                  contract={collection.symbol}
                  href={buildEtherscanLink(
                    `/address/${collection.contractAddress}`
                  )}
                />
              </Box>
              <CollectionTitle
                color={colorState}
                css={{ marginBottom: '$7' }}
                size={{ '@bpxs': 4, '@initial': 5, '@bp2': 8 }}
              >
                {collection.name}
              </CollectionTitle>
              <Flex>
                {collection.creator && !isSharedCollection && (
                  <Box css={{ marginRight: '$4' }}>
                    <UserTag
                      appearance={colorState === 'dark' ? 'normal' : 'frosted'}
                      user={collection.creator}
                    />
                  </Box>
                )}
                {isAdminOrCurrentUserOwner && (
                  <EditCollectionButton
                    color={colorState === 'dark' ? 'white' : 'black'}
                    openModal={() => setCurrentModal(ModalKey.EDIT_COLLECTION)}
                  >
                    Edit Collection
                  </EditCollectionButton>
                )}
              </Flex>
            </Flex>
          </Flex>
        </CollectionHeroContainer>
        <Body
          css={{
            overflowX: 'hidden',
            paddingTop: '$11',
          }}
        >
          {isCurrentUsersCollection && (
            <CollectionMintButton collection={collection} />
          )}

          <Flex
            css={{
              justifyContent: 'flex-end',
              marginBottom: '$3',
              display: 'flex',
              '@bp1': {
                display: 'none',
              },
            }}
          >
            <CollectionAdminPopover
              currentUserIsAdmin={userData?.user?.isAdmin}
              isOwner={isCurrentUsersCollection}
              collectionPath={collectionPath}
              canBurnCollection={isCanBurnSuccess}
            />
          </Flex>

          <TabsWithLinks<CollectionTab> tabs={visibleTabs} isScrollable />

          {cond<CollectionTabValue, JSX.Element>([
            [
              (tab) => isTabActive(tab, 'Artworks'),
              () => (
                <CollectionArtworks
                  contractAddress={collection.contractAddress}
                  isOwnerOnCollection={isCurrentUsersCollection}
                  isOwnerOrAdmin={isAdminOrCurrentUserOwner}
                  unstyledCollection={unstyledCollection}
                  isEmptyCollection={isEmptyCollection}
                />
              ),
            ],
            [
              (tab) => isTabActive(tab, 'Description'),
              () => (
                <Box
                  css={{
                    maxWidth: 640,
                    minHeight: 400,
                    paddingY: '$1',
                    '@bp1': { paddingY: '$8', minHeight: 600 },
                  }}
                >
                  <MarkdownText
                    css={{
                      lineHeight: 1.5,
                      fontSize: '$2',
                      '@bp0': {
                        fontSize: '$3',
                      },
                    }}
                  >
                    {collection.description}
                  </MarkdownText>
                </Box>
              ),
            ],
            [
              (tab) => isTabActive(tab, 'Activity'),
              () => (
                <CollectionSalesHistory
                  contractAddress={initialCollectionData?.contractAddress}
                />
              ),
            ],
          ])(currentTab)}
        </Body>
      </Page>
    </>
  );
}

type PageParams = {
  addressOrSlug: string;
};

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<PageParams>
> {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<PageProps>
> {
  const [collection, collectionStats] = await Promise.all([
    getCollectionByContractSlug({
      contractSlug: params.addressOrSlug,
      indexedStates: [true, false],
    }),
    getCollectionStats({
      contractSlug: params.addressOrSlug,
      indexedStates: [true],
    }),
  ]);

  return {
    props: {
      collection: collection ?? null,
      collectionStats: collectionStats ?? null,
    },
    // 1 hour
    revalidate: 3600,
  };
}
