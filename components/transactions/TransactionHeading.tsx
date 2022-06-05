import { ReactNode } from 'react';
import { always, cond, equals } from 'ramda';
import { VariantProps } from '@stitches/react';

import { CSS } from 'stitches.config';

import Text from 'components/base/Text';
import Heading from 'components/base/Heading';

type Size = 'small' | 'regular' | 'large';

type SizeProps = VariantProps<typeof Text>['size'];

interface TransactionHeadingProps {
  children: ReactNode;
  size?: Size;
  css?: CSS;
}

export default function TransactionHeading(props: TransactionHeadingProps) {
  const { children, css, size = 'regular' } = props;

  return (
    <Heading
      size={getHeadingSize(size)}
      css={{ ...getHeadingCss(size), ...css }}
    >
      {children}
    </Heading>
  );
}

const getHeadingSize = cond<Size, SizeProps>([
  [equals('small'), always(2)],
  [equals('regular'), always({ '@initial': 3, '@bp2': 4 })],
  [equals('large'), always({ '@initial': 3, '@bp0': 5, '@bp1': 6 })],
]);

const getHeadingCss = cond<Size, CSS>([
  [equals('small'), always({ marginBottom: '$2' })],
  [equals('regular'), always({ marginBottom: '$4' })],
]);
