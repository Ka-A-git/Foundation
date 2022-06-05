import Grid from 'components/base/Grid';
import Heading from 'components/base/Heading';
import GraySquare from 'components/base/GraySquare';
import HistoryEvent from './history/HistoryEvent';
import Box from 'components/base/Box';

import { getArtworkHistory, removeDuplicateSaleEvents } from 'utils/history';
import { areKeysEqual } from 'utils/users';

import { ArtworkActivitySelected } from 'hooks/queries/hasura/artworks/use-artwork-activity';

import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';

import { ArtworkEvent } from 'types/Event';
import { ArtworkV2 } from 'types/Artwork';
import { ComputedArtworkStatus } from 'types/artwork/artwork';

interface ArtworkProvenanceProps {
  artwork: ArtworkV2;
  artworkActivityData: ArtworkActivitySelected;
  history: ArtworkEvent[];
  historyUsersData: UserFragment[];
  isLoading: boolean;
  status: ComputedArtworkStatus;
}

export default function ArtworkProvenance(
  props: ArtworkProvenanceProps
): JSX.Element {
  const {
    artwork,
    artworkActivityData,
    history,
    historyUsersData: users,
    isLoading,
    status,
  } = props;

  if (isLoading) {
    return <BidRowSkeletonBlock />;
  }

  if (!artworkActivityData || !artwork) {
    return null;
  }

  const artworkEvents = getArtworkHistory(
    history,
    artworkActivityData.activeAuction
  );

  const filteredArtworkEvents = removeDuplicateSaleEvents(artworkEvents);

  return (
    <Box>
      <Heading
        size={{ '@initial': 2, '@bp0': 3 }}
        css={{
          marginBottom: '$6',
          borderBottom: '1px solid $black10',
          paddingBottom: '$5',
        }}
      >
        Provenance
      </Heading>
      <Grid css={{ gridGap: '$2' }}>
        {filteredArtworkEvents.map((event, index) => {
          const userFrom = users.find((user) =>
            areKeysEqual([user.publicKey, event.data.fromAddress])
          );

          return (
            <HistoryEvent
              auctionEndsAt={artworkActivityData?.activeAuction?.endsAt}
              artwork={artwork}
              status={status}
              key={index}
              historyEvent={event}
              userFrom={userFrom || event.user}
              userTo={users.find((user) =>
                areKeysEqual([user.publicKey, event.data.toAddress])
              )}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

function BidRowSkeletonBlock() {
  return (
    <Box>
      <Heading
        size={{ '@initial': 2, '@bp0': 3 }}
        css={{
          marginBottom: '$6',
          borderBottom: '1px solid $black10',
          paddingBottom: '$5',
        }}
      >
        Provenance
      </Heading>
      <Grid css={{ gridGap: '$2' }}>
        {[...Array(4)].map((_, index) => (
          <GraySquare
            css={{
              borderRadius: '$2',
              backgroundColor: '$black5',
              width: '100%',
              height: 76,
            }}
            key={index}
          />
        ))}
      </Grid>
    </Box>
  );
}
