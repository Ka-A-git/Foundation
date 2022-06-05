import React from 'react';
import { styled } from 'stitches.config';

import type { ButtonWithCountProps } from './ButtonWithCount';
import ButtonWithCount from './ButtonWithCount';
import CloseIcon from 'assets/icons/close-icon.svg';

const ButtonWithCloseRoot = styled(ButtonWithCount.Root, {
  [`${ButtonWithCount.Count}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    size: {
      0: {
        [`${ButtonWithCount.Count}`]: {
          width: '20px',
          padding: 0,
          svg: {
            height: '12px',
            width: 'auto',
          },
        },
      },
      1: {
        [`${ButtonWithCount.Count}`]: {
          width: '24px',
          padding: 0,
          svg: {
            height: '14px',
            width: 'auto',
          },
        },
      },
      2: {
        [`${ButtonWithCount.Count}`]: {
          width: '28px',
          padding: 0,
          svg: {
            height: '16px',
            width: 'auto',
          },
        },
      },
    },
    pressed: {
      true: {
        '@hover': {
          '&:hover': {
            [`${ButtonWithCount.Count}`]: {
              backgroundColor: '$black70',
            },
          },
        },
      },
    },
  },
});

type ButtonWithCloseProps = ButtonWithCountProps & {
  children: React.ReactNode;
};

function ButtonWithClose(props: ButtonWithCloseProps) {
  const { children, pressed = true, ...rest } = props;
  return (
    <ButtonWithCloseRoot pressed={pressed} {...rest}>
      {children}
      <ButtonWithCount.Count>
        <CloseIcon />
      </ButtonWithCount.Count>
    </ButtonWithCloseRoot>
  );
}

export default ButtonWithClose;
