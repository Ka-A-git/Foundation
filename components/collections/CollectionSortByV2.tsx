import { ChangeEvent } from 'react';
import { useAlgoliaArtworksFilters } from 'hooks/queries/algolia/use-algolia-artworks';

import ButtonV2 from 'components/base/ButtonV2';
import SortIcon from 'assets/icons/sort-icon.svg';
import { Select } from 'components/forms/fields/SelectField';

import { AlgoliaSearchIndex } from 'types/Algolia';

type ArtworkIndex = {
  indexName: string;
  indexValue: AlgoliaSearchIndex;
};

interface CollectionSortByProps {
  contractAddress: string;
}

export default function CollectionSortBy(props: CollectionSortByProps) {
  const { contractAddress } = props;

  const [filtersData, setFilters] = useAlgoliaArtworksFilters({
    contractAddress,
  });

  const handleSort = (ev: ChangeEvent<HTMLSelectElement>) => {
    const searchIndex = ev.target.value as AlgoliaSearchIndex;
    setFilters({ searchIndex });
  };

  const mappedIndexes = artworkIndexes.map((index) => ({
    id: index.indexName,
    label: index.indexName,
    value: index.indexValue as string,
  }));

  const activeOption = artworkIndexes.find(
    (index) => index.indexValue === filtersData.searchIndex
  );

  return (
    <>
      {/* TODO: make this keyboard accessible so that
      pressing enter triggers the select menu to open */}
      <ButtonV2
        size={{ '@initial': 0, '@bp3': 1 }}
        variant="outline"
        type="button"
        icon="standalone"
      >
        <SortIcon />
        <Select
          onBlur={handleSort}
          onChange={handleSort}
          defaultValue={activeOption.indexValue}
        >
          {mappedIndexes.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </ButtonV2>

      {/* <SelectWrapper
        css={{
          minWidth: 220,
          // desktop-only
          '@bp3-max': {
            display: 'none',
          },
        }}
        tabIndex={0}
        size={1}
      >
        <Select
          tabIndex={0}
          onBlur={handleSort}
          onChange={handleSort}
          defaultValue={activeOption.indexValue}
        >
          {mappedIndexes.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
        <Text>{activeOption.indexName}</Text>
        <SelectIcon css={{ marginLeft: '$2' }}>
          <DownIcon width={15} />
        </SelectIcon>
      </SelectWrapper> */}
    </>
  );
}

const artworkIndexes: ArtworkIndex[] = [
  {
    indexName: 'Date Buy Now price set: Newest',
    indexValue: 'artworks_sort_latest_buy_now_desc',
  },
  {
    indexName: 'Date Buy Now price set: Oldest',
    indexValue: 'artworks_sort_latest_buy_now_asc',
  },
  // {
  //   indexName: 'Price: Lowest',
  //   indexValue: 'artworks_sort_price_asc',
  // },
  // {
  //   indexName: 'Price: Highest',
  //   indexValue: 'artworks_sort_price_desc',
  // },
  {
    indexName: 'Date listed: Newest',
    indexValue: 'artworks_sort_date_listed_desc',
  },
  {
    indexName: 'Date listed: Oldest',
    indexValue: 'artworks_sort_date_listed_asc',
  },
  {
    indexName: 'Ending: Soonest',
    indexValue: 'artworks_sort_date_sold_asc',
  },
  {
    indexName: 'Ending: Latest',
    indexValue: 'artworks_sort_date_sold_desc',
  },
  {
    indexName: 'Date Offer made: Oldest',
    indexValue: 'artworks_sort_latest_offer_asc',
  },
  {
    indexName: 'Date Offer made: Newest',
    indexValue: 'artworks_sort_latest_offer_desc',
  },
];
