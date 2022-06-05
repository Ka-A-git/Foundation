import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import UserTag from 'components/users/UserTag';
import CollectionTag from 'components/collections/CollectionTag';
import ArtworkSplits from './ArtworkSplits';

import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';
import { CollectionCardFragment } from 'types/Collection';

import { ArtworkPageSplitRecipient } from 'queries/server/artwork-page';

import { styled } from 'stitches.config';

import { notEmptyOrNil } from 'utils/helpers';

interface ArtworkInfoProps {
  creator: UserFragment;
  collection: CollectionCardFragment;
  percentSplits: ArtworkPageSplitRecipient[];
  creatorPublicKey: string;
}

export default function ArtworkInfo(props: ArtworkInfoProps): JSX.Element {
  const { creator, collection, percentSplits, creatorPublicKey } = props;

  const hasSplits = notEmptyOrNil(percentSplits);

  return (
    <ArtworkInfoContainer>
      {/* when it’s the only block pass no order variant */}
      <ArtworkInfoBlock>
        <ArtworkInfoHeading spacing="large">Created by</ArtworkInfoHeading>
        <Flex>
          <UserTag user={creator} />
        </Flex>
      </ArtworkInfoBlock>
      {hasSplits && (
        <ArtworkInfoBlock>
          <ArtworkInfoHeading spacing="large">Split with</ArtworkInfoHeading>
          <ArtworkSplits
            creatorPublicKey={creatorPublicKey}
            percentSplits={percentSplits}
          />
        </ArtworkInfoBlock>
      )}
      <ArtworkInfoBlock>
        <ArtworkInfoHeading spacing="large">Collection</ArtworkInfoHeading>
        <CollectionTag
          user={creator}
          collection={collection}
          appearance="normal"
          size={28}
          fontSize={2}
        />
      </ArtworkInfoBlock>
    </ArtworkInfoContainer>
  );
}

export const ArtworkInfoHeading = styled(Text, {
  color: '$black60',
  fontWeight: '$semibold',

  variants: {
    spacing: {
      regular: {
        marginBottom: '$1',
      },
      large: {
        marginBottom: '$3',
      },
    },
  },
});

export const ArtworkInfoBlock = styled(Flex, {
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const ArtworkInfoContainer = styled(Flex, {
  flexDirection: 'column',

  '@bp0': {
    flexDirection: 'row',
  },
  [`> ${ArtworkInfoBlock}:not(:last-of-type)`]: {
    paddingBottom: '$6',
    '@bp0': {
      paddingRight: '$6',
      paddingBottom: 0,
      marginRight: '$6',
      borderRight: '1px solid $black5',
    },
  },
});
