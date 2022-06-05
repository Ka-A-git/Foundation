import { ComponentProps, VariantProps } from '@stitches/react';

import { styled } from 'stitches.config';

import ToggleButton from './ToggleButton';

type ChevronButtonProps = ComponentProps<typeof ChevronButton>;
type ChevronButtonVariants = VariantProps<typeof ChevronButton>;

const ChevronButton = styled(ToggleButton, {
  '&:after': {
    top: '50%',
    content: '""',
    position: 'absolute',

    display: 'block',
    transform: 'translateY(-50%)',
    transition: 'transform $0 $ease',
  },
  '&:disabled': {
    '&:after': {
      backgroundColor: 'currentColor',
    },
  },
  variants: {
    // Exposing the outline and active variants from the base button here,
    // because we need them to compose the compound active state below.
    // Since TS doesn't seem to pick them up, we need to explicitly define them
    // here. It's safe, as they don't override the base variants.
    variant: {
      outline: {},
      secondary: {},
      ghost: {},
      blur: {
        '&:after': {
          backgroundColor: '$black0',
        },
        '&:hover:not(:disabled)': {
          '&:after': {
            backgroundColor: '$black100',
          },
        },
      },
    },
    pressed: {
      true: {
        '&:after': {
          transform: 'translateY(-50%) rotate(180deg)',
        },
      },
    },
    size: {
      0: {
        paddingRight: 32,
        '&:after': {
          width: 10,
          height: 10,
          right: 14,
          backgroundColor: '$black100',
          maskImage: 'url(/images/icons/chevron-small.svg)',
        },
      },
      1: {
        paddingRight: 40,
        '&:after': {
          width: 12,
          height: 12,
          right: 20,
          backgroundColor: '$black100',
          maskImage: 'url(/images/icons/chevron-medium.svg)',
        },
      },
      2: {
        paddingRight: 50,
        '&:after': {
          width: 14,
          height: 14,
          right: 24,
          backgroundColor: '$black100',
          maskImage: 'url(/images/icons/chevron-large.svg)',
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      pressed: true,
      css: {
        '&:after': {
          backgroundColor: '$black0',
        },
      },
    },
    {
      variant: 'secondary',
      pressed: true,
      css: {
        '&:after': {
          backgroundColor: '$black0',
        },
      },
    },
    {
      variant: 'ghost',
      pressed: true,
      css: {
        '&:after': {
          backgroundColor: '$black0',
        },
      },
    },
    {
      variant: 'blur',
      pressed: true,
      css: {
        '&:after': {
          backgroundColor: '$black100',
        },
      },
    },
  ],
});

export type { ChevronButtonProps, ChevronButtonVariants };
export default ChevronButton;
