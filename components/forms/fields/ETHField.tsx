import { useField } from 'formik';

import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import Input from 'components/base/Input';
import Text from 'components/base/Text';

import ETHIcon from 'assets/icons/eth-input-icon.svg';

interface ETHFieldProps {
  name: string;
  autoFocus?: boolean;
  placeholder: string;
}

export default function ETHField(props: ETHFieldProps): JSX.Element {
  const { name, autoFocus } = props;

  const [field] = useField(name);

  return (
    <Box
      css={{
        width: '100%',
        position: 'relative',
        fontSize: '$2',
        '@bp0': { fontSize: '$5' },
      }}
    >
      <Flex
        css={{
          backgroundColor: '$black100',
          borderRadius: '$3',
        }}
      >
        <Box>
          <Input
            {...field}
            {...props}
            type="number"
            step="any"
            inputMode="decimal"
            autoFocus={autoFocus}
            onWheel={(ev) => ev.currentTarget.blur()}
            css={{
              width: '100%',
              fontFamily: '$mono',
              border: 'solid 4px transparent',
              borderRadius: 'calc($3 - 1px)',
              paddingX: '$4',
              fontSize: 'inherit',
              fontWeight: '$regular',
              outline: 'none',
              boxShadow: '$0, 0 0 1px $colors$black20',
              transition: 'box-shadow $1 $ease, border-color $1 $ease',
              appearance: 'none',
              '&:focus': {
                boxShadow: '$1',
                borderColor: '$black100',
              },
              '&::placeholder': {
                color: '$black20',
              },
              '&::-webkit-outer-spin-button': {
                appearance: 'none',
              },
              '&::-webkit-inner-spin-button': {
                appearance: 'none',
              },
              '@bp0': {
                minHeight: 70,
              },
            }}
          />
        </Box>

        <Flex
          css={{
            paddingX: '$4',
            alignItems: 'center',

            flexShrink: 0,
          }}
        >
          <Text
            weight="semibold"
            size={{ '@initial': 2, '@bp0': 4 }}
            css={{
              color: '$white100',
              position: 'relative',
              top: -2,
              marginRight: 10,
            }}
          >
            ETH
          </Text>
          <ETHIcon
            css={{ display: 'block', flexShrink: 0 }}
            width={18}
            height={27}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
