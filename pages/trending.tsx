import { styled } from 'stitches.config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import Text from 'components/base/Text';
import Body from 'components/base/Body';
import Page from 'components/Page';
import Flex from 'components/base/Flex';
import GraySquare from 'components/base/GraySquare';
import TextLink from 'components/base/TextLink';

import TrendingTabs from 'components/trending/TrendingTabs';
import TrendingTimeFilters from 'components/trending/TrendingTimeFilters';
import TrendingCreatorsTable from 'components/trending/TrendingCreatorsTable';
import TrendingCollectorsTable from 'components/trending/TrendingCollectorsTable';
import TrendingCollectionsTable from 'components/trending/TrendingCollectionsTable';
import TrendingAuctions from 'components/artworks/TrendingAuctions';

import { getFirstValue } from 'utils/helpers';

import { TimeFilter } from 'types/Trending';

export enum TrendingTab {
  Creators = 'Creators',
  Collectors = 'Collectors',
  Collections = 'Collections',
  Auctions = 'Auctions',
}

const PageHeading = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$semibold',
  fontSize: '$4',
  letterSpacing: -1,
  marginBottom: '$6',
  textAlign: 'center',
  '@bp2': {
    fontSize: '$5',
  },
  '@bp4': {
    textAlign: 'left',
    marginBottom: '$9',
  },
});

export default function TrendingPage(): JSX.Element {
  const router = useRouter();
  const isRouterReady = router.isReady;
  const [activeTab, setActiveTab] = useState(TrendingTab.Collections);
  const [activeTimeFilter, setTimeFilter] = useState(TimeFilter.OneDay);

  useEffect(() => {
    if (!isRouterReady) {
      return;
    }
    const tab = getFirstValue(router.query.tab as unknown as TrendingTab);
    const time = getFirstValue(router.query.time as unknown as TimeFilter);

    switch (tab) {
      case TrendingTab.Collectors:
        setActiveTab(TrendingTab.Collectors);
        break;
      case TrendingTab.Collections:
        setActiveTab(TrendingTab.Collections);
        break;
      case TrendingTab.Creators:
        setActiveTab(TrendingTab.Creators);
        break;
      case TrendingTab.Auctions:
        setActiveTab(TrendingTab.Auctions);
        break;
    }

    switch (Number(time)) {
      case TimeFilter.SevenDay:
        setTimeFilter(TimeFilter.SevenDay);
        break;
      case TimeFilter.ThirtyDay:
        setTimeFilter(TimeFilter.ThirtyDay);
        break;
      case TimeFilter.AllTime:
        setTimeFilter(TimeFilter.AllTime);
        break;
    }
  }, [router, isRouterReady]);

  const handleSetActiveTab = (value: TrendingTab) => {
    setActiveTab(value);
    const pathname = router?.pathname;
    const query = router?.query;
    router.replace({ pathname, query: { ...query, tab: value } });
  };

  const handleSetTimeFilter = (value: TimeFilter) => {
    setTimeFilter(value);
    const pathname = router?.pathname;
    const query = router?.query;
    router.replace({ pathname, query: { ...query, time: value } });
  };

  return (
    <Page title="Trending">
      <Body
        css={{ paddingTop: '$8', paddingX: '$6', '@bp4': { paddingX: '$8' } }}
      >
        <PageHeading>
          {isRouterReady ? (
            `Trending ${activeTab}`
          ) : (
            <GraySquare
              css={{
                width: 300,
                height: 59,
                display: 'inline-block',
                '@bp2': {
                  height: 46,
                },
              }}
            />
          )}
        </PageHeading>

        <Flex
          css={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '$7',
            '@bp1': { display: 'none' },
          }}
        >
          {activeTab !== TrendingTab.Auctions ? (
            <TrendingTimeFilters
              setCurrentTimeFilter={(activeTimeFilter) =>
                handleSetTimeFilter(activeTimeFilter)
              }
              currentTimeFilter={activeTimeFilter}
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

        <TrendingTabs
          tabs={[
            TrendingTab.Collections,
            TrendingTab.Creators,
            TrendingTab.Collectors,
            TrendingTab.Auctions,
          ]}
          currentView={activeTab}
          setCurrentView={(activeTab) => handleSetActiveTab(activeTab)}
          currentTimeFilter={activeTimeFilter}
          setCurrentTimeFilter={(activeTimeFilter) =>
            handleSetTimeFilter(activeTimeFilter)
          }
        />

        {activeTab === TrendingTab.Creators && (
          <TrendingCreatorsTable activeTimeFilter={activeTimeFilter} />
        )}

        {activeTab === TrendingTab.Collectors && (
          <TrendingCollectorsTable activeTimeFilter={activeTimeFilter} />
        )}

        {activeTab === TrendingTab.Collections && (
          <TrendingCollectionsTable activeTimeFilter={activeTimeFilter} />
        )}

        {activeTab === TrendingTab.Auctions && <TrendingAuctions />}
      </Body>
    </Page>
  );
}
