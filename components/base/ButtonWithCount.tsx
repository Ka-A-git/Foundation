import { ComponentProps, VariantProps } from '@stitches/react';

import { styled, CSS } from 'stitches.config';
import { primaryButtonVariantCss } from './ButtonV2';

import ToggleButton from './ToggleButton';

type ButtonWithCountProps = ComponentProps<typeof ButtonWithCountRoot>;
type ButtonWithCountVariants = VariantProps<typeof ButtonWithCountRoot>;

const CountText = styled('div', {
  lineHeight: '$base',
  borderRadius: '$round',
  position: 'relative',
  transition: 'background-color $1 $ease, color $1 $ease',
});

const pressedCss: CSS = {
  ...primaryButtonVariantCss,
  [`${CountText}`]: {
    backgroundColor: '$black80',
  },
  [`&:disabled ${CountText}`]: {
    backgroundColor: '$black60',
  },
};

const ButtonWithCountRoot = styled(ToggleButton, {
  variants: {
    variant: {
      secondary: {
        [`${CountText}`]: {
          backgroundColor: '$black5',
        },
      },
      outline: {
        [`${CountText}`]: {
          backgroundColor: '$black5',
        },
      },
      ghost: {
        [`${CountText}`]: {
          backgroundColor: '$black5',
        },
      },
      blur: {
        [`${CountText}`]: {
          backgroundColor: '$whiteT15',
        },
        '@hover': {
          '&:hover': {
            [`${CountText}`]: {
              backgroundColor: '$black5',
            },
          },
        },
        '&:disabled': {
          [`${CountText}`]: {
            backgroundColor: '$whiteT15',
          },
        },
      },
    },
    size: {
      0: {
        paddingRight: '$2',
        [`${CountText}`]: {
          height: '20px',
          lineHeight: '20px',
          fontSize: '10px',
          paddingX: '$2',
          marginLeft: '$1',
        },
      },
      1: {
        paddingLeft: '$5',
        paddingRight: '$3',
        [`${CountText}`]: {
          height: '24px',
          lineHeight: '24px',
          fontSize: '12px',
          paddingX: '10px',
          marginLeft: '$2',
        },
      },
      2: {
        paddingLeft: '$6',
        paddingRight: '$4',
        [`${CountText}`]: {
          height: '28px',
          lineHeight: '28px',
          fontSize: '$0',
          paddingX: '$3',
          marginLeft: '$2',
        },
      },
    },
    pressed: {
      true: {
        [`${CountText}`]: {
          // Since most variants use the same pressed style, it's fine to
          // default to these styles for <CountText /> when pressed
          backgroundColor: '$black80',
          color: '$black0',
        },
      },
    },
    fullWidth: {
      true: {
        width: '100%',
        [`${CountText}`]: {
          position: 'absolute',
        },
      },
    },
  },
  compoundVariants: [
    {
      pressed: true,
      variant: 'secondary',
      css: pressedCss,
    },
    {
      pressed: true,
      variant: 'outline',
      css: pressedCss,
    },
    {
      pressed: true,
      variant: 'ghost',
      css: pressedCss,
    },
    {
      pressed: true,
      variant: 'blur',
      css: {
        [`${CountText}`]: {
          color: '$black100',
          backgroundColor: '$black5',
        },
        '@hover': {
          '&:hover': {
            [`${CountText}`]: {
              color: '$black100',
              backgroundColor: '$black10',
            },
          },
        },
      },
    },
    {
      size: 0,
      fullWidth: true,
      css: {
        [`${CountText}`]: {
          top: 'calc($2 - 1px)', // Need to offset the 1px border
          right: '$2',
        },
      },
    },
    {
      size: 1,
      fullWidth: true,
      css: {
        [`${CountText}`]: {
          top: 'calc($3 - 1px)', // Need to offset the 1px border
          right: '$3',
        },
      },
    },
    {
      size: 1,
      fullWidth: true,
      css: {
        [`${CountText}`]: {
          top: 'calc($4 - 1px)', // Need to offset the 1px border
          right: '$4',
        },
      },
    },
  ],
});

const ButtonWithCount = {
  Root: ButtonWithCountRoot,
  Count: CountText,
};

export type { ButtonWithCountProps, ButtonWithCountVariants };
export default ButtonWithCount;
