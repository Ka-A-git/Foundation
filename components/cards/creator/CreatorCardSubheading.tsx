import Flex from 'components/base/Flex';
import Text from 'components/base/Text';

import Account from 'types/Account';

import { getUsernameOrAddressInfo } from 'utils/helpers';

interface CreatorCardSubheadingProps {
  user: Account;
}

export default function CreatorCardSubheading(
  props: CreatorCardSubheadingProps
): JSX.Element {
  const { user } = props;

  const { isAddress, usernameOrAddress, hasName } =
    getUsernameOrAddressInfo(user);

  if (isAddress || !hasName) {
    return null;
  }

  return (
    <Flex css={{ minWidth: 0 }}>
      <Text
        size={3}
        color="rainbow"
        weight="semibold"
        css={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {usernameOrAddress}
      </Text>
    </Flex>
  );
}
