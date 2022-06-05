import Box from 'components/base/Box';
import UserTag from 'components/users/UserTag';

import { UserLight } from 'types/Account';

interface ArtworkCardOwnerProps {
  owner: UserLight;
}

export default function ArtworkCardOwner(
  props: ArtworkCardOwnerProps
): JSX.Element {
  const { owner } = props;

  return (
    <Box
      css={{
        position: 'relative',
        zIndex: 2,
        paddingY: 1,
        marginLeft: 'auto',
      }}
    >
      <UserTag
        user={owner}
        hoverable={false}
        appearance="plain"
        avatarSize={20}
        css={{
          color: '$black60',
          '@hover': {
            '&:hover': {
              color: '$black100',
            },
          },
        }}
      />
    </Box>
  );
}
