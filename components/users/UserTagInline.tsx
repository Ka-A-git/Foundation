import NextLink from 'next/link';
import { VariantProps } from '@stitches/react';
import { styled, CSS } from 'stitches.config';

import { SquareAvatar } from 'components/base/Avatar';
import Box from 'components/base/Box';
import Mono from 'components/base/Mono';
import Text from 'components/base/Text';
import CircleAvatar from 'components/avatars/CircleAvatar';
import MaybeRenderPopover from 'components/follows/MaybeRenderPopover';
import Link from 'components/base/Link';

import { buildAvatarUrl } from 'utils/assets';
import { getUsernameOrAddressInfo } from 'utils/helpers';

import { TagUser } from './UserTag';
import Account from 'types/Account';

const UserTagInlineContainer = styled(Box, {
  display: 'inline-flex',
  verticalAlign: 'bottom',
  alignItems: 'center',
  willChange: 'transform',
  padding: 0,
  transition: 'color $0 $ease',
  color: '$black60',
  '@hover': {
    '&:hover': {
      color: '$black100',
    },
  },
});

interface UserTagInlineProps
  extends VariantProps<typeof UserTagInlineContainer> {
  user: TagUser | Account;
  disablePopover?: boolean;
  css?: CSS;
  disableAvatar?: boolean;
  avatarSize?: number;
  size?: VariantProps<typeof Mono>['size'];
}

export default function UserTagInline(props: UserTagInlineProps) {
  const {
    user,
    disablePopover = false,
    disableAvatar = false,
    avatarSize = 32,
    css,
    size = 1,
  } = props;

  // TODO: return null when loading/not present
  if (!user) {
    return null;
  }

  const avatarImageUrl = buildAvatarUrl(avatarSize, user.profileImageUrl);

  const { usernameOrAddress, hasUsername, userPath } =
    getUsernameOrAddressInfo(user);

  return (
    <MaybeRenderPopover
      disablePopover={disablePopover}
      publicKey={user.publicKey}
      css={{ display: 'inline-flex' }}
    >
      <NextLink href={`/${userPath}`} passHref prefetch={false}>
        <Link
          css={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <UserTagInlineContainer css={css}>
            {!disableAvatar &&
              (avatarImageUrl ? (
                <Box css={{ marginRight: '$2' }}>
                  <SquareAvatar
                    imageUrl={avatarImageUrl}
                    alt={usernameOrAddress}
                    shape="round"
                    size={avatarSize}
                  />
                </Box>
              ) : (
                <Box css={{ marginRight: '$2' }}>
                  <CircleAvatar
                    publicKey={user.publicKey}
                    maxSize={avatarSize}
                    css={{ width: avatarSize, height: avatarSize }}
                  />
                </Box>
              ))}
            {hasUsername ? (
              <Text
                weight="semibold"
                size={size}
                css={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {usernameOrAddress}
              </Text>
            ) : (
              <Mono
                tight
                size={size}
                css={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {usernameOrAddress}
              </Mono>
            )}
          </UserTagInlineContainer>
        </Link>
      </NextLink>
    </MaybeRenderPopover>
  );
}
