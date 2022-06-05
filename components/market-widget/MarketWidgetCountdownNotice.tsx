import Box from 'components/base/Box';
import Text from 'components/base/Text';

interface MarketWidgetCountdownNoticeProps {
  title: string;
  subtitle: string;
}

export default function MarketWidgetCountdownNotice(
  props: MarketWidgetCountdownNoticeProps
) {
  const { title, subtitle } = props;
  return (
    <Box
      css={{
        backgroundColor: '$black5',
        borderRadius: '$2',
        paddingX: '$4',
        paddingY: '$3',
      }}
    >
      <Text weight="semibold" size={0}>
        {title}
      </Text>
      <Text size={0} css={{ color: '$black70' }}>
        {subtitle}
      </Text>
    </Box>
  );
}
