import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import ManageMenu from 'components/market-widget/ManageMenu';
import UserTag from 'components/users/UserTag';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';
import { Authorization } from 'utils/artwork/artwork';

interface OwnerInfoProps {
  artworkPath: string;
  authorization: Authorization;
  artwork: ArtworkFragmentExtended;
  isOwner: boolean;
  isLoading: boolean;
}

export default function OwnerInfo(props: OwnerInfoProps) {
  const { artworkPath, authorization, artwork, isOwner, isLoading } = props;

  if (isLoading) {
    return null;
  }

  return (
    <Flex center css={{ paddingTop: '$4' }}>
      {isOwner ? (
        <ManageMenu
          artworkPath={artworkPath}
          authorization={authorization}
          artwork={artwork}
        />
      ) : (
        <>
          <Text
            weight="semibold"
            css={{ color: '$black100', paddingRight: '$1' }}
          >
            Owned by
          </Text>
          <UserTag avatarSize={24} user={artwork.owner} />
        </>
      )}
    </Flex>
  );
}
