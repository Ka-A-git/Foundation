import * as Checkbox from '@radix-ui/react-checkbox';

import { CSS, styled } from 'stitches.config';

import Flex from 'components/base/Flex';
import Box from 'components/base/Box';
import Icon from 'components/Icon';
import Text from 'components/base/Text';

import { SearchResultHit } from 'types/Algolia';

import { formatInteger } from 'utils/formatters';
import { getFirstValue } from 'utils/helpers';

import CheckboxIcon from 'assets/icons/check-box-icon.svg';

interface AlgoliaFieldProps {
  hit: SearchResultHit;
  refine: (value: string | string[]) => void;
  css?: CSS;
}

export default function AlgoliaCheckbox(props: AlgoliaFieldProps): JSX.Element {
  const { hit, refine, css } = props;

  return (
    <CheckboxContainer
      checked={hit.isRefined}
      onCheckedChange={() => {
        refine(hit.value);
      }}
      name={getFirstValue(hit.value)}
      css={css}
    >
      <Flex css={{ alignItems: 'center' }}>
        <Box>
          {hit.isRefined ? (
            <Icon icon={CheckboxIcon} width={20} height={20} />
          ) : (
            <EmptyCheckbox />
          )}
        </Box>

        <Text
          css={{
            marginLeft: '$3',
            fontWeight: '$semibold',
            fontFamily: '$body',
            color: '$black100',
          }}
        >
          {hit.label}
        </Text>
      </Flex>

      <Box
        css={{ color: '$black50', fontWeight: '$regular', fontFamily: '$body' }}
      >
        {formatInteger(hit.count)}
      </Box>
    </CheckboxContainer>
  );
}

const EmptyCheckbox = styled(Box, {
  borderRadius: 5,
  width: 20,
  height: 20,
  border: 'solid 2px $black10',
  transition: '$1',
});

export const CheckboxContainer = styled(Checkbox.Root, {
  display: 'flex',
  backgroundColor: 'transparent',
  justifyContent: 'space-between',
  border: 'solid 2px $black5',
  minHeight: 60,
  alignItems: 'center',
  paddingLeft: '$5',
  paddingRight: '$6',
  cursor: 'pointer',
  borderRadius: '$2',
  fontFamily: '$body',
  fontSize: '$1',
  transition: '$1',
  '@hover': {
    '&:hover': {
      borderColor: '$black20',
      [`${EmptyCheckbox}`]: {
        borderColor: '$black20',
      },
    },
  },
});
