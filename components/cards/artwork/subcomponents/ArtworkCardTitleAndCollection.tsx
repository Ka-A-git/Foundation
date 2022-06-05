import { styled } from 'stitches.config';

import Flex from 'components/base/Flex';
import Heading from 'components/base/Heading';
import CollectionTag, {
  CollectionTagCard,
} from 'components/collections/CollectionTag';

import { AlgoliaCollection, AlgoliaUserBasic } from 'types/Algolia';
import { CollectionCardFragment } from 'types/Collection';
import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';

interface ArtworkCardTitleAndCollectionProps {
  name: string;
  collection: CollectionCardFragment | AlgoliaCollection;
  creator: UserFragment | AlgoliaUserBasic;
}

export default function ArtworkCardTitleAndCollection(
  props: ArtworkCardTitleAndCollectionProps
) {
  const { name, collection, creator } = props;

  return (
    <TitleAndCollectionWrapper>
      <CollectionTag
        collection={collection}
        user={creator}
        appearance="transparent"
        size={28}
        fontSize={2}
      />
      <Heading size={3} css={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {name}
      </Heading>
    </TitleAndCollectionWrapper>
  );
}

export const TitleAndCollectionWrapper = styled(Flex, {
  justifyContent: 'space-between',
  flexDirection: 'column',
  opacity: 0,
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  padding: '$5',
  transition: 'opacity $2 $ease',
  background: '$blackT40',
  width: '100%',
  height: '100%',
  color: '$white100',
  [`& ${CollectionTagCard}`]: {
    position: 'relative',
    // Must be above the ArtworkHiddenLink to remain interactive
    zIndex: 2,
  },
});
