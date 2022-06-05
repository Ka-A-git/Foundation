import { isNil } from 'ramda';
import { GetStaticPathsResult } from 'next';
import { useAccount } from 'wagmi';

import Flex from 'components/base/Flex';
import Page from 'components/Page';
import ArtworkPage from 'components/artworks/ArtworkPage';
import GenericError from 'components/GenericError';
import AdminToolsModal from 'components/modals/AdminToolsModal';
import ModerationBanner from 'components/admin/ModerationBanner';
import ReportModal from 'components/modals/ReportModal';

import ArtworkWarningPageBlock from 'components/trust-safety/ArtworkWarningPageBlock';
import ProfileWarningBlock from 'components/trust-safety/ProfileWarningBlock';

import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import useAddUsernamePrefix from 'hooks/use-add-username-prefix';
import useReferral from 'hooks/web3/use-referral';

import { buildPageShareUrl, buildPosterUrl, isModel } from 'utils/assets';
import { getFirstValue, truncateMetaDescription } from 'utils/helpers';
import { isFlaggedForModeration } from 'utils/moderation';
import { maybeToString } from 'utils/strings';
import { areKeysEqual } from 'utils/users';

import {
  ArtworkPageArgs,
  ArtworkPageData,
  getArtworkPageProps,
} from 'queries/server/artwork-page';

import { PageColorMode } from 'types/page';
import { isUnsupportedArtworkAsset } from 'utils/artwork/artwork';

export default function ArtworkIndexPage(props: ArtworkPageData): JSX.Element {
  const { artwork, artworkAttributes, totalArtworks } = props;

  // If the username is missing the @ prefix add it into the url
  useAddUsernamePrefix();

  // Check to see if ref query param is set and create cookie
  useReferral({ contractAddress: artwork?.contractAddress });

  const [{ data: user, loading: isCurrentUserLoading }] = useAccount();

  const tokenId = artwork?.tokenId;

  const { data: currentUserData } = useUserByPublicKey(
    { publicKey: user?.address },
    { refetchOnWindowFocus: false }
  );

  const currentUserIsAdmin = currentUserData?.user?.isAdmin;
  const currentUserIsOwner = areKeysEqual([
    artwork.ownerPublicKey,
    user?.address,
  ]);

  const noArtwork = isNil(artwork);

  if (noArtwork) {
    return <GenericError />;
  }

  const { name, description, tags } = artwork;

  const openGraphAsset = buildPageShareUrl(artwork);
  const posterUrl: string = buildPosterUrl(artwork, { bg: 'F2F2F2' });

  const truncatedDescription = truncateMetaDescription(description);

  const creatorModerationStatus = artwork?.creator?.moderationStatus;
  const isCreatorModerated = isFlaggedForModeration(creatorModerationStatus);

  if (isCreatorModerated && !(currentUserIsAdmin || currentUserIsOwner)) {
    return <ProfileWarningBlock moderationStatus={creatorModerationStatus} />;
  }

  const artworkModerationStatus = artwork?.moderationStatus;
  const isArtworkModerated = isFlaggedForModeration(artworkModerationStatus);

  if (isArtworkModerated && !(currentUserIsAdmin || currentUserIsOwner)) {
    return <ArtworkWarningPageBlock artwork={artwork} />;
  }

  const isUnsupportedAsset = isUnsupportedArtworkAsset(artwork);
  const mintEvent = getFirstValue(artwork.mintEvent);

  const headerMode =
    isUnsupportedAsset && !isModel(artwork.assetPath)
      ? PageColorMode.dark
      : PageColorMode.light;

  return (
    <>
      {isArtworkModerated && (currentUserIsAdmin || currentUserIsOwner) && (
        <ModerationBanner
          status={artworkModerationStatus}
          reviewText="This NFT is under review."
          suspendedText="This NFT has been removed."
          takedownText={`This NFT has received a DMCA takedown notice from ${artwork.moderationFrom}.`}
        />
      )}

      {/* checking we have tokenId (as in preview mode it’s not present) */}
      {Boolean(currentUserIsAdmin && tokenId) && (
        <AdminToolsModal
          publicKey={artwork?.creator?.publicKey}
          moderationStatus={artworkModerationStatus}
          moderationFrom={artwork?.moderationFrom}
          entityId={artwork?.id}
          tokenId={maybeToString(tokenId)}
          context="artwork"
        />
      )}

      {tokenId && (
        <ReportModal
          publicKey={user?.address}
          reportedPublicKey={artwork?.publicKey}
          pageType="Artwork"
        />
      )}

      <Flex
        css={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          position: 'relative',
        }}
      >
        <Page
          title={name}
          description={truncatedDescription}
          headerMode={headerMode}
          image={posterUrl ?? openGraphAsset}
          absolute
          footerCss={{ display: 'none' }}
        >
          <ArtworkPage
            key={artwork.id}
            artwork={artwork}
            tags={tags}
            isCurrentUserLoading={isCurrentUserLoading}
            isUnsupportedAsset={isUnsupportedAsset}
            mintEvent={mintEvent}
            percentSplits={artwork.splits}
            currentUserPublicKey={user?.address}
            collection={artwork.collection}
            currentUserIsAdmin={currentUserIsAdmin}
            pageContext="artwork-page"
            artworkAttributes={artworkAttributes}
            totalArtworks={totalArtworks}
          />
        </Page>
      </Flex>
    </>
  );
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<ArtworkPageArgs>
> {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps = getArtworkPageProps;
