import { useCallback } from 'react';
 
import MarketingHero from 'components/homepage/MarketingHero';
import MarketingFooter from 'components/homepage/MarketingFooter';
import MarketingPage from 'components/homepage/MarketingPage';
import SplitSection from 'components/homepage/SplitSection';
import InnerParagraph from 'components/homepage/InnerParagraph';

import { onGridPx } from 'utils/styles';

import useSegmentEvent from 'hooks/analytics/use-segment-event';

import { MarketingPageType } from 'types/Marketing';

export default function HowToCollectPage(): JSX.Element {
  const [sendSegmentEvent] = useSegmentEvent();

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

  const ctaLink = {
    href: '/feed',
    text: 'Start collecting',
  };
  const heroHeading = 'Connect and collect NFTs.';
  return (
    <MarketingPage
      ogImage="https://foundation.app/how-to-collect-opengraph.png"
      footer={
        <MarketingFooter
          heading="Your web3 journey starts here."
          link={{
            ...ctaLink,
            onClick: () => handleBottomCTASegmentEvent('collect'),
          }}
          maxWidth={onGridPx(120)}
          paragraph="Explore Foundation and discover the community who is on this adventure with you."
        />
      }
      header={
        <MarketingHero
          imagePrefix="collect"
          heading={heroHeading}
          link={{
            ...ctaLink,
            onClick: () => handleTopCTASegmentEvent('collect'),
          }}
          headingMaxWidth={920}
          paragraph="All of the trusted, on-chain marketplace features you need to start building your collection are right here."
          preHeading="Foundation's marketplace"
        />
      }
      heading={heroHeading}
      link={{
        ...ctaLink,
        onClick: () => handleStickyCTASegmentEvent('collect'),
      }}
      title="How to collect NFTs"
    >
      <SplitSection
        illustration={{
          alt: 'Drag. Drop. Mint.',
          src: '/images/homepage/illustrations/marketplace-collect--buy-now.png',
          src2x:
            '/images/homepage/illustrations/marketplace-collect--buy-now@2x.png',
        }}
      >
        <InnerParagraph
          heading="Want it. Need it. Buy it Now."
          paragraph="With Buy Now, you get the instant gratification of adding any NFT to your collection immediately. No competing, it’s instantly yours."
          paragraphMaxWidth={onGridPx(112)}
          preHeading="Buy now"
        />
      </SplitSection>
      <SplitSection
        illustration={{
          alt: 'Drag. Drop. Mint.',
          src: '/images/homepage/illustrations/marketplace-collect--offers.png',
          src2x:
            '/images/homepage/illustrations/marketplace-collect--offers@2x.png',
        }}
      >
        <InnerParagraph
          heading="Get what you want, at the price you want."
          paragraph="All NFTs are available for Offer on Foundation. Get a sweet deal by making an on-chain offer that can’t be refused."
          paragraphMaxWidth={onGridPx(112)}
          preHeading="Offers"
        />
      </SplitSection>
      <SplitSection
        illustration={{
          alt: 'Drag. Drop. Mint.',
          src: '/images/homepage/illustrations/marketplace-collect--auction.png',
          src2x:
            '/images/homepage/illustrations/marketplace-collect--auction@2x.png',
        }}
      >
        <InnerParagraph
          heading="Get in on the Auction."
          paragraph="Set off a 24-hour auction by placing the first bid, or join an active auction before the time runs out. Always play to win."
          paragraphMaxWidth={onGridPx(112)}
          preHeading="Auction"
        />
      </SplitSection>
    </MarketingPage>
  );
}
