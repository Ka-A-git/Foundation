import Box from 'components/base/Box';
import UserTag from 'components/users/UserTag';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import SplitsIcon from 'assets/icons/split-icon.svg';

import { AlgoliaArtwork } from 'types/Algolia';

interface ArtworkCardCreatorProps {
  artwork: ArtworkFragmentExtended | AlgoliaArtwork;
  hasSplits?: boolean;
  color: 'dark' | 'light';
}

export default function ArtworkCardCreator(
  props: ArtworkCardCreatorProps
): JSX.Element {
  const { artwork, hasSplits = false, color } = props;

  const creator = artwork?.creator;

  return (
    <Box
      css={{
        width: 'fit-content',
        alignSelf: 'flex-start',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <UserTag
        user={creator}
        appearance="plain"
        avatarSize={28}
        css={{
          color: color === 'dark' ? '$black30' : '$black60',
          '@hover': {
            '&:hover': {
              color: color === 'dark' ? '$white100' : '$black100',
            },
          },
        }}
        hoverable={false}
      />
      {hasSplits && (
        <SplitsIcon
          style={{
            background: '#000',
            color: '#fff',
            padding: 4,
            borderRadius: '100%',
            height: 16,
            position: 'absolute',
            left: -4,
            bottom: 0,
          }}
        />
      )}
    </Box>
  );
}
