import Text from 'components/base/Text';
import { CSS } from 'stitches.config';

interface TableCellTextProps {
  value: string;
  css?: CSS;
}

export default function TableCellText(props: TableCellTextProps) {
  const { value, css } = props;
  return (
    <Text size={{ '@initial': 0, '@bp2': 2 }} weight="semibold" css={css}>
      {value}
    </Text>
  );
}
