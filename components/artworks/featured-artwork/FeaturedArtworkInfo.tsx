import Flex from 'components/base/Flex';
import UserTag from 'components/users/UserTag';
import {
  ArtworkInfoBlock,
  ArtworkInfoContainer,
  ArtworkInfoHeading,
} from '../ArtworkInfo';
import CollectionTag from 'components/collections/CollectionTag';

import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';
import { CollectionCardFragment } from 'types/Collection';
import { HandleSegmentEventFn } from './types';

interface FeaturedArtworkInfoProps {
  user: UserFragment;
  collection: CollectionCardFragment;
  handleSegmentEvent: HandleSegmentEventFn;
}

export default function FeaturedArtworkInfo(
  props: FeaturedArtworkInfoProps
): JSX.Element {
  const { user, collection, handleSegmentEvent } = props;

  return (
    <ArtworkInfoContainer>
      <ArtworkInfoBlock onClick={() => handleSegmentEvent('created_by_pill')}>
        <ArtworkInfoHeading spacing="large">Created by</ArtworkInfoHeading>
        <Flex css={{ marginY: 'auto' }}>
          <UserTag user={user} />
        </Flex>
      </ArtworkInfoBlock>
      <ArtworkInfoBlock>
        <ArtworkInfoHeading spacing="large">Collection</ArtworkInfoHeading>
        <CollectionTag
          user={user}
          collection={collection}
          appearance="normal"
          size={28}
          fontSize={2}
        />
      </ArtworkInfoBlock>
    </ArtworkInfoContainer>
  );
}
