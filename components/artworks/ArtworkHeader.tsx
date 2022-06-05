import Box from 'components/base/Box';
import GraySquare from 'components/base/GraySquare';
import { H1Heading } from 'components/base/Heading';
import ArtworkInfo from './ArtworkInfo';
import MintEvent from './MintEvent';

import {
  ArtworkPageArtwork,
  ArtworkPageSplitRecipient,
} from 'queries/server/artwork-page';

import { ArtworkEvent } from 'types/Event';
import { ArtworkV2 } from 'types/Artwork';
import Account from 'types/Account';

interface ArtworkHeaderProps {
  artwork: ArtworkV2;
  collection: ArtworkPageArtwork['collection'];
  creator: Account;
  mintEvent?: ArtworkEvent;
  percentSplits: ArtworkPageSplitRecipient[];
}

export default function ArtworkHeader(props: ArtworkHeaderProps): JSX.Element {
  const { artwork, collection, creator, mintEvent, percentSplits } = props;

  return (
    <Box as="header">
      {artwork?.name ? (
        <H1Heading size={{ '@initial': 4, '@bp0': 6 }}>
          {artwork.name}
        </H1Heading>
      ) : (
        <GraySquare css={{ height: 46, width: 250, '@bp0': { height: 72 } }} />
      )}
      {mintEvent && <MintEvent mintEvent={mintEvent} />}
      <Box
        css={{
          paddingTop: '$6',
          paddingBottom: '$7',
        }}
      >
        {collection !== null && (
          <ArtworkInfo
            creator={creator}
            collection={collection}
            creatorPublicKey={creator?.publicKey}
            percentSplits={percentSplits}
          />
        )}
      </Box>
    </Box>
  );
}
