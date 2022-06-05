import { SquareAvatar } from 'components/base/Avatar';
import Flex from 'components/base/Flex';
import Grid from 'components/base/Grid';
import Heading from 'components/base/Heading';
import Mono from 'components/base/Mono';

import { buildAvatarUrl } from 'utils/assets';
import { truncateStringCenter } from 'utils/helpers';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

interface SelectedCollectionProps {
  collection: ArtworkFragmentExtended['collection'];
}

export default function SelectedCollection(props: SelectedCollectionProps) {
  const { collection } = props;
  const AVATAR_SIZE = 76;

  const collectionImageUrl = buildAvatarUrl(
    AVATAR_SIZE,
    collection.collectionImageUrl
  );

  return (
    <Flex
      css={{
        paddingX: '$3',
        alignItems: 'center',
        gap: '$6',
        textDecoration: 'none',
        color: '$black100',
        height: 96,
        borderRadius: '$2',
        backgroundColor: '$black5',
      }}
    >
      {collectionImageUrl && (
        <SquareAvatar
          imageUrl={collectionImageUrl}
          alt={collection.name}
          size={AVATAR_SIZE}
          shape={1}
        />
      )}
      <Grid css={{ gap: '$2' }}>
        {collection.name ? (
          <Heading size={2} css={{ lineHeight: 1.3 }}>
            {collection.name}
          </Heading>
        ) : (
          <Mono size={1}>
            {truncateStringCenter(4, collection.contractAddress)}
          </Mono>
        )}
        {collection.symbol && <Mono size={0}>{collection.symbol}</Mono>}
      </Grid>
    </Flex>
  );
}
