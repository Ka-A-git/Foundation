import NextLink from 'next/link';

import TabHeading from 'components/tabs/TabHeading';
import TabBar from 'components/tabs/TabBar';

import Flex from 'components/base/Flex';
import TextLink from 'components/base/TextLink';

import { TabsProps } from 'types/Tabs';
import { TimeFilter } from 'types/Trending';
import TrendingTimeFilters from './TrendingTimeFilters';
import { TrendingTab } from 'pages/trending';

interface TrendingTabsProps<T> extends TabsProps<T> {
  currentTimeFilter: TimeFilter;
  setCurrentTimeFilter: (currentTimeFilter: TimeFilter) => void;
}

export default function TrendingTabs<T extends string | number>(
  props: TrendingTabsProps<T>
): JSX.Element {
  const {
    setCurrentView,
    currentView,
    tabs,
    currentTimeFilter,
    setCurrentTimeFilter,
  } = props;

  return (
    <TabBar
      css={{
        marginBottom: '$4',
        overflowX: 'scroll',
        scrollBehavior: 'smooth',
      }}
    >
      {tabs.map((tab) => (
        <TabHeading
          weight="semibold"
          size={{ '@initial': 1, '@bp0': 2 }}
          key={tab}
          isActive={currentView === tab}
          onClick={() => setCurrentView(tab)}
        >
          {tab}
        </TabHeading>
      ))}

      <Flex
        css={{
          marginLeft: 'auto',
          alignSelf: 'flex-start',
          display: 'none',
          '@bp1': { display: 'flex' },
        }}
      >
        {currentView !== TrendingTab.Auctions ? (
          <TrendingTimeFilters
            setCurrentTimeFilter={setCurrentTimeFilter}
            currentTimeFilter={currentTimeFilter}
          />
        ) : (
          <NextLink
            passHref
            href="/nfts?refinementList%5BmarketAvailability%5D%5B0%5D=LIVE_AUCTION"
          >
            <TextLink size={2}>View all auctions</TextLink>
          </NextLink>
        )}
      </Flex>
    </TabBar>
  );
}
