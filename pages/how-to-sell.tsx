import { useCallback } from 'react';
import { useAccount } from 'wagmi';

import InnerParagraph from 'components/homepage/InnerParagraph';
import MarketingFooter from 'components/homepage/MarketingFooter';
import MarketingHero from 'components/homepage/MarketingHero';
import MarketingPage from 'components/homepage/MarketingPage';
import SplitSection from 'components/homepage/SplitSection';

import { onGridPx } from 'utils/styles';

import useSegmentEvent from 'hooks/analytics/use-segment-event';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import { MarketingPageType } from 'types/Marketing';
import { getUsernameOrAddress } from 'utils/helpers';

export default function HowToSellPage(): JSX.Element {
  const [{ data: user }] = useAccount();
  const [sendSegmentEvent] = useSegmentEvent();
  const publicKey = user?.address;
  const isConnected = Boolean(publicKey);
  const { data: userData } = useUserByPublicKey({
    publicKey,
  });
  const userNameOrAddress = getUsernameOrAddress(userData?.user);

  const heroHeading = 'Your creativity is valuable in web3.';
  const ctaLink = {
    href: isConnected ? `/${userNameOrAddress}?tab=owned` : '/connect-wallet',
    text: 'Start selling',
  };

  const handleTopCTASegmentEvent = useCallback(
    (page: MarketingPageType) => {
      sendSegmentEvent({
        eventName: 'marketing_top_cta_clicked',
        payload: { page },
      });
    },
    [sendSegmentEvent]
  );

  const handleStickyCTASegmentEvent = useCallback(
    (page: MarketingPageType) => {
      sendSegmentEvent({
        eventName: 'marketing_sticky_header_cta_clicked',
        payload: { page },
      });
    },
    [sendSegmentEvent]
  );

  const handleBottomCTASegmentEvent = useCallback(
    (page: MarketingPageType) => {
      sendSegmentEvent({
        eventName: 'marketing_bottom_cta_clicked',
        payload: { page },
      });
    },
    [sendSegmentEvent]
  );

  return (
    <MarketingPage
      ogImage="https://foundation.app/how-to-sell-opengraph.png"
      footer={
        <MarketingFooter
          heading="The web3 creative community lives here."
          link={{
            ...ctaLink,
            onClick: () => handleBottomCTASegmentEvent('sell'),
          }}
          paragraph="Connect with the like-minded creators and future-focused collectors who are on this journey with you."
        />
      }
      header={
        <MarketingHero
          imagePrefix="sell"
          heading={heroHeading}
          link={{
            ...ctaLink,
            onClick: () => handleTopCTASegmentEvent('sell'),
          }}
          headingMaxWidth={onGridPx(303)}
          paragraph="The tools you need to build and trade your NFT collection are all right here."
          preHeading="How to sell on Foundation"
        />
      }
      heading={heroHeading}
      link={{
        ...ctaLink,
        onClick: () => handleStickyCTASegmentEvent('sell'),
      }}
      title="How to collect NFTs"
    >
      <SplitSection
        illustration={{
          alt: '',
          src: '/images/homepage/illustrations/marketplace-sell--buy-now.png',
          src2x:
            '/images/homepage/illustrations/marketplace-sell--buy-now@2x.png',
        }}
      >
        <InnerParagraph
          heading="Know your worth. Name your price."
          paragraph="Once you set a Buy Now price, anyone on Foundation can buy the NFT—and you can get paid—instantly."
          paragraphMaxWidth={onGridPx(126)}
          preHeading="Buy now"
        />
      </SplitSection>
      <SplitSection
        illustration={{
          alt: '',
          src: '/images/homepage/illustrations/marketplace-sell--offers.png',
          src2x:
            '/images/homepage/illustrations/marketplace-sell--offers@2x.png',
        }}
      >
        <InnerParagraph
          heading="Let the Offers roll in."
          headingMaxWidth={onGridPx(105)}
          paragraph="You can receive Offers on all of your NFTs on Foundation, at any time. Let collectors come to you, and accept an Offer before the clock runs out."
          paragraphMaxWidth={onGridPx(126)}
          preHeading="Offers"
        />
      </SplitSection>
      <SplitSection
        illustration={{
          alt: '',
          src: '/images/homepage/illustrations/marketplace-sell--auction.png',
          src2x:
            '/images/homepage/illustrations/marketplace-sell--auction@2x.png',
        }}
      >
        <InnerParagraph
          heading="Make a moment that’s yours."
          paragraph="Set a reserve price and list any NFT for auction on Foundation. Once the first bid is placed, sit back and watch the final countdown with your community."
          paragraphMaxWidth={onGridPx(126)}
          preHeading="Auctions"
        />
      </SplitSection>
    </MarketingPage>
  );
}
