import { useRouter, NextRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import Text from 'components/base/Text';
import { TabLink } from 'components/tabs/Tabs';

import { CollectionFragment } from 'graphql/hasura/hasura-fragments.generated';

import { maybeLowerCase } from 'utils/case';
import { getFirstValue, isAllTrue } from 'utils/helpers';

export type CollectionTabValue = 'Artworks' | 'Description' | 'Activity';

export type CollectionTab = TabLink & {
  label: ReactNode;
  value: CollectionTabValue;
  enabled: boolean;
};

interface CollectionTabsArgs {
  collection: CollectionFragment;
}

export default function useCollectionTabs(args: CollectionTabsArgs) {
  const { collection } = args;

  const router = useRouter();

  const currentTabParam = getFirstValue(router.query.tab) as CollectionTabValue;

  const tabs: CollectionTab[] = [
    {
      label: <Text>NFTs</Text>,
      value: 'Artworks',
      enabled: true,
      href: buildTabRoute(router, 'Artworks'),
      isActive:
        isAllTrue([router.isReady, !currentTabParam]) ||
        isRouteActive(router, 'Artworks'),
    },
    {
      label: <Text>Description</Text>,
      value: 'Description',
      enabled: Boolean(collection?.description),
      href: buildTabRoute(router, 'Description'),
      isActive: isRouteActive(router, 'Description'),
    },
    {
      label: <Text>Activity</Text>,
      value: 'Activity',
      enabled: true,
      href: buildTabRoute(router, 'Activity'),
      isActive: isRouteActive(router, 'Activity'),
    },
  ];

  const defaultTabValue: CollectionTabValue = 'Artworks';

  const currentTab = maybeLowerCase(currentTabParam || defaultTabValue);
  const currentActiveTab = tabs.find(
    (tab) => maybeLowerCase(tab.value) === currentTab
  );

  const currentTabIsDisabled = !currentActiveTab.enabled;

  // when the tab is disabled, push back to the default one
  useEffect(() => {
    if (currentTabIsDisabled) {
      router.push(buildTabRoute(router, defaultTabValue));
    }
  }, [currentTabIsDisabled]);

  return {
    tabs: tabs.filter((tab) => tab.enabled),
    currentTab,
  };
}

const buildTabRoute = (router: NextRouter, tab: CollectionTabValue) => {
  return `/collection/${router.query.addressOrSlug}?tab=${maybeLowerCase(tab)}`;
};

const isRouteActive = (router: NextRouter, tab: CollectionTabValue) => {
  return isAllTrue([router.isReady, router.query.tab === maybeLowerCase(tab)]);
};

export function isTabActive<T extends string>(tabValue: T, activeTabValue: T) {
  return maybeLowerCase(tabValue) === maybeLowerCase(activeTabValue);
}
