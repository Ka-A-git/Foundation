import { CSS } from 'stitches.config';
import { connectSortBy } from 'react-instantsearch-dom';

import Text from 'components/base/Text';
import {
  SelectWrapper,
  Select,
  SelectIcon,
} from 'components/forms/fields/SelectField';

import DownIcon from 'assets/icons/down-chevron.svg';

interface SelectOption {
  value: string;
  label: string;
  css?: CSS;
}

const AlgoliaSelectField = connectSortBy((props) => {
  const { items, currentRefinement, refine, css } = props;

  const activeOption = items.find((item) => item.value === currentRefinement);

  if (!currentRefinement || !activeOption) {
    return null;
  }

  const handleSort = (e) => {
    const value = e.target.value;
    refine(value);
  };

  return (
    <>
      <SelectWrapper size={0} css={{ minWidth: 220, ...css }}>
        <Select
          onBlur={handleSort}
          onChange={handleSort}
          defaultValue={activeOption.value}
        >
          {items.map((item: SelectOption, i: number) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
        <Text>{activeOption.label}</Text>
        <SelectIcon css={{ marginLeft: '$2' }}>
          <DownIcon width={15} />
        </SelectIcon>
      </SelectWrapper>
    </>
  );
});

export default AlgoliaSelectField;
