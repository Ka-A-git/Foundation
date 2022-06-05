import { FunctionComponent, SVGAttributes } from 'react';
import { VariantProps } from '@stitches/react';

import { CSS, styled } from 'stitches.config';

interface IconProps {
  css?: CSS;
  icon: FunctionComponent<SVGAttributes<SVGElement>>;
  size?: VariantProps<typeof IconContainer>['size'];
}

export default function Icon(props: IconProps): JSX.Element {
  const { icon: IconComponent, css, size } = props;
  return (
    <IconContainer size={size} css={{ ...css }}>
      <IconComponent />
    </IconContainer>
  );
}

const IconContainer = styled('div', {
  svg: {
    display: 'block',
    position: 'relative',
  },
  variants: {
    size: {
      0: {
        svg: {
          width: 'auto',
          height: '$icon0',
        },
      },
      1: {
        svg: {
          width: 'auto',
          height: '$icon1',
        },
      },
      2: {
        svg: {
          width: 'auto',
          height: '$icon2',
        },
      },
      3: {
        svg: {
          width: 'auto',
          height: '$icon3',
        },
      },
    },
  },
  defaultVariants: {
    size: 1,
  },
});
