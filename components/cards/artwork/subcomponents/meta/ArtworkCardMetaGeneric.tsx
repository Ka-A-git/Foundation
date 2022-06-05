import Box from 'components/base/Box';
import ArtworkCardMetaBlock from 'components/cards/artwork/subcomponents/meta/ArtworkCardMetaBlock';
import ArtworkCardMetaContainer from 'components/cards/artwork/subcomponents/meta/ArtworkCardMetaContainer';
import AuctionCountdown from 'components/market-widget/AuctionCountdown';
import ArtworkCardMetaLabel, {
  ArtworkCardMetaValue,
} from 'components/cards/artwork/subcomponents/meta/ArtworkCardMetaLabel';
import Heading from 'components/base/Heading';
import ArtworkCardOwner from '../ArtworkCardOwner';
import Pulse from 'components/Pulse';
import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import Grid from 'components/base/Grid';
import { OfferProgressCircle } from 'components/market-widget/MarketWidgetOfferInfo';

import { notEmptyOrNil } from 'utils/helpers';
import { UserLight } from 'types/Account';
import { OfferFragment } from 'graphql/hasura/hasura-fragments.generated';

import { formatETHWithSuffix } from 'utils/formatters';

interface ArtworkMetaGenericProps {
  value?: string;
  label?: string;
  isCreatorOwner: boolean;
  owner: UserLight;
  isSecondary?: boolean;
  activeOffer?: Pick<OfferFragment, 'expiresAt' | 'amountInETH'>;
}

export default function ArtworkMetaGeneric(
  props: ArtworkMetaGenericProps
): JSX.Element {
  const {
    value,
    label,
    owner,
    isCreatorOwner,
    isSecondary = false,
    activeOffer,
  } = props;

  const hasValue = notEmptyOrNil(value);
  const hasLabel = notEmptyOrNil(label);

  const hasValueOrLabel = hasValue || hasLabel;

  return (
    <ArtworkCardMetaContainer>
      {hasValueOrLabel && (
        <ArtworkCardMetaBlock>
          {label && (
            <ArtworkCardMetaLabel color="light">{label}</ArtworkCardMetaLabel>
          )}
          {value && (
            <ArtworkCardMetaValue color={isSecondary ? 'light' : 'black'}>
              {value}
            </ArtworkCardMetaValue>
          )}
        </ArtworkCardMetaBlock>
      )}

      {/* TODO: tidy up this ternary + extract into component */}
      {activeOffer ? (
        <Grid
          css={{
            gap: '$1',
            justifyContent: 'flex-end',
            marginLeft: 'auto',
          }}
        >
          <Flex css={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            {activeOffer.expiresAt && (
              <OfferProgressCircle
                size={14}
                strokeWidth={2}
                expiryDate={activeOffer.expiresAt}
                css={{ marginRight: '$1' }}
              />
            )}

            <Text size={0} weight="semibold" css={{ color: '$black60' }}>
              {formatETHWithSuffix(activeOffer.amountInETH)}
            </Text>
          </Flex>

          {!isCreatorOwner && owner && <ArtworkCardOwner owner={owner} />}
        </Grid>
      ) : !isCreatorOwner && owner ? (
        <ArtworkCardOwner owner={owner} />
      ) : null}
    </ArtworkCardMetaContainer>
  );
}

interface ArtworkMetaLiveAuctionProps {
  value: string;
  label: string;
  endsAt: string;
}

export function ArtworkMetaLiveAuction(
  props: ArtworkMetaLiveAuctionProps
): JSX.Element {
  const { value, label, endsAt } = props;

  return (
    <ArtworkCardMetaContainer>
      <ArtworkCardMetaBlock
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 118px',
          width: '100%',
        }}
      >
        <Box css={{ position: 'relative' }}>
          <ArtworkCardMetaLabel color="dark" css={{ marginBottom: '$1' }}>
            {label}
          </ArtworkCardMetaLabel>
          <Flex>
            <Box
              css={{
                marginRight: '$1',
                marginLeft: -6,
              }}
            >
              <Pulse color="$white100" size={22} />
            </Box>
            <ArtworkCardMetaValue>{value}</ArtworkCardMetaValue>
          </Flex>
        </Box>
        <AuctionCountdown endsAt={endsAt} isCompact />
      </ArtworkCardMetaBlock>
    </ArtworkCardMetaContainer>
  );
}

export function ArtworkCardMetaEndedAuction(
  props: ArtworkMetaGenericProps
): JSX.Element {
  const { value, label } = props;

  return (
    <ArtworkCardMetaContainer>
      <ArtworkCardMetaBlock css={{ display: 'flex' }}>
        <Box>
          <ArtworkCardMetaLabel color="dark" css={{ marginBottom: '$1' }}>
            {label}
          </ArtworkCardMetaLabel>
          <ArtworkCardMetaValue>{value}</ArtworkCardMetaValue>
        </Box>
      </ArtworkCardMetaBlock>
      <Heading
        css={{
          color: '$black30',
          '@bp0-max': {
            marginBottom: '$1',
          },
        }}
      >
        Ended
      </Heading>
    </ArtworkCardMetaContainer>
  );
}
