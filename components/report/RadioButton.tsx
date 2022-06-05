import { styled } from 'stitches.config';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import Card from 'components/base/Card';
import Text from 'components/base/Text';

import { ReportReason } from 'types/Report';

const RadioItem = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: '$white100',
  width: 28,
  height: 28,
  borderRadius: '$round',
  border: '2px solid $black10',
  marginRight: '$4',
  '&:focus': { boxShadow: `0 0 0 2px $black100` },
  '&[data-state=checked]': {
    backgroundColor: '$black100',
    borderColor: '$black100',
  },
});

const RadioIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 8,
    height: 8,
    borderRadius: '$round',
    backgroundColor: '$white100',
  },
});

interface RadioButtonProps {
  label: string;
  value: ReportReason;
  onChange: (arg: ReportReason) => void;
}

export function RadioButton(props: RadioButtonProps) {
  const { label, value, onChange } = props;

  return (
    <Card
      isInteractive
      css={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '$3',
        padding: '$4',
        cursor: 'pointer',
      }}
      onClick={() => onChange(value)}
    >
      <RadioItem value={value}>
        <RadioIndicator />
      </RadioItem>
      <Text weight="semibold">{label}</Text>
    </Card>
  );
}

export const RadioGroup = RadioGroupPrimitive.Root;
