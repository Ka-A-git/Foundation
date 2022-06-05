import Box from 'components/base/Box';
import Card from 'components/base/Card';
import GraySquare from 'components/base/GraySquare';
import AspectRatio from 'components/base/AspectRatio';
import ArtworkCardHeader from './subcomponents/ArtworkCardHeader';

export default function ArtworkCardSkeleton(): JSX.Element {
  return (
    <Card
      css={{
        display: 'flex',
        flex: 'auto',
        flexDirection: 'column',
        pointerEvents: 'none',
      }}
    >
      <AspectRatio
        ratio={1}
        css={{
          borderTopLeftRadius: '$2',
          borderTopRightRadius: '$2',
          backgroundColor: '$black5',
        }}
      />
      <Box
        css={{
          background: '$white100',
          borderBottomLeftRadius: '$2',
          borderBottomRightRadius: '$2',
        }}
      >
        <ArtworkCardHeader>
          <GraySquare
            css={{
              height: 28,
              width: 28,
              borderRadius: '$round',
            }}
          />
        </ArtworkCardHeader>
      </Box>
    </Card>
  );
}
