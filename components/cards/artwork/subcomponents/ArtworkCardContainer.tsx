import Flex from 'components/base/Flex';
import { styled } from 'stitches.config';
import { TitleAndCollectionWrapper } from './ArtworkCardTitleAndCollection';

const ArtworkCardContainer = styled(Flex, {
  backgroundColor: '$white100',
  display: 'flex',
  flex: 'auto',
  flexDirection: 'column',
  borderRadius: '$2',
  overflow: 'hidden',
  boxShadow: '$card',

  transition: 'box-shadow $1',
  textDecoration: 'none',
  color: '$black100',
  position: 'relative',
  cursor: 'pointer',
  transform: 'translateZ(0)',

  variants: {
    isAuctionMode: {
      true: {
        background: '$black100',
        color: '$white100',
      },
      false: {
        background: '$white100',
        color: '$black100',
      },
    },
  },
  '@bp0': {
    minWidth: 340,
  },

  '@hover': {
    '&:hover': {
      boxShadow: '$1',

      [`${TitleAndCollectionWrapper}`]: {
        opacity: 1,
      },
    },
  },
});

export default ArtworkCardContainer;
