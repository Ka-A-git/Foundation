import NextLink from 'next/link';
import { CSS } from 'stitches.config';

import Link from 'components/base/Link';
import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import Heading, { DivHeading } from 'components/base/Heading';
import Image from 'components/base/Image';
import UserTag from 'components/users/UserTag';
import Grid from 'components/base/Grid';

import ContractPill from 'components/collections/ContractPill';
import CollectionCardContainer from './CollectionCardContainer';
import CollectionCardBgImageContainer from './CollectionCardBgImageContainer';
import ModeratedBanner from '../shared/ModeratedBanner';

import { SquareAvatar } from 'components/base/Avatar';

import { isEmptyOrNil } from 'utils/helpers';
import { buildCollectionPath } from 'utils/collections';
import { buildAvatarUrl, buildCollectionCardUrl } from 'utils/assets';

import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';
import { CollectionCardFragment } from 'types/Collection';
import { abbreviateValue } from 'utils/formatters';
import { pluralizeWord } from 'utils/strings';
import { isFlaggedForModeration } from 'utils/moderation';

const AVATAR_SIZE = 90;

interface CollectionCardProps {
  css?: CSS;
  enableZoomOnHover?: boolean;
  collection: CollectionCardFragment;
  artworkCount?: number;
  creator: Pick<
    UserFragment,
    'name' | 'username' | 'publicKey' | 'profileImageUrl' | 'coverImageUrl'
  >;
}

export default function CollectionCard(
  props: CollectionCardProps
): JSX.Element {
  const {
    collection,
    creator,
    enableZoomOnHover = true,
    css,
    artworkCount,
  } = props;

  const isEmptyState = isEmptyOrNil(collection.coverImageUrl);

  const coverImageUrl = buildCollectionCardUrl(collection.coverImageUrl);

  const collectionImageUrl = buildAvatarUrl(
    AVATAR_SIZE,
    collection.collectionImageUrl
  );

  const hasArtworks = artworkCount > 0;

  const isModerated = isFlaggedForModeration(collection?.moderationStatus);

  return (
    <CollectionCardContainer enableZoomOnHover={enableZoomOnHover} css={css}>
      {isModerated && <ModeratedBanner status={collection?.moderationStatus} />}
      <CollectionCardBgImageContainer
        metallic={isEmptyState}
        shimmer={isEmptyState}
      >
        {coverImageUrl && (
          <Image
            alt={collection.name}
            src={coverImageUrl}
            css={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
              transition: 'transform $2 $ease',
            }}
          />
        )}
      </CollectionCardBgImageContainer>

      <NextLink
        href={buildCollectionPath(collection)}
        passHref
        prefetch={false}
      >
        <Link
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
          }}
        />
      </NextLink>
      <Flex>
        {collectionImageUrl && (
          <SquareAvatar
            imageUrl={collectionImageUrl}
            alt={collection.name}
            appearance="frosted"
            shape={1}
            stroke={2}
            size={AVATAR_SIZE}
          />
        )}
        <Box css={{ marginLeft: 'auto', position: 'relative' }}>
          <ContractPill frosted={!isEmptyState} contract={collection.symbol} />
        </Box>
      </Flex>
      <Flex css={{ marginTop: 'auto', flexDirection: 'column' }}>
        <Grid css={{ gap: '$4', marginBottom: '$6' }}>
          <Heading
            size={4}
            css={{
              color: isEmptyState ? '$black100' : '$white100',
              wordBreak: 'break-word',
              lineHeight: 1,
            }}
          >
            {collection.name}
          </Heading>
          {hasArtworks && (
            <DivHeading
              size={2}
              css={{
                opacity: 0.6,
                color: '$white100',
              }}
            >
              {abbreviateValue(artworkCount)}{' '}
              {pluralizeWord('NFT', artworkCount)}
            </DivHeading>
          )}
        </Grid>

        <Flex>
          <Box css={{ position: 'relative', zIndex: 2 }}>
            <UserTag
              appearance={isEmptyState ? 'normal' : 'frosted'}
              hoverable={false}
              disablePopover
              user={creator}
            />
          </Box>
        </Flex>
      </Flex>
    </CollectionCardContainer>
  );
}
