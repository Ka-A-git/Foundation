import algoliasearch from 'algoliasearch/lite';
import {
  AlgoliaIndexName,
  AlgoliaArtworkMarketAvailability,
} from 'types/Algolia';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export default searchClient;

export const algoliaArtworksIndexes: AlgoliaIndexName[] = [
  {
    label: 'Date Buy Now price set: Newest',
    value: 'artworks_sort_latest_buy_now_desc',
    enabledModes: [AlgoliaArtworkMarketAvailability.HAS_ACTIVE_BUY_NOW],
  },
  {
    label: 'Date Buy Now price set: Oldest',
    value: 'artworks_sort_latest_buy_now_asc',
    enabledModes: [AlgoliaArtworkMarketAvailability.HAS_ACTIVE_BUY_NOW],
  },
  {
    label: 'Date listed: Newest',
    value: 'artworks_sort_date_listed_desc',
    enabledModes: [AlgoliaArtworkMarketAvailability.RESERVE_NOT_MET],
  },
  {
    label: 'Date listed: Oldest',
    value: 'artworks_sort_date_listed_asc',
    enabledModes: [AlgoliaArtworkMarketAvailability.RESERVE_NOT_MET],
  },
  {
    label: 'Ending: Soonest',
    value: 'artworks_sort_date_sold_asc',
    enabledModes: [AlgoliaArtworkMarketAvailability.LIVE_AUCTION],
  },
  {
    label: 'Ending: Latest',
    value: 'artworks_sort_date_sold_desc',
    enabledModes: [AlgoliaArtworkMarketAvailability.LIVE_AUCTION],
  },
  {
    label: 'Date Offer made: Oldest',
    value: 'artworks_sort_latest_offer_asc',
    enabledModes: [AlgoliaArtworkMarketAvailability.HAS_ACTIVE_OFFER],
  },
  {
    label: 'Date Offer made: Newest',
    value: 'artworks_sort_latest_offer_desc',
    enabledModes: [AlgoliaArtworkMarketAvailability.HAS_ACTIVE_OFFER],
  },
];

export const algoliaUsersIndexes: AlgoliaIndexName[] = [
  {
    label: 'Total Volume',
    value: 'users_sort_total_vol_desc',
    enabledModes: [],
  },
  {
    label: 'Newest to Oldest',
    value: 'users_sort_date_joined_desc',
    enabledModes: [],
  },
  {
    label: 'Oldest to Newest',
    value: 'users_sort_date_joined_asc',
    enabledModes: [],
  },
  {
    label: 'Most Minted',
    value: 'users_sort_num_minted_desc',
    enabledModes: [],
  },
  { label: 'Most Sold', value: 'users_sort_num_sold_desc', enabledModes: [] },
];
