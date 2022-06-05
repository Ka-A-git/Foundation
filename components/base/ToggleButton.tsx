import { ComponentProps, VariantProps } from '@stitches/react';

import { styled } from 'stitches.config';
import ButtonV2, { primaryButtonVariantCss } from './ButtonV2';

type ToggleButtonProps = ComponentProps<typeof ToggleButton>;
type ToggleButtonVariants = VariantProps<typeof ToggleButton>;

const ToggleButton = styled(ButtonV2, {
  variants: {
    variant: {
      secondary: {},
      outline: {},
      ghost: {},
      blur: {},
    },
    size: {
      0: {},
      1: {},
      2: {},
    },
    pressed: {
      true: {},
    },
  },
  compoundVariants: [
    {
      pressed: true,
      variant: 'secondary',
      css: primaryButtonVariantCss,
    },
    {
      pressed: true,
      variant: 'outline',
      css: primaryButtonVariantCss,
    },
    {
      pressed: true,
      variant: 'ghost',
      css: primaryButtonVariantCss,
    },
    {
      pressed: true,
      variant: 'blur',
      css: {
        backgroundColor: '$black0',
        color: '$black100',
      },
    },
  ],
});

export type { ToggleButtonProps, ToggleButtonVariants };
export default ToggleButton;
