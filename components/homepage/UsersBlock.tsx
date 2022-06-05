import { useState, ComponentProps, useCallback } from 'react';
import NextLink from 'next/link';
import Marquee from 'react-fast-marquee';
import { styled } from 'stitches.config';

import Avatar from 'components/base/Avatar';
import Box from 'components/base/Box';
import Tooltip from 'components/Tooltip';
import Link from 'components/base/Link';

import { getUsernameOrAddress } from 'utils/helpers';
import { buildImgixUrl } from 'utils/assets';
import { getAvatarByPublicKey } from 'utils/users';
import { onGridPx, supportsHover } from 'utils/styles';

import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';

import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';
import useSegmentEvent from 'hooks/analytics/use-segment-event';

interface UsersBlockProps {
  users: UserFragment[];
}

export default function UsersBlock(props: UsersBlockProps): JSX.Element {
  const { users } = props;
  const marqueeRows = getMarqueeRows(users);
  const [play, setPlay] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <MarqueeWrapper
      onMouseOver={() => setPlay(false)}
      onMouseOut={() => setPlay(true)}
    >
      <MarqueeRow
        direction="left"
        users={marqueeRows[0]}
        play={play && !prefersReducedMotion}
      />
      <MarqueeRow
        direction="right"
        users={marqueeRows[1]}
        play={play && !prefersReducedMotion}
      />
    </MarqueeWrapper>
  );
}
type MarqueeProps = Omit<ComponentProps<typeof Marquee>, 'children'>;
type MarqueeBlockProps = UsersBlockProps & Partial<MarqueeProps>;

function MarqueeRow(props: MarqueeBlockProps): JSX.Element {
  const { direction, play, users } = props;
  const [sendSegmentEvent] = useSegmentEvent();

  const handleSegmentEvent = useCallback(
    (user: UserFragment) => {
      sendSegmentEvent({
        eventName: 'featured_profile_clicked',
        payload: { publicKey: user?.publicKey },
      });
    },
    [sendSegmentEvent]
  );

  return (
    <Marquee
      direction={direction}
      gradient={true}
      play={play}
      speed={10}
      pauseOnHover
    >
      {users.map((user, index) => {
        const usernameOrAddress = getUsernameOrAddress(user);
        const imageUrl = buildImgixUrl(user.profileImageUrl, { w: 160 });
        const avatarBackground = getAvatarByPublicKey(user.publicKey);
        return (
          <NextLink key={index} href={`/${usernameOrAddress}`} passHref>
            <AvatarLink onClick={() => handleSegmentEvent(user)}>
              <AvatarTooltip username={user.name || usernameOrAddress}>
                <AvatarWrapper>
                  <Avatar
                    imageUrl={imageUrl}
                    shape="round"
                    alt={user.name || usernameOrAddress}
                    css={{
                      background: avatarBackground,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: 64,
                      height: 64,
                      '@hover': {
                        width: 80,
                        height: 80,
                      },
                    }}
                  />
                </AvatarWrapper>
              </AvatarTooltip>
            </AvatarLink>
          </NextLink>
        );
      })}
    </Marquee>
  );
}

type AvatarTooltipProps = {
  username?: string;
  children: React.ReactElement;
};

function AvatarTooltip({
  children,
  username,
}: AvatarTooltipProps): JSX.Element {
  if (username && supportsHover()) {
    return (
      <Tooltip animation="shift-away" content={username} hideOnClick={false}>
        {children}
      </Tooltip>
    );
  }
  return children;
}

const MarqueeWrapper = styled(Box, {
  width: '100vw',
  maxWidth: onGridPx(500),
  marginX: 'auto',
  marginBottom: '$4',

  gap: '$5',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  '@bp2': {
    gap: 0,
  },

  // .overlay class added by react-fast-marquee
  '.overlay': {
    pointerEvents: 'none',
  },

  '@media(max-width: 1800px)': {
    // .overlay class added by react-fast-marquee
    '.overlay': {
      // hide gradient when marquee touches edge of screen
      // !important needed to override inline styles added by Marquee
      '--gradient-width': '0px!important',
    },
  },

  // .marquee-container class added by react-fast-marquee
  '.marquee-container:last-of-type .marquee': {
    // Push second row of avatars to the right to create
    // a staggered effect
    transform: 'translateX(50px)',
  },

  // .marquee class added by react-fast-marquee
  '.marquee': {
    minWidth: 'auto',
    paddingX: '$3',
    // The padding is needed because the marquee crops the hover shadow of the avatars
    paddingTop: '2px',
    '@hover': {
      paddingBottom: '$6',
    },
  },
});

const AvatarLink = styled(Link, {
  marginX: '$2',
  '&:first-of-type': {
    marginLeft: 0,
  },
  '&:last-of-type': {
    marginRight: 0,
  },
  '@hover': {
    marginX: '$4',
  },
});

const AvatarWrapper = styled(Box, {
  borderRadius: '$round',
  '@hover': {
    cursor: 'pointer',
    willChange: 'transform',
    transition: 'transform $1 $ease, box-shadow $1 $ease',
    '&:hover': {
      boxShadow: '$2',
      transform: 'translate3d(0, -1px, 0)',
    },
    '&:active': {
      boxShadow: '$0',
      transform: 'translate3d(0, 2px, 0)',
    },
  },
});

function getMarqueeRows(
  users: UserFragment[]
): [UserFragment[], UserFragment[]] {
  const items = [...users];
  const middle = Math.ceil(items.length / 2);
  return [items.splice(0, middle), items];
}
