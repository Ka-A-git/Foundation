import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { CheckboxProps } from '@radix-ui/react-checkbox';
import { styled } from 'stitches.config';

import IconV2 from 'components/base/IconV2';
import CheckIcon from 'assets/icons/check-icon.svg';
import MinusIcon from 'assets/icons/minus-icon.svg';

export const Root = styled(CheckboxPrimitive.Root, {
  width: 24,
  height: 24,
  padding: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  cursor: 'pointer',

  borderRadius: '$2',
  background: '$white100',
  border: '1px solid transparent',

  color: '$black100',
  backgroundColor: '$black0',
  boxShadow:
    '$tight, 0px 0px 0px 1px $colors$blackT5, inset 0px 0px 0px 1px transparent',
  willChange: 'transform',
  transition:
    'background-color $1 $ease, border $1 $ease, box-shadow $1 $ease, color $1 $ease, outline $1 $ease, transform $1 $ease',

  '@hover': {
    '&:hover': {
      borderColor: '$black100',
      boxShadow:
        '$tight, 0px 0px 0px 1px transparent, inset 0px 0px 0px 1px $colors$black100',
    },
  },
  '&:active': {
    backgroundColor: '$black5',
    boxShadow:
      '$tight, 0px 0px 0px 1px transparent, inset 0px 0px 0px 1px $colors$black100',
    transform: 'translate3d(0, 1px, 0)',
  },
  '&:focus-visible': {
    borderColor: '$black100',
    outline: '2px solid $blackT30',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    boxShadow: '$tight, 0px 0px 0px 1px $colors$blackT5',
    color: '$black40',
    '@hover': {
      '&:hover': {
        borderColor: 'transparent',
        boxShadow: '$tight, 0px 0px 0px 1px $colors$blackT5',
      },
    },
    '&:active': {
      backgroundColor: '$black0',
      transform: 'none',
    },
  },
  // Disabled
  '&[aria-checked=true]': {
    backgroundColor: '$black100',
    borderColor: '$black100',
    color: '$white100',
    '@hover': {
      '&:hover': {
        boxShadow: '$tight',
        backgroundColor: '$black80',
        borderColor: '$black80',
      },
    },
    '&:focus-visible': {
      borderColor: '$black0',
      outline: '2px solid $blackT30',
    },
    '&:disabled': {
      borderColor: 'transparent',
      backgroundColor: '$black50',
      boxShadow: 'none',
      color: '$black20',
      transform: 'none',
      '&:active': {
        backgroundColor: '$black50',
      },
    },
  },
});

function Checkbox(props: CheckboxProps): React.ReactElement {
  const { checked } = props;
  return (
    <Root {...props}>
      <CheckboxPrimitive.Indicator>
        {checked === 'indeterminate' && <IconV2 icon={MinusIcon} size={2} />}
        {checked === true && <IconV2 icon={CheckIcon} size={2} />}
      </CheckboxPrimitive.Indicator>
    </Root>
  );
}

export type { CheckboxProps };
export default Checkbox;
