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
import Icon from 'components/Icon';
import BidActionTitle from 'components/bids/BidActionTitle';

import { BasicArtwork } from 'types/Artwork';
import { ActivityCardProps } from 'components/activity/types';

import { buildArtworkPath } from 'utils/artwork/artwork';
import { formatETHWithSuffix } from 'utils/formatters';

import { OfferFragment } from 'graphql/hasura/hasura-fragments.generated';

import SuccessIcon from 'assets/icons/tx-success.svg';
import RevenueIcon from 'assets/icons/revenue-icon.svg';
import { OfferStatus } from 'types/Offer';
import Paragraph from 'components/base/Paragraph';

interface OfferActivityCardProps {
  offer: OfferFragment;
  artwork: BasicArtwork;
}

export default function OfferActivityCard(
  props: OfferActivityCardProps
): JSX.Element {
  const { offer, artwork } = props;

  if (!artwork) {
    return null;
  }

  const artworkPath = buildArtworkPath({ artwork, user: artwork.creator });
  const offerPath = `${artworkPath}/offer`;

  const isExpired = isPast(new Date(`${offer?.expiresAt}Z`));

  const activityCardProps: ActivityCardProps = {
    headerSection: <ActivityCardVerticalHeader artwork={artwork} />,
    priceSection: (
      <Box>
        <ActivityMetaPrimary
          title="Offer"
          value={formatETHWithSuffix(offer.amountInETH)}
          label={<ETHinUSD amount={offer.amountInETH} />}
        />
      </Box>
    ),
    countdownSection: (
      <Box>
        {offer?.status !== OfferStatus.Outbid && (
          <>
            <ActivityMetaTitle>
              {isExpired ? 'Offer expired on' : 'Offer expires in'}
            </ActivityMetaTitle>
            <OfferCountdown timestamp={offer?.expiresAt} />
          </>
        )}
      </Box>
    ),
    actionSection: (
      <Flex expandVertical>
        {offer?.status === OfferStatus.Highest ? (
          <>
            <Flex css={{ marginBottom: '$3' }}>
              <HighestOfferStatus />
            </Flex>
            <Flex expandVertical css={{ justifyContent: 'flex-end' }}>
              <ActivityButtonLink href={artworkPath} color="white">
                View NFT
              </ActivityButtonLink>
            </Flex>
          </>
        ) : (
          <>
            <Flex css={{ marginBottom: '$3' }}>
              <OutbidOfferStatus />
            </Flex>
            <Flex expandVertical css={{ justifyContent: 'flex-end' }}>
              <ActivityButtonLink href={offerPath} color="black">
                Place higher offer
              </ActivityButtonLink>
            </Flex>
          </>
        )}
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

function HighestOfferStatus(): JSX.Element {
  return (
    <Flex css={{ alignItems: 'center', color: '$green100' }}>
      <Icon icon={SuccessIcon} width={20} height={20} />
      <BidActionTitle alignment="right">Highest Offer</BidActionTitle>
    </Flex>
  );
}

function OutbidOfferStatus(): JSX.Element {
  return (
    <Box>
      <Flex css={{ alignItems: 'center', marginBottom: '$3' }}>
        <Icon icon={RevenueIcon} width={20} height={20} />
        <BidActionTitle css={{ marginLeft: '$2' }} alignment="right">
          Refunded
        </BidActionTitle>
      </Flex>
      <Paragraph size="sub">
        You were out-offered. You have been refunded your Offer Balance.
      </Paragraph>
    </Box>
  );
}
