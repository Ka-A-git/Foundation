import Body from 'components/base/Body';
import Flex from 'components/base/Flex';
import { styled } from 'stitches.config';

const Container = styled(Flex, {
  backgroundColor: '$black5',
  position: 'relative',
  minHeight: '66vh',
  '@bp0': {
    height: 'calc(100vh - 16px)',
  },
  '@media (min-width: 1680px)': {
    height: '90vh',
  },
  '@media (min-width: 1800px)': {
    height: '80vh',
  },
});

const ContentContainer = styled(Body, {
  display: 'flex',
  paddingTop: 110,
  paddingBottom: '$10',

  '@bp2': {
    paddingTop: 134,
  },
});

export const ArtworkMedia = {
  Container,
  ContentContainer,
};
