import { styled } from 'stitches.config';
import * as Checkbox from '@radix-ui/react-checkbox';
import Flex from 'components/base/Flex';
import CheckIcon from 'assets/icons/check-icon.svg';

const CheckboxWrapper = styled(Checkbox.Root, {
  position: 'relative',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  border: 'none',
  padding: 0,
});

interface CustomCheckboxProps {
  name: string;
  checked: boolean;
  onCheckedChange: (arg0: boolean) => void;
  size?: number;
}

export default function CustomCheckbox(
  props: CustomCheckboxProps
): JSX.Element {
  const { checked, onCheckedChange, name, size = 40 } = props;
  return (
    <CheckboxWrapper
      onCheckedChange={onCheckedChange}
      name={name}
      checked={checked}
      css={{ width: size, height: size }}
    >
      <CheckboxIcon checked={checked} size={size} />
    </CheckboxWrapper>
  );
}

interface CheckboxProps {
  checked: boolean;
  size: number;
}

export function CheckboxIcon(props: CheckboxProps): JSX.Element {
  const { checked, size } = props;
  const width = size / 1.5;
  return (
    <CheckboxIconContainer
      isChecked={checked}
      css={{ width: size, height: size }}
    >
      {checked && <CheckIcon style={{ width }} />}
    </CheckboxIconContainer>
  );
}

const CheckboxIconContainer = styled(Flex, {
  // adding float: left for the case when the checkbox is referenced in NewsletterSetting
  float: 'left',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  backgroundColor: '$white100',
  border: '1px solid',
  borderColor: '$black10',
  transition: 'background-color $1 $ease',
  '@hover': {
    '&:hover': {
      backgroundColor: '$black5',
      borderColor: '$black10',
    },
  },
  variants: {
    isChecked: {
      true: {
        backgroundColor: '$black100',
        borderColor: '$black100',
        '@hover': {
          '&:hover': {
            backgroundColor: '$black100',
            borderColor: '$black100',
          },
        },
      },
    },
  },
});
