import NextLink from 'next/link';
import { VariantProps } from '@stitches/react';
import { styled } from 'stitches.config';

import { SquareAvatar } from 'components/base/Avatar';
import Mono from 'components/base/Mono';
import Text from 'components/base/Text';
import Heading from 'components/base/Heading';
import Card from 'components/base/Card';
import CollectionPopover from './CollectionPopover';
import Link from 'components/base/Link';

import { buildCollectionPath } from 'utils/collections';
import { buildAvatarUrl } from 'utils/assets';
import { truncateStringCenter } from 'utils/helpers';

import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';
import { CollectionCardFragment } from 'types/Collection';
import { AlgoliaUserBasic } from 'types/Algolia';

interface CollectionTagProps {
  user: UserFragment | AlgoliaUserBasic;
  collection: CollectionCardFragment;
  appearance?: VariantProps<typeof CollectionTagCard>['appearance'];
  size?: number;
  fontSize?: VariantProps<typeof Text>['size'];
}

export default function CollectionTag(props: CollectionTagProps): JSX.Element {
  const {
    user,
    collection,
    appearance = 'transparent',
    size = 28,
    fontSize = 1,
  } = props;

  if (!collection) {
    return null;
  }

  const collectionImageUrl = buildAvatarUrl(
    size,
    collection.collectionImageUrl
  );

  return (
    <CollectionPopover collection={collection} user={user}>
      <NextLink
        href={buildCollectionPath(collection)}
        passHref
        prefetch={false}
      >
        <CollectionTagCard
          appearance={appearance}
          css={{
            width: 'fit-content',
            height: 48,
            paddingLeft: collectionImageUrl ? 10 : '$4',
          }}
        >
          {collectionImageUrl && (
            <SquareAvatar
              imageUrl={collectionImageUrl}
              appearance="gray"
              alt={collection.name}
              size={size}
              shape={1}
            />
          )}
          {collection.name ? (
            <Heading
              size={fontSize}
              css={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                paddingLeft: collectionImageUrl ? '$3' : 0,
                transition: 'color $1 $ease',
              }}
            >
              {collection.name}
            </Heading>
          ) : (
            <Mono size={1}>
              {truncateStringCenter(4, collection.contractAddress)}
            </Mono>
          )}
        </CollectionTagCard>
      </NextLink>
    </CollectionPopover>
  );
}

export const CollectionTagCard = styled(Link, Card, {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: 'inherit',
  textDecoration: 'none',
  alignSelf: 'flex-start',
  maxWidth: 300,
  variants: {
    appearance: {
      transparent: {
        background: 'transparent',
        boxShadow: 'none',
        color: '$white100',
        '@hover': {
          '&:hover': {
            color: '$black20',
          },
        },
      },
      normal: {
        paddingX: '$4',
        background: '$white100',
        color: '$black100',
        boxShadow: '$0',
        borderRadius: '$2',
        transition: 'box-shadow $1 ease, transform $1 $ease',
        willChange: 'transform',
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '$1',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '$0',
          },
        },
      },
    },
  },
});
