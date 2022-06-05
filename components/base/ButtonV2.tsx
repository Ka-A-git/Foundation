import { ComponentProps, VariantProps } from '@stitches/react';

import { CSS, styled } from 'stitches.config';
import BaseButton from 'components/base/BaseButton';

type ButtonV2Props = ComponentProps<typeof ButtonV2>;
type ButtonV2Variants = VariantProps<typeof ButtonV2>;

// The primary variant is reused as the pressed state of the secondary,
// outlined and ghost variants, hence why the styles are abstracted away
export const primaryButtonVariantCss: CSS = {
  backgroundColor: '$black100',
  color: '$black0',

  '@hover': {
    '&:hover': {
      boxShadow: '$1',
      backgroundColor: '$black100',
      transform: 'translate3d(0, -1px, 0)',
    },
  },
  '&:active': {
    backgroundColor: '$black90',
    boxShadow: 'none',
    transform: 'translate3d(0, 2px, 0)',
  },
  '&:focus-visible': {
    borderColor: '$black0',
    outline: '4px solid $blackT30',
  },
  '&:disabled': {
    backgroundColor: '$black50',
    boxShadow: 'none',
    color: '$black20',
    transform: 'none',

    '&:active': {
      backgroundColor: '$black50',
    },
  },
};

const ButtonV2 = styled(BaseButton, {
  paddingY: 0,
  cursor: 'pointer',
  appearance: 'none',

  borderRadius: '$round',
  boxSizing: 'border-box',
  border: '1px solid transparent',

  willChange: 'transform',
  transition:
    'background-color $1 $ease, border $1 $ease, box-shadow $1 $ease, color $1 $ease, outline $1 $ease, transform $1 $ease',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontFamily: '$body',
  fontWeight: '$semibold',
  textAlign: 'center',
  textDecoration: 'none',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  svg: {
    display: 'block',
  },

  variants: {
    size: {
      0: {
        height: '$formElement0',
        paddingX: '$4',
        fontSize: '$0',
        letterSpacing: '$0',
      },
      1: {
        height: '$formElement1',
        paddingX: '$6',
        fontSize: '$1',
        letterSpacing: '$1',
      },
      2: {
        height: '$formElement2',
        paddingX: '$7',
        fontSize: '$2',
        letterSpacing: '$2',
      },
    },
    icon: {
      true: {},
      standalone: {},
    },
    variant: {
      primary: primaryButtonVariantCss,
      secondary: {
        backgroundColor: '$black0',
        boxShadow: '$0',
        color: '$black100',

        '@hover': {
          '&:hover': {
            boxShadow: '$1',
            transform: 'translate3d(0, -1px, 0)',
          },
        },
        '&:active': {
          boxShadow: '$0',
          transform: 'translate3d(0, 2px, 0)',
        },
        '&:focus-visible': {
          borderColor: '$black100',
          outline: '4px solid $blackT30',
        },
        '&:disabled': {
          color: '$black40',
          transform: 'none',
          '@hover': {
            '&:hover': {
              boxShadow: '$0',
            },
          },
        },
      },
      outline: {
        backgroundColor: '$black0',
        boxShadow:
          '$tight, 0px 0px 0px 1px $colors$blackT5, inset 0px 0px 0px 1px transparent',
        color: '$black100',

        '@hover': {
          '&:hover': {
            borderColor: '$black100',
            boxShadow:
              '$tight, 0px 0px 0px 1px transparent, inset 0px 0px 0px 1px $colors$black100',
          },
        },
        '&:active': {
          backgroundColor: '$black5',
          boxShadow:
            '$tight, 0px 0px 0px 1px transparent, inset 0px 0px 0px 1px $colors$black100',
          transform: 'translate3d(0, 2px, 0)',
        },
        '&:focus-visible': {
          borderColor: '$black100',
          outline: '4px solid $blackT30',
        },
        '&:disabled': {
          boxShadow: '$tight, 0px 0px 0px 1px $colors$blackT5',
          color: '$black40',
          '@hover': {
            '&:hover': {
              borderColor: 'transparent',
              boxShadow: '$tight, 0px 0px 0px 1px $colors$blackT5',
            },
          },
          '&:active': {
            backgroundColor: '$black0',
            transform: 'none',
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$black100',

        '@hover': {
          '&:hover': {
            backgroundColor: '$blackT5',
          },
        },
        '&:active': {
          backgroundColor: '$blackT5',
          transform: 'translate3d(0, 2px, 0)',
        },
        '&:focus-visible': {
          borderColor: '$black100',
          outline: '4px solid $blackT30',
        },
        '&:disabled': {
          color: '$black40',
          '@hover': {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          '&:active': {
            transform: 'none',
          },
        },
      },
      blur: {
        backgroundColor: '$whiteT20',
        backdropFilter: 'blur(10px)',
        color: '$black0',

        '@hover': {
          '&:hover': {
            backgroundColor: '$black0',
            boxShadow: '$1',
            color: '$black100',
            transform: 'translate3d(0, -1px, 0)',
          },
        },
        '&:active': {
          boxShadow: 'none',
          transform: 'translate3d(0, 2px, 0)',
        },
        '&:focus-visible': {
          borderColor: '$black0',
          outline: '4px solid $whiteT50',
        },
        '&:disabled': {
          backgroundColor: '$whiteT60',
          backdropFilter: 'blur(10px)',
          color: '$blackT60',

          '@hover': {
            '&:hover': {
              transform: 'none',
              boxShadow: 'none',
            },
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 1,
  },
  compoundVariants: [
    /*
     * Button with icon in size 0 */
    {
      size: 0,
      icon: true,
      css: {
        paddingX: '$4',
        svg: {
          width: 'auto',
          height: '$icon0',
          marginRight: '6px',
        },
      },
    },
    {
      size: 0,
      icon: 'standalone',
      css: {
        padding: 0,
        borderRadius: '50%',
        width: '$formElement0',
        height: '$formElement0',
        svg: {
          width: 'auto',
          height: '$icon1',
        },
      },
    },

    /*
     * Button with icon in size 1 */
    {
      size: 1,
      icon: true,
      css: {
        paddingX: '$5',
        svg: {
          width: 'auto',
          height: '$icon1',
          marginRight: '$2',
        },
      },
    },
    {
      size: 1,
      icon: 'standalone',
      css: {
        padding: 0,
        borderRadius: '50%',
        width: '$formElement1',
        height: '$formElement1',
        svg: {
          height: '$icon2',
          width: 'auto',
        },
      },
    },

    /*
     * Button with icon in size 2 */
    {
      size: 2,
      icon: true,
      css: {
        paddingX: '$6',
        svg: {
          width: 'auto',
          height: '$icon2',
          marginRight: '$3',
        },
      },
    },
    {
      size: 2,
      icon: 'standalone',
      css: {
        padding: 0,
        borderRadius: '50%',
        width: '$formElement2',
        height: '$formElement2',
        svg: {
          height: '$icon3',
          width: 'auto',
        },
      },
    },
  ],
});

export type { ButtonV2Props, ButtonV2Variants };
export default ButtonV2;
