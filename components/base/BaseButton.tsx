import { styled } from 'stitches.config';

const BaseButton = styled('button', {
  paddingY: 0,
  cursor: 'pointer',
  appearance: 'none',

  borderRadius: '$round',
  boxSizing: 'border-box',
  border: '1px solid transparent',
  backgroundColor: 'transparent',

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
});

export default BaseButton;
