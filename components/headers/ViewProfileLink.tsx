import { styled } from 'stitches.config';
import NextLink from 'next/link';

import Account from 'types/Account';

import RightChevron from 'assets/icons/right-chevron.svg';

import CircleAvatar from 'components/avatars/CircleAvatar';
import Text from 'components/base/Text';
import Flex from 'components/base/Flex';
import Box from 'components/base/Box';
import Heading from 'components/base/Heading';

import { getUsernameOrAddress } from 'utils/helpers';

interface ViewProfileLinkProps {
  avatarUrl?: string;
  className?: string;
  user: Pick<Account, 'publicKey' | 'username'>;
}

export default function ViewProfileLink(
  props: ViewProfileLinkProps
): JSX.Element {
  const { avatarUrl, user } = props;

  const profileHref = `/${getUsernameOrAddress(user)}`;
  const hasUsername = Boolean(user?.username);

  return (
    <NextLink href={profileHref} passHref>
      <Link>
        <Flex css={{ alignItems: 'center' }}>
          <Flex className="label" css={{ alignItems: 'center' }}>
            <Box css={{ minWidth: 42 }}>
              <CircleAvatar
                maxSize={42}
                css={{ width: 42, height: 42 }}
                publicKey={user?.publicKey}
                imageUrl={avatarUrl}
              />
            </Box>
            <Flex
              css={{
                flexDirection: 'column',
                flex: 'auto',
                marginLeft: '$4',
                justifyContent: 'center',
              }}
            >
              <Heading size={2}>Profile</Heading>
              {hasUsername && (
                <Text size={0} weight="semibold" css={{ color: '$black60' }}>
                  @{user?.username}
                </Text>
              )}
            </Flex>
          </Flex>
          <Box css={{ marginLeft: 'auto' }} className="icon-icon">
            <RightChevron style={{ display: 'block' }} />
          </Box>
        </Flex>
      </Link>
    </NextLink>
  );
}

const Link = styled('a', {
  display: 'block',
  paddingY: '$4',
  paddingX: '$3',
  color: '$black100',
  textDecoration: 'none',
  transition: 'background $1 $ease',
  borderRadius: '$1',
  marginBottom: '$2',
  '& .icon-icon': { color: '$black40' },
  '@hover': {
    '&:hover': {
      background: '$black5',
      '& .icon-icon': { color: '$black100' },
    },
  },
});
