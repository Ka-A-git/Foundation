import { styled, theme } from 'stitches.config';
import { useState } from 'react';
import { length } from 'ramda';
import { useAccount } from 'wagmi';

import Box from 'components/base/Box';
import Heading from 'components/base/Heading';
import Page from 'components/Page';
import Body from 'components/base/Body';
import {
  OffersTable,
  PrimaryBidsTable,
  SecondaryBidsTable,
} from 'components/bids/BidsTable';
import BidsEmptyState from 'components/bids/BidsEmptyState';
import LoadingPage from 'components/LoadingPage';
import ProfileCollectionTabLabel from 'components/profiles/ProfileCollectionTabLabel';
import { Tab, TabsWithLabels } from 'components/tabs/Tabs';

import useUserBids from 'hooks/queries/hasura/markets/use-user-bids';
import { useUserOffers } from 'graphql/hasura/queries/user-offers.generated';
import useBodyColor from 'hooks/use-body-color';

import { isAnyTrue, notEmptyOrNil } from 'utils/helpers';

import { PageType } from 'types/page';
import { OfferFragment } from 'graphql/hasura/hasura-fragments.generated';
import { OfferStatus } from 'types/Offer';

enum BidTab {
  BidsPlaced = 'Bids Placed',
  BidsReceived = 'Bids Received',
}

enum OffersTab {
  Sent = 'Sent',
  Received = 'Received',
}

const PageHeading = styled(Heading, {
  textAlign: 'center',
  marginBottom: '$8',
  '@bp1': {
    paddingTop: '$8',
    marginBottom: '$10',
  },
});

const SectionHeading = styled(Heading, {
  textAlign: 'center',
  marginBottom: '$6',
  '@bp1': {
    marginBottom: '$7',
  },
});

const currentDate = new Date().toISOString();

export default function Activity(): JSX.Element {
  const [{ data: user, loading: userLoading }] = useAccount();
  useBodyColor(theme.colors.black5.value);

  const publicAddress = user?.address;

  const [currentTab, setCurrentTab] = useState<string>(BidTab.BidsPlaced);

  const [currentTabOffers, setCurrentTabOffers] = useState<string>(
    OffersTab.Sent
  );

  const { data: offersData, isLoading: offersLoading } = useUserOffers(
    { publicKey: publicAddress, currentDate },
    { enabled: Boolean(publicAddress) }
  );

  const offersSent = offersData?.offersMade ?? [];
  const offersReceived = offersData?.offersReceived ?? [];

  const offersSentDeduped = Object.values<OfferFragment>(
    offersSent.reduce((acc, curr) => {
      if (acc[curr.artwork.id] && curr.status !== OfferStatus.Outbid) {
        acc[curr.artwork.id] = curr;
      } else {
        acc[curr.artwork.id] = curr;
      }

      return acc;
    }, {})
  );

  const { data: bidsData, isLoading: isBidsLoading } = useUserBids({
    publicKey: publicAddress,
  });

  const isLoading = isAnyTrue([isBidsLoading, userLoading, offersLoading]);

  const hasPlacedBids = notEmptyOrNil(bidsData?.bidsPlaced);
  const hasReceivedBids = notEmptyOrNil(bidsData?.bidsReceived);

  const hasOffersSent = notEmptyOrNil(offersSentDeduped);
  const hasOffersReceived = notEmptyOrNil(offersReceived);

  const hasAnyActivity = isAnyTrue([
    hasPlacedBids,
    hasReceivedBids,
    hasOffersSent,
    hasOffersReceived,
  ]);

  return (
    <Page title="Activity" type={PageType.auth}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Body>
          <Box css={{ maxWidth: 1280, width: '100%', marginX: 'auto' }}>
            <PageHeading size={{ '@initial': 4, '@bp1': 5 }}>
              Activity
            </PageHeading>

            {!hasAnyActivity ? (
              <BidsEmptyState />
            ) : (
              <>
                <SectionHeading size={{ '@initial': 3, '@bp1': 4 }}>
                  Auctions
                </SectionHeading>
                <Box css={{ '@bp0': { marginBottom: '$7' } }}>
                  <TabsWithLabels<Tab, string>
                    tabs={[
                      {
                        label: (
                          <ProfileCollectionTabLabel
                            label="Bids Placed"
                            count={length(bidsData?.bidsPlaced)}
                            showCount={true}
                          />
                        ),
                        value: BidTab.BidsPlaced,
                      },
                      {
                        label: (
                          <ProfileCollectionTabLabel
                            label="Bids Received"
                            count={length(bidsData?.bidsReceived)}
                            showCount={true}
                          />
                        ),
                        value: BidTab.BidsReceived,
                      },
                    ]}
                    setCurrentView={setCurrentTab}
                    currentView={currentTab}
                  />
                </Box>

                {currentTab === BidTab.BidsPlaced && (
                  <PrimaryBidsTable bids={bidsData?.bidsPlaced} />
                )}

                {currentTab === BidTab.BidsReceived && (
                  <SecondaryBidsTable bids={bidsData?.bidsReceived} />
                )}

                <SectionHeading size={{ '@initial': 3, '@bp1': 4 }}>
                  Active offers
                </SectionHeading>

                <Box css={{ '@bp0': { marginBottom: '$7' } }}>
                  <TabsWithLabels<Tab, string>
                    tabs={[
                      {
                        label: (
                          <ProfileCollectionTabLabel
                            label="Sent"
                            count={length(offersSentDeduped)}
                            showCount={true}
                          />
                        ),
                        value: OffersTab.Sent,
                      },
                      {
                        label: (
                          <ProfileCollectionTabLabel
                            label="Received"
                            count={length(offersReceived)}
                            showCount={true}
                          />
                        ),
                        value: OffersTab.Received,
                      },
                    ]}
                    setCurrentView={setCurrentTabOffers}
                    currentView={currentTabOffers}
                  />
                </Box>

                {currentTabOffers === OffersTab.Received && (
                  <OffersTable offers={offersReceived} type="received" />
                )}

                {currentTabOffers === OffersTab.Sent && (
                  <OffersTable offers={offersSentDeduped} type="sent" />
                )}
              </>
            )}
          </Box>
        </Body>
      )}
    </Page>
  );
}
