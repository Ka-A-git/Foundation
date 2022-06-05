import { styled } from 'stitches.config';
import ButtonWithCount from 'components/base/ButtonWithCount';
import Checkbox from 'components/base/Checkbox';
import Flex from 'components/base/Flex';
import Text from 'components/base/Text';

interface AttributeOptionProps {
  count: number;
  isChecked: boolean;
  label: string;
  setCheckedOptions: (arg0: string) => void;
  value: string;
  percentage: string;
}

export default function AttributeOption(props: AttributeOptionProps) {
  const { count, isChecked, label, percentage, setCheckedOptions, value } =
    props;
  return (
    <Label htmlFor={label} as="label">
      <Flex css={{ alignItems: 'center' }}>
        <Checkbox
          checked={isChecked}
          id={label}
          onCheckedChange={() => setCheckedOptions(value)}
        />
        <LabelText
          size={{ '@initial': 0, '@bp2': 1 }}
          css={{ color: isChecked ? '$black100' : '$black80' }}
          weight={isChecked ? 'semibold' : 'medium'}
        >
          {label}
        </LabelText>
      </Flex>
      <Flex css={{ alignItems: 'center' }}>
        <Percentage>{percentage}</Percentage>
        <Count>{count}</Count>
      </Flex>
    </Label>
  );
}

const Percentage = styled(Text, {
  marginRight: '$3',
  fontSize: '12px',
  color: '$black60',
  defaultVariants: {
    weight: 'medium',
  },
});

const Count = styled(ButtonWithCount.Count, {
  height: '24px',
  minWidth: '42px',
  textAlign: 'center',
  lineHeight: '24px',
  fontSize: '12px',
  paddingX: '10px',
  fontWeight: '$semibold',
  backgroundColor: '$black10',
  transition: 'background-color $1 $ease, color $1 $ease',
});

const Label = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$2',
  borderRadius: '$2',
  cursor: 'pointer',
  transition: 'background-color $1 $ease, color $1 $ease',

  '@bp2': {
    padding: '$3',
  },

  '@hover': {
    '&:hover': {
      backgroundColor: '$black10',
      [`${Count}`]: {
        backgroundColor: '$black20',
      },
    },
  },
});

const LabelText = styled(Text, {
  marginLeft: '$3',
  '@hover': {
    '&:hover': {
      color: '$black100',
    },
  },
});
