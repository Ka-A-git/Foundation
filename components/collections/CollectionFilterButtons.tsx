import { ReactNode } from 'react';

import ButtonWithCount from 'components/base/ButtonWithCount';
import ChevronButton from 'components/base/ChevronButton';
import Flex from 'components/base/Flex';

import {
  MarketAvailability,
  useAlgoliaArtworksAggregates,
  useAlgoliaArtworksFilters,
  useSetArtworkMarketAvailability,
} from 'hooks/queries/algolia/use-algolia-artworks';

import { abbreviateValue } from 'utils/formatters';

interface CollectionFilterButtonsProps {
  contractAddress: string;
}

export default function CollectionFilterButtons(
  props: CollectionFilterButtonsProps
) {
  const { contractAddress } = props;

  const [filtersData] = useAlgoliaArtworksFilters({
    contractAddress,
  });

  const setMarketAvailability = useSetArtworkMarketAvailability({
    contractAddress,
  });

  const { data: artworksAggregatesData } = useAlgoliaArtworksAggregates({
    searchIndex: filtersData.searchIndex,
    searchTerm: '',
    options: {
      facets: ['marketAvailability'],
      facetFilters: [
        'moderationStatus:ACTIVE',
        'isDeleted:false',
        `collection.contractAddress:${contractAddress}`,
      ],
    },
  });

  const marketAvailability = artworksAggregatesData?.facets?.marketAvailability;

  type AvailabilityButton = {
    value: MarketAvailability;
    label: string;
  };

  const availabilityModes: AvailabilityButton[] = [
    {
      value: 'LIVE_AUCTION',
      label: 'Live Auction',
    },
    {
      value: 'HAS_ACTIVE_BUY_NOW',
      label: 'Buy Now',
    },
    {
      value: 'RESERVE_NOT_MET',
      label: 'Reserve Price',
    },
    {
      value: 'HAS_ACTIVE_OFFER',
      label: 'Active Offers',
    },
  ];

  return (
    <Flex
      css={{
        flexDirection: 'column',
        [`& > ${ButtonWithCount.Root}:not(:last-of-type)`]: {
          marginBottom: '$3',
        },
        '@bp2': {
          flexDirection: 'row',
          [`& > ${ButtonWithCount.Root}:not(:last-of-type)`]: {
            marginRight: '$2',
            marginBottom: 0,
          },
        },
      }}
    >
      {availabilityModes.map((availabilityMode) => {
        const count = marketAvailability?.[availabilityMode.value] || 0;
        return (
          <ButtonWithCount.Root
            key={availabilityMode.value}
            size={{ '@initial': 0, '@bp3': 1 }}
            disabled={!count}
            type="button"
            variant="outline"
            pressed={filtersData.marketAvailability.includes(
              availabilityMode.value
            )}
            onClick={() => {
              setMarketAvailability(availabilityMode.value);
            }}
            fullWidth={{ '@bp2-max': true }}
          >
            {availabilityMode.label}
            <ButtonWithCount.Count>
              {abbreviateValue(count)}
            </ButtonWithCount.Count>
          </ButtonWithCount.Root>
        );
      })}
    </Flex>
  );
}

interface ToggleButtonControllerProps<T> {
  value: T;
  label: ReactNode;
  isToggled: boolean;

  onToggle: (arg0: T) => void;
}

export function ToggleButtonController<T extends string>(
  props: ToggleButtonControllerProps<T>
) {
  const { value, isToggled, label, onToggle } = props;

  return (
    <ChevronButton
      type="button"
      variant="outline"
      pressed={isToggled}
      size={1}
      onClick={() => {
        onToggle(value);
      }}
    >
      {label}
    </ChevronButton>
  );
}
