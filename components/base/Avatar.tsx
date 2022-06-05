import { VariantProps, ComponentProps } from '@stitches/react';

import { CSS, styled } from 'stitches.config';

import Box from './Box';

const AvatarBackground = styled(Box, {
  display: 'block',
  position: 'relative',
  variants: {
    shape: {
      1: {
        borderRadius: 'calc($1 + $space$1)',
        '&:after': {
          borderRadius: 'calc($1 + $space$1)',
        },
      },
      2: {
        borderRadius: 'calc($2 + $space$2)',
        '&:after': {
          borderRadius: 'calc($2 + $space$2)',
        },
      },
      round: {
        borderRadius: '$round',
        '&:after': {
          borderRadius: '$round',
        },
      },
    },
    stroke: {
      1: {
        padding: '$1',
      },
      2: {
        padding: '$2',
      },
      3: {
        padding: '$3',
      },
    },
    appearance: {
      normal: {
        background: '$white100',
        boxShadow: '$0',
      },
      frosted: {
        background: '$whiteT20',
        backdropFilter: 'blur(6px)',
      },
      gray: {
        background: '$whiteT20',
      },
    },
  },
});

const AvatarImage = styled(Box, {
  backgroundColor: '$black5',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  variants: {
    shape: {
      1: {
        borderRadius: '$1',
      },
      2: {
        borderRadius: '$2',
      },
      round: {
        borderRadius: '$round',
      },
    },
  },
});

export type AvatarImageVariants = VariantProps<typeof AvatarImage>;
export type AvatarBackgroundVariants = VariantProps<typeof AvatarBackground>;

interface SharedAvatarProps {
  imageUrl: string;
  alt?: string;
}

export interface AvatarProps
  extends ComponentProps<typeof AvatarImage>,
    AvatarBackgroundVariants,
    SharedAvatarProps {}

export default function Avatar(props: AvatarProps) {
  const { imageUrl, shape, css, alt, stroke, appearance } = props;

  return (
    <AvatarBackground shape={shape} appearance={appearance} stroke={stroke}>
      <AvatarImage
        style={{
          ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
        }}
        css={css}
        shape={shape}
        aria-label={alt}
        role="image"
      />
    </AvatarBackground>
  );
}

interface SquareAvatarProps
  extends AvatarImageVariants,
    AvatarBackgroundVariants,
    SharedAvatarProps {
  size: number;
  css?: CSS;
}

// TODO: rename as Avatar?
// It seems the base Avatar is never used, and this is never used as a "square", but rather
// with varying amounts of borderRadius (via the shape prop)
export function SquareAvatar(props: SquareAvatarProps) {
  const { imageUrl, alt, size, shape, stroke, appearance, css } = props;
  return (
    <Avatar
      css={{ width: size, height: size, ...css }}
      imageUrl={imageUrl}
      alt={alt}
      shape={shape}
      stroke={stroke}
      appearance={appearance}
    />
  );
}
