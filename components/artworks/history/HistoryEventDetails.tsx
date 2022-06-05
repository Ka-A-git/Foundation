import { ReactNode } from 'react';

import Grid from 'components/base/Grid';
import Text from 'components/base/Text';
import HistoryEventDate from './HistoryEventDate';

interface HistoryEventDetailsProps {
  date: string;
  children: ReactNode;
}

export default function HistoryEventDetails(
  props: HistoryEventDetailsProps
): JSX.Element {
  const { children, date } = props;

  return (
    <Grid
      css={{
        gridGap: '$1',
        '@bp1': {
          gridGap: '2px',
        },
      }}
    >
      <Text weight="semibold" size={{ '@initial': 0, '@bp0': 1 }}>
        {children}
      </Text>
      <HistoryEventDate date={date} />
    </Grid>
  );
}
