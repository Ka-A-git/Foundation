import { styled } from 'stitches.config';

const Card = styled('div', {
  backgroundColor: '$white100',
  boxShadow: '$card',
  transition: 'box-shadow $1 ease, transform $1 $ease',
  willChange: 'transform',
  borderRadius: '$2',

  variants: {
    isInteractive: {
      true: {
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '$1',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '$card',
          },
        },
      },
    },
  },
});

export default Card;
