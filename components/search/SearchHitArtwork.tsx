import Grid from 'components/base/Grid';

import SearchResultHeading from './search-result/SearchResultHeading';
import SearchResultSubheading from './search-result/SearchResultSubheading';
import SearchResultLink from './search-result/SearchResultLink';
import Link from 'components/links/Link';
import { SquareAvatar } from 'components/base/Avatar';

import { ArtworkAssetFields } from 'types/Artwork';
import type { AlgoliaArtwork } from 'types/Algolia';
import type Account from 'types/Account';

import { getUsernameOrTruncatedAddress, hasUsername } from 'utils/helpers';
import { buildAssetStaticImage, FALLBACK_IMAGE_IMGIX_BLUR } from 'utils/assets';
import {
  buildArtworkPath,
  isUnsupportedArtworkAsset,
} from 'utils/artwork/artwork';

interface SearchHitArtworkProps {
  hit: AlgoliaArtwork;
  onClick: (arg0: AlgoliaArtwork) => void;
}

type SearchHitAssetFields = ArtworkAssetFields & {
  collection: {
    slug: string;
  };
};

export default function SearchHitArtwork(
  props: SearchHitArtworkProps
): JSX.Element {
  const { hit, onClick } = props;

  const user: Pick<Account, 'publicKey' | 'username'> = {
    publicKey: hit.creator.publicKey,
    username: hit.creator.username,
  };

  const usernameOrTruncatedAddress = getUsernameOrTruncatedAddress(user);
  const userHasUsername = hasUsername(user);

  const asset: SearchHitAssetFields = {
    id: hit.id,
    tokenId: hit.tokenId,
    name: hit.name,
    assetIPFSPath: hit.assetIPFSPath,
    // TODO: check this comes from algolia + get dynamically if possible
    assetVersion: hit.assetVersion || 3,
    assetScheme: hit.assetScheme,
    assetHost: hit.assetHost,
    assetPath: hit.assetPath,
    assetId: hit.assetId,
    assetStatus: hit.assetStatus,
    mimeType: hit.mimeType,
    collection: { slug: hit.collection.slug },
  };

  const creator: Pick<Account, 'publicKey' | 'username'> = {
    publicKey: hit.creator.publicKey,
    username: hit.creator.username,
  };

  const isUnsupportedAsset = isUnsupportedArtworkAsset(asset);

  const assetPreviewUrl = buildAssetStaticImage(
    {
      w: 128,
      fm: 'jpg',
      auto: 'format,compress',
      blur: isUnsupportedAsset ? FALLBACK_IMAGE_IMGIX_BLUR : undefined,
    },
    asset
  );

  return (
    <Link href={buildArtworkPath({ artwork: asset, user: creator })}>
      <SearchResultLink as="a" onClick={() => onClick(hit)}>
        <SquareAvatar
          imageUrl={assetPreviewUrl}
          css={{
            background: isUnsupportedAsset ? '$black100' : undefined,
            marginRight: '$4',
          }}
          size={48}
          shape={1}
        />
        <Grid css={{ alignItems: 'center', gap: '$1' }}>
          <SearchResultHeading size={{ '@bp3': 2 }}>
            {hit.name}
          </SearchResultHeading>
          <SearchResultSubheading isMono={!userHasUsername}>
            {usernameOrTruncatedAddress}
          </SearchResultSubheading>
        </Grid>
      </SearchResultLink>
    </Link>
  );
}
