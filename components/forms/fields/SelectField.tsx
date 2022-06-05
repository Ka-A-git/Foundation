import { styled } from 'stitches.config';
import { useState } from 'react';
import { ChangeEvent } from 'react';

import Text from 'components/base/Text';
import Flex from 'components/base/Flex';

import DownIcon from 'assets/icons/down-chevron.svg';

export const Select = styled('select', {
  appearance: 'none',
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  width: '100%',
  opacity: 0,
  fontSize: '$1',
  cursor: 'pointer',
});

export const SelectWrapper = styled(Flex, {
  fontFamily: '$body',
  fontWeight: '$semibold',
  fontSize: '$1',
  backgroundColor: '$black0',
  border: '1px solid transparent',
  borderRadius: '$round',
  boxShadow:
    '$tight, 0px 0px 0px 1px $colors$blackT5, inset 0px 0px 0px 1px transparent',
  color: '$black100',

  // paddingY: '$3',
  paddingX: '$4',

  whiteSpace: 'nowrap',
  transition:
    'border-color $1 $ease, box-shadow $1 $ease, background-color $1 $ease, color $1 $ease',
  cursor: 'pointer',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'space-between',

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
    transform: 'translate3d(0, 2px, 0)',
  },
  '&:focus-visible': {
    borderColor: '$black100',
    outline: '4px solid $blackT30',
  },
  '&:disabled': {
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
  variants: {
    size: {
      0: {
        height: '$formElement0',
        fontSize: '$0',
        letterSpacing: '$0',
      },
      1: {
        height: '$formElement1',
        fontSize: '$1',
        letterSpacing: '$1',
      },
      2: {
        height: '$formElement2',
        fontSize: '$2',
        letterSpacing: '$2',
      },
    },
    isActive: {
      true: {
        borderColor: '$black100',
      },
    },
  },
});

export const SelectIcon = styled(Flex, {
  marginLeft: '$2',
  alignSelf: 'stretch',
});

interface SelectFieldProps<T> {
  items: T[];
  className?: string;
  defaultSelectedItem: T;
  onSelectedItemChange: (selectedItem: T) => void;
}

export default function SelectField<T extends { id: string; label: string }>(
  props: SelectFieldProps<T>
): JSX.Element {
  const {
    items = [],
    className,
    defaultSelectedItem,
    onSelectedItemChange,
  } = props;

  const [selectedItem, setSelectedItem] = useState<T>(defaultSelectedItem);

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const rawValue = ev.target.value;
    const selectedItem = items.find((item) => item.id === rawValue);
    setSelectedItem(selectedItem);
    onSelectedItemChange(selectedItem);
  };

  return (
    <>
      <SelectWrapper className={className} size={0}>
        <Select onChange={handleChange} value={selectedItem.id}>
          {items.map((item, i) => (
            <option key={i} value={item.id}>
              {item.label}
            </option>
          ))}
        </Select>

        <Text css={{ pointerEvents: 'none' }}>{selectedItem.label}</Text>
        <SelectIcon css={{ pointerEvents: 'none' }}>
          <DownIcon width={15} />
        </SelectIcon>
      </SelectWrapper>
    </>
  );
}
