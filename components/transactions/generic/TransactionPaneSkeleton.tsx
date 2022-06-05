import GraySquare from 'components/base/GraySquare';
import Grid from 'components/base/Grid';
import TransactionProgressPane from './TransactionProgressPane';

export default function TransactionPaneSkeleton() {
  return (
    <TransactionProgressPane
      title={
        <GraySquare
          css={{
            height: 46,
            width: 240,
            backgroundColor: '$black5',
          }}
        />
      }
      description={
        <Grid css={{ gap: '$3' }}>
          <GraySquare
            css={{ height: 24, width: 320, backgroundColor: '$black5' }}
          />
          <GraySquare
            css={{ height: 24, width: 260, backgroundColor: '$black5' }}
          />
        </Grid>
      }
      key="skeleton"
      status="pending"
      meta={null}
    />
  );
}
