import { styled } from 'stitches.config';

import Flex from 'components/base/Flex';
import { getGridSpacingStyles } from 'utils/styles';

const TabBar = styled(Flex, {
  boxShadow: 'inset 0 -1px 0 0 #E6E6E6',
  ...getGridSpacingStyles('marginBottom'),
  variants: {
    isScrollable: {
      true: {
        '@media (max-width: 600px)': {
          '&:after': {
            pointerEvents: 'none',
            content: '',
            position: 'absolute',
            width: 60,
            right: 0,
            height: '100%',
            background:
              'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255))',
          },
        },
      },
    },
  },
});

export default TabBar;
