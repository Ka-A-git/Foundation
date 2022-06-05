import { css } from 'stitches.config';
import { always, cond, equals } from 'ramda';

import Box from 'components/base/Box';
import Grid from 'components/base/Grid';

import RefinementFilters from 'components/search/algolia/RefinementFilters';
import CollapsibleFilterSection from '../CollapsibleFilterSection';
import AlgoliaRangeInput from 'components/forms/fields/algolia/AlgoliaRangeInput';

import { AlgoliaArtworkMarketAvailability } from 'types/Algolia';

const paddingTopZero = css({
  paddingTop: '0 !important',
})();

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

export default function TagSearchFilters(): JSX.Element {
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
            hasSearchValue={false}
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
          collapsed={false}
        />

        <RefinementFilters
          attribute="mimeTypeFacet"
          title="Type"
          sortOrder={['3D', 'IMAGE', 'VIDEO']}
        />
      </Grid>
    </Box>
  );
}
