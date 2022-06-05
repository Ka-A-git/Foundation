import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

import Link from 'components/base/Link';
import Flex from 'components/base/Flex';
import TabBar from 'components/tabs/TabBar';
import GraySquare from 'components/base/GraySquare';
import { IndexTab } from 'components/search/algolia/SearchNavigationSortBar';
import { getGridSpacingStyles } from 'utils/styles';

import useAlgoliaSearch, {
  AlgoliaSearch,
} from 'hooks/queries/algolia/use-algolia-search';

export const BrowseHeaderContainer = styled(Flex, {
  justifyContent: 'space-between',
  boxShadow: 'inset 0 -1px 0 0 #E6E6E6',
  gridGap: '$4',
  flexDirection: 'column',
  position: 'relative',
  ...getGridSpacingStyles('marginBottom'),
  '@bp1': {
    flexDirection: 'row',
  },
});

const BrowseHeaderTabContainer = styled(TabBar, {
  overflowX: 'auto',
  flexWrap: 'nowrap',
  overflowY: 'hidden',
  paddingRight: '$8',
  marginBottom: 0,
  boxShadow: 'none',
  '@bp1-max': {
    zIndex: 2,
  },
  '@bp2': {
    overflowX: 'initial',
    overflowY: 'initial',
  },
});

interface BrowseHeaderTabsProps {
  placeholderData: AlgoliaSearch;
}

export default function BrowseHeaderTabs(props: BrowseHeaderTabsProps) {
  const { placeholderData } = props;

  const { data: globalSearchData, isLoading } = useAlgoliaSearch(
    { searchTerm: '' },
    {
      placeholderData,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const { pathname } = useRouter();

  if (isLoading) {
    return (
      <Flex css={{ height: 48, alignItems: 'flex-start', gap: '$4' }}>
        <GraySquare css={{ width: 110, height: 24 }} />
        <GraySquare css={{ width: 110, height: 24 }} />
      </Flex>
    );
  }

  const results = {
    collections: globalSearchData.results[0],
    users: globalSearchData.results[1],
    artworks: globalSearchData.results[2],
  };

  return (
    <BrowseHeaderTabContainer isScrollable>
      <BrowseHeaderTab
        label="NFTs"
        href="/nfts"
        pathname={pathname}
        hitsCount={results.artworks.nbHits}
      />

      <BrowseHeaderTab
        label="Collections"
        href="/collections"
        pathname={pathname}
        hitsCount={results.collections.nbHits}
      />
      <BrowseHeaderTab
        label="Profiles"
        href="/profiles"
        pathname={pathname}
        hitsCount={results.users.nbHits}
      />
    </BrowseHeaderTabContainer>
  );
}

interface BrowseHeaderTabProps {
  href: string;
  label: string;
  pathname: string;
  hitsCount: number;
}

function BrowseHeaderTab(props: BrowseHeaderTabProps) {
  const { href, label, pathname, hitsCount } = props;
  return (
    <NextLink href={href} passHref prefetch={false}>
      <Link
        css={{
          textDecoration: 'none',
          display: 'block',
          '&:not(:last-child)': {
            marginRight: '$5',
          },
        }}
      >
        <IndexTab
          label={label}
          isActive={href === pathname}
          hitsCount={hitsCount}
        />
      </Link>
    </NextLink>
  );
}
