import { isPast } from 'date-fns';

import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import ETHinUSD from 'components/ETHinUSD';
import OfferCountdown from './OfferCountdown';
import ActivityCardHorizontal, {
  ActivityCardHorizontalProps,
  ActivityCardHorizontalHeader,
} from 'components/activity/ActivityCardHorizontal';
import ActivityCardVertical, {
  ActivityCardVerticalHeader,
} from 'components/activity/ActivityCardVertical';
import ActivityButtonLink from 'components/activity/ActivityButtonLink';
import {
  ActivityMetaPrimary,
  ActivityMetaTitle,
} from 'components/activity/ActivityMetaPrimary';

import { BasicArtwork } from 'types/Artwork';
import { ActivityCardProps } from 'components/activity/types';

import { buildArtworkPath } from 'utils/artwork/artwork';
import { formatETHWithSuffix } from 'utils/formatters';

import { OfferFragment } from 'graphql/hasura/hasura-fragments.generated';

import UserTagInline from 'components/users/UserTagInline';

interface OfferReceivedCardProps {
  offer: OfferFragment;
  artwork: BasicArtwork;
}

export default function OfferReceivedCard(
  props: OfferReceivedCardProps
): JSX.Element {
  const { offer, artwork } = props;

  if (!artwork) {
    return null;
  }

  const artworkPath = buildArtworkPath({ artwork, user: artwork.creator });
  const acceptOfferPath = `${artworkPath}/offer/accept`;

  const isExpired = isPast(new Date(`${offer?.expiresAt}Z`));

  const activityCardProps: ActivityCardProps = {
    headerSection: <ActivityCardVerticalHeader artwork={artwork} />,
    priceSection: (
      <Box>
        <ActivityMetaTitle css={{ marginBottom: '$4' }}>From</ActivityMetaTitle>
        <UserTagInline user={offer.buyer} />
      </Box>
    ),
    countdownSection: (
      <Box>
        <ActivityMetaTitle>
          {isExpired ? 'Offer expired on' : 'Offer expires in'}
        </ActivityMetaTitle>
        <OfferCountdown timestamp={offer?.expiresAt} />
      </Box>
    ),
    actionSection: (
      <Flex expandVertical>
        <ActivityMetaPrimary
          title="Offered"
          value={formatETHWithSuffix(offer.amountInETH)}
          label={<ETHinUSD amount={offer.amountInETH} />}
        />

        <Flex
          expandVertical
          css={{ justifyContent: 'flex-end', marginTop: '$4' }}
        >
          {!isExpired && (
            <ActivityButtonLink href={acceptOfferPath} color="black">
              Accept offer
            </ActivityButtonLink>
          )}
        </Flex>
      </Flex>
    ),
  };

  const activityCardHorizontalProps: ActivityCardHorizontalProps = {
    ...activityCardProps,
    headerSection: <ActivityCardHorizontalHeader artwork={artwork} />,
    artwork,
    title: artwork.name,
    creator: artwork.creator,
  };

  return (
    <>
      <ActivityCardVertical {...activityCardProps} />
      <ActivityCardHorizontal {...activityCardHorizontalProps} />
    </>
  );
}
