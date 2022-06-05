import * as Dialog from '@radix-ui/react-dialog';
import { TouchEvent } from 'react';
import { styled, keyframes } from 'stitches.config';

import ButtonV2 from './ButtonV2';
import Header from './ModalHeader';

// Dialog overlay
const overlayShow = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const overlayHide = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,

  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',

  background: '$blackT60',
  backdropFilter: 'blur(10px)',

  '@bp1': {
    alignItems: 'center',
    justifyContent: 'center',
  },

  "&[data-state='open']": {
    animation: `${overlayShow} $transitions$1 $transitions$ease forwards`,
  },
  "&[data-state='closed']": {
    animation: `${overlayHide} $transitions$1 $transitions$ease forwards`,
  },
});

// Dialog content
const contentShow = keyframes({
  from: { transform: 'translate3d(0, 5vh, 0)' },
  to: { opacity: 'translate3d(0, 0, 0)' },
});

const contentHide = keyframes({
  from: { opacity: 'translate3d(0, 0, 0)' },
  to: { transform: 'translate3d(0, 5vh, 0)' },
});

const Content = styled(Dialog.Content, {
  width: '100%',
  maxHeight: '80vh',
  background: '$black0',
  borderTopLeftRadius: '$4',
  borderTopRightRadius: '$4',

  display: 'flex',
  flexDirection: 'column',

  '&:focus': {
    outline: 'none',
  },

  '@bp1': {
    maxWidth: 600,
    borderRadius: '$4',
  },

  "&[data-state='open']": {
    animation: `${contentShow} $transitions$1 $transitions$ease forwards`,
  },
  "&[data-state='closed']": {
    animation: `${contentHide} $transitions$1 $transitions$ease forwards`,
  },
});

const PrimaryCta = styled(ButtonV2, {
  defaultVariants: {
    size: 0,
    variant: 'primary',
  },
});

const SecondaryCta = styled(ButtonV2, {
  defaultVariants: {
    size: 0,
    variant: 'ghost',
  },
});

const Body = styled('div', {
  paddingTop: '1px', // otherwise button shadows get cut of because of overflow
  paddingX: '$6',
  paddingBottom: 'calc($6 + env(safe-area-inset-bottom))',
  overflow: 'auto',
});

const onTouchEnd = (_ev: TouchEvent<any>) => {
  if (typeof document !== 'undefined') {
    document.body.style.pointerEvents = '';
  }
};

Content.defaultProps = {
  onTouchEnd: (ev) => ev.stopPropagation(),
};

Overlay.defaultProps = {
  onTouchEnd,
};

Dialog.Close.defaultProps = {
  onTouchEnd,
};

const Modal = {
  Body,
  Root: Dialog.Root,
  Portal: Dialog.Portal,
  Trigger: Dialog.Trigger,
  Close: Dialog.Close,
  PrimaryCta,
  SecondaryCta,
  Header,
  Content,
  Overlay,
};

export default Modal;
