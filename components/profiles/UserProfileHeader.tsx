import Flex from 'components/base/Flex';
import GradientUsername from './GradientUsername';
import Heading from 'components/base/Heading';

import { getUsernameOrAddressInfo } from 'utils/helpers';

import Account from 'types/Account';

interface UserProfileHeaderProps {
  user: Account;
}

export default function UserProfileHeader(
  props: UserProfileHeaderProps
): JSX.Element {
  const { user } = props;

  const { usernameOrAddress, hasUsername, nameOrUsername, hasName } =
    getUsernameOrAddressInfo(user);

  return (
    <Flex
      css={{
        minWidth: 0,
        alignItems: 'center',
        flexDirection: 'column',
        '@bp1': {
          alignItems: 'flex-start',
        },
      }}
    >
      {hasName && (
        <Heading
          leading="tight"
          size={{ '@initial': 3, '@bp1': 4 }}
          css={{
            marginBottom: '$1',
            overflow: 'hidden',
            wordBreak: 'break-word',
            textOverflow: 'ellipsis',
            textAlign: 'center',
            '@bp1': { textAlign: 'left' },
          }}
        >
          {nameOrUsername}
        </Heading>
      )}
      {hasUsername && <GradientUsername>{usernameOrAddress}</GradientUsername>}
    </Flex>
  );
}
