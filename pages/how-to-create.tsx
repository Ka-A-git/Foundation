import { useCallback } from 'react';
import { GetStaticPropsResult } from 'next';

import InnerParagraph from 'components/homepage/InnerParagraph';
import MarketingFooter from 'components/homepage/MarketingFooter';
import MarketingHero from 'components/homepage/MarketingHero';
import MarketingPage from 'components/homepage/MarketingPage';
import SplitSection from 'components/homepage/SplitSection';

import { onGridPx } from 'utils/styles';
import { getTotalCreatorEarnings } from 'queries/hasura/sales';
import { formatInteger } from 'utils/formatters';

import useSegmentEvent from 'hooks/analytics/use-segment-event';

import { MarketingPageType } from 'types/Marketing';

interface CreatorToolsPageProps {
  creatorEarningsInEth: number;
}

export default function CreatorToolsPage(
  props: CreatorToolsPageProps
): JSX.Element {
  const { creatorEarningsInEth } = props;
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

  const ctaLink = { href: '/how-to-sell', text: 'Learn more' };
  const heroHeading = 'Own your creativity.';
  return (
    <MarketingPage
      ogImage="https://foundation.app/how-to-create-opengraph.png"
      footer={
        <MarketingFooter
          butterfly
          maxWidth={onGridPx(140)}
          link={{
            ...ctaLink,
            onClick: () => handleBottomCTASegmentEvent('create'),
          }}
          heading="Creativity is valuable on Foundation."
          paragraph={
            <>
              To date, over{' '}
              <strong>{formatInteger(creatorEarningsInEth)} ETH</strong> has
              been earned by the community on Foundation. Bring your NFTs to our
              marketplace, and connect with collectors.
            </>
          }
        />
      }
      header={
        <MarketingHero
          imagePrefix="create"
          heading={heroHeading}
          link={{
            ...ctaLink,
            onClick: () => handleTopCTASegmentEvent('create'),
          }}
          paragraph="Welcome to web3 — the next evolution of the internet where creativity is valued and your digital objects belong to you."
          preHeading="How to create on Foundation"
        />
      }
      heading={heroHeading}
      link={{
        ...ctaLink,
        onClick: () => handleStickyCTASegmentEvent('create'),
      }}
      title="How to create NFTs"
    >
      <SplitSection
        illustration={{
          alt: '',
          src: '/images/homepage/illustrations/creator-tools--collections.png',
          src2x:
            '/images/homepage/illustrations/creator-tools--collections@2x.png',
        }}
      >
        <InnerParagraph
          preHeading="Create collections"
          heading="Your Collection, your way."
          paragraph="In web3, artists are taking back ownership and control over their creativity. All collections on Foundation are creator-owned smart contracts that will stand the test of time."
        />
      </SplitSection>
      <SplitSection
        illustration={{
          alt: '',
          src: '/images/homepage/illustrations/creator-tools--mint.png',
          src2x: '/images/homepage/illustrations/creator-tools--mint@2x.png',
        }}
      >
        <InnerParagraph
          preHeading="Mint NFTs"
          heading="Drag. Drop. Mint."
          paragraphMaxWidth={onGridPx(116)}
          paragraph={
            <>
              Minting an NFT is like adding your signature to a painting. Make
              your mark in web3 with works that are emblematic of your creative
              practice.
              <br />
              <br />
              Plus, you’ll earn a <strong>10%</strong> royalty for all secondary
              market sales. Forever.
            </>
          }
        />
      </SplitSection>
      <SplitSection
        illustration={{
          alt: '',
          src: '/images/homepage/illustrations/creator-tools--splits.png',
          src2x: '/images/homepage/illustrations/creator-tools--splits@2x.png',
        }}
      >
        <InnerParagraph
          preHeading="Split sales"
          heading="Create together, earn together."
          paragraphMaxWidth={onGridPx(116)}
          paragraph={
            <>
              Add a Split to your NFT to seamlessly pay creative
              collaborators—photographers, producers, choreographers, dancers,
              poets—and so on.
              <br />
              <br />
              You can also use Splits to donate directly to the causes you care
              about most. That’s the web3 way.
            </>
          }
        />
      </SplitSection>
    </MarketingPage>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<CreatorToolsPageProps>
> {
  const creatorEarningsInEth = await getTotalCreatorEarnings();
  return {
    props: {
      creatorEarningsInEth,
    },
    revalidate: 21600,
  };
}
