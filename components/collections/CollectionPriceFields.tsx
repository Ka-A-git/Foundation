import Text from 'components/base/Text';
import Grid from 'components/base/Grid';
import TextFieldV2 from 'components/forms/fields/TextField';

import { CSS } from 'stitches.config';

interface CollectionPriceFieldsProps {
  min: number;
  max: number;
  css?: CSS;
}

export default function CollectionPriceFields(
  props: CollectionPriceFieldsProps
) {
  const { css } = props;

  return (
    <Grid
      css={{
        gridTemplateColumns: 'repeat(2,1fr)',
        gap: '$2',
        ...css,
      }}
    >
      <TextFieldV2
        name="min"
        meta={
          <Text
            weight="semibold"
            css={{
              color: '$black60',
              position: 'absolute',
              right: '$4',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            ETH
          </Text>
        }
        required={false}
        appearance="minimal"
      />
      <TextFieldV2
        name="max"
        meta={
          <Text
            weight="semibold"
            css={{
              color: '$black60',
              position: 'absolute',
              right: '$4',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            ETH
          </Text>
        }
        required={false}
        appearance="minimal"
      />
    </Grid>
  );
}
