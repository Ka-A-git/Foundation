import { styled } from 'stitches.config';
import Grid from './base/Grid';
import { getGridSpacingStyles } from 'utils/styles';

const CardGrid = styled(Grid, {
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  '@bp0': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
  },
  ...getGridSpacingStyles('gap'),
});

export default CardGrid;
