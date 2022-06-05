import { NextRouter, useRouter } from 'next/router';
import qs from 'qs';
import { css, styled } from 'stitches.config';
import { always, cond, equals } from 'ramda';

import Box from 'components/base/Box';
import Grid from 'components/base/Grid';
import RefinementFilters from 'components/search/algolia/RefinementFilters';
import AlgoliaRangeInput from 'components/forms/fields/algolia/AlgoliaRangeInput';
import CollapsibleFilterSection from 'components/search/CollapsibleFilterSection';
import { SelectIcon } from 'components/forms/fields/SelectField';

import CloseIcon from 'assets/icons/close-icon-bold.svg';

import { AlgoliaArtworkMarketAvailability } from 'types/Algolia';

export const FilterHeading = styled('div', {
  fontSize: '$2',
  fontWeight: '$semibold',
  fontFamily: '$body',
  color: '$black100',
  display: 'flex',
  cursor: 'pointer',
  background: '$white100',
  border: 'none',
  paddingX: '0',
  variants: {
    isCollapsible: {
      true: {
        paddingY: '$6',
      },
    },
    isCollapsed: {
      true: {},
    },
  },
});

function searchParams(router: NextRouter) {
  const searchIndex = router.asPath.indexOf('?');
  // If url has no search param default to empty state
  if (searchIndex === -1) {
    return {};
  }
  const search = router.asPath.substring(searchIndex + 1);
  const searchParams = qs.parse(search);
  return searchParams;
}

const getMarketLabel = (isPrimary: string): string =>
  isPrimary === 'true' ? 'Primary' : 'Secondary';

const getMarketTypeLabel = cond([
  [
    equals(AlgoliaArtworkMarketAvailability.HAS_ACTIVE_BUY_NOW),
    always('Buy Now'),
  ],
  [
    equals(AlgoliaArtworkMarketAvailability.RESERVE_NOT_MET),
    always('Reserve Price'),
  ],
  [
    equals(AlgoliaArtworkMarketAvailability.LIVE_AUCTION),
    always('Live Auction'),
  ],
  [
    equals(AlgoliaArtworkMarketAvailability.HAS_ACTIVE_OFFER),
    always('Active Offer'),
  ],
]);

const getMimeTypeLabel = cond([
  [equals('3D'), always('3D')],
  [equals('AUDIO'), always('Audio')],
  [equals('VIDEO'), always('Video')],
  [equals('IMAGE'), always('Image')],
]);

interface SelectDownIconProps {
  isCollapsed: boolean;
}

export function SelectDownIcon(props: SelectDownIconProps): JSX.Element {
  const { isCollapsed } = props;
  return (
    <SelectIcon
      css={{
        marginLeft: 'auto',
        transition: 'transform $1 $ease',
        transform: isCollapsed ? 'rotate(45deg)' : 'rotate(90deg)',
      }}
    >
      <CloseIcon width={10} />
    </SelectIcon>
  );
}

const paddingTopZero = css({
  paddingTop: '0 !important',
})();

export default function ArtworkSearchFilters(): JSX.Element {
  const router = useRouter();
  const hasPriceRangeFromUrl = Boolean(
    searchParams(router).range?.['auction.currentPrice']
  );

  return (
    <Box>
      <Grid>
        <CollapsibleFilterSection
          title="Price range"
          collapsed={false}
          className={paddingTopZero}
        >
          <AlgoliaRangeInput
            attribute="auction.currentPrice"
            hasSearchValue={hasPriceRangeFromUrl}
          />
        </CollapsibleFilterSection>
        <RefinementFilters
          attribute="marketAvailability"
          title="Availability"
          transformItems={(items) => {
            return items.map((item) => ({
              ...item,
              label: getMarketTypeLabel(item.label),
            }));
          }}
          sortOrder={[
            'Buy Now',
            'Reserve Price',
            'Live Auction',
            'Active Offer',
          ]}
          collapsed={false}
        />
        <RefinementFilters
          attribute="auction.isPrimarySale"
          title="Market"
          transformItems={(items) =>
            items.map((item) => ({
              ...item,
              label: getMarketLabel(item.label),
            }))
          }
          sortOrder={['Primary', 'Secondary']}
        />
        <RefinementFilters
          attribute="mimeTypeFacet"
          title="Type"
          transformItems={(items) =>
            items.map((item) => ({
              ...item,
              label: getMimeTypeLabel(item.label),
            }))
          }
          sortOrder={['3D', 'IMAGE', 'VIDEO']}
        />
      </Grid>
    </Box>
  );
}
