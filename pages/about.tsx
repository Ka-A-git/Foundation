import { useState } from 'react';

import { GetStaticPropsResult } from 'next';

import { aboutText } from 'utils/data/about-text';

import Page from 'components/Page';
import BrandTheme from 'components/brand/BrandTheme';
import Body from 'components/base/Body';

import Link from 'components/brand/about/Link';
import Paragraph from 'components/brand/about/Paragraph';
import Heading from 'components/base/Heading';
import TextSection from 'components/brand/about/TextSection';
import Subhead from 'components/brand/about/Subhead';
import Box from 'components/base/Box';
import TerminalShowcase from 'components/brand/about/TerminalShowcase';
import TotalSales from 'components/brand/about/TotalSales';
import TerminalSubhead from 'components/brand/about/TerminalSubhead';
import ShapesAndMarquee from 'components/brand/ShapesAndMarquee';
import QuoteSection from 'components/brand/about/QuoteSection';
import QuoteCard from 'components/brand/cards/QuoteCard';
import ToolbarAndSquiggle from 'components/brand/about/ToolbarAndSquiggle';

import { SalesStats } from 'graphql/hasura/queries/sales-stats.generated';
import { PageType } from 'types/page';

import { getSalesStats } from 'queries/hasura/sales';

interface AboutPageProps {
  stats: SalesStats;
}

export default function About(props: AboutPageProps): JSX.Element {
  const { stats } = props;

  const [canvasActive, setCanvasActive] = useState(false);

  return (
    <Page title="About" footerCss={{ zIndex: 4 }} type={PageType.maximal}>
      <BrandTheme>
        <Body
          css={{
            maxWidth: 1400,
            paddingY: '$8',
            '@bp1': {
              paddingY: '$10',
            },
          }}
        >
          <Heading
            css={{
              pointerEvents: canvasActive ? 'none' : 'all',
              textAlign: 'center',
              '@bp1': {
                textAlign: 'left',
              },
            }}
          >
            <picture>
              <source
                srcSet="/images/svg-text/about-foundation.svg"
                media="(min-width: 800px)"
              />
              <img
                src="/images/svg-text/about-foundation-centered.svg"
                alt="About Foundation"
              />
            </picture>
          </Heading>
          <TextSection
            textAlign="mobileCenter"
            css={{
              pointerEvents: canvasActive ? 'none' : 'all',
              marginTop: '$s2',
              marginBottom: 200,
              '@bp1': { marginBottom: 40 },
            }}
          >
            <Paragraph>{aboutText.introduction}</Paragraph>
          </TextSection>
          <ToolbarAndSquiggle
            setCanvasActive={setCanvasActive}
            canvasActive={canvasActive}
          />
          <ShapesAndMarquee />
          <TextSection
            textAlign="mobileCenter"
            css={{
              pointerEvents: canvasActive ? 'none' : 'all',
              marginTop: 430,
              '@bp1': { marginTop: 230 },
            }}
          >
            <Paragraph>{aboutText.invitation}</Paragraph>
          </TextSection>
          <TerminalShowcase
            css={{ pointerEvents: canvasActive ? 'none' : 'all' }}
          >
            <Heading
              css={{
                pointerEvents: canvasActive ? 'none' : 'all',
                textAlign: 'center',
                '@bp1': {
                  textAlign: 'left',
                },
              }}
            >
              <picture>
                <source
                  srcSet="/images/svg-text/making-history.svg"
                  media="(min-width: 800px)"
                />
                <img
                  src="/images/svg-text/making-history-centered.svg"
                  alt="Making history"
                />
              </picture>
            </Heading>
            <TerminalSubhead>
              Since launching in February&nbsp;2021,
              <br /> creators have earned...
            </TerminalSubhead>
            <TotalSales
              eth={stats.auctionSalesTotalAmount.aggregate.sum.highestBidAmount}
            />
          </TerminalShowcase>
          <Box css={{ paddingY: '$8' }}>
            <Heading
              css={{
                pointerEvents: canvasActive ? 'none' : 'all',
                textAlign: 'center',
                '@bp1': {
                  textAlign: 'left',
                },
              }}
            >
              <picture>
                <source
                  srcSet="/images/svg-text/what-creators-have-to-say.svg"
                  media="(min-width: 800px)"
                />
                <img
                  src="/images/svg-text/what-creators-have-to-say-centered.svg"
                  alt="What creators have to say"
                />
              </picture>
            </Heading>
            <QuoteSection
              css={{ pointerEvents: canvasActive ? 'none' : 'all' }}
            >
              {aboutText.creators.map(({ name, text, publicKey }) => (
                <QuoteCard
                  name={name}
                  key={name}
                  text={text}
                  publicKey={publicKey}
                />
              ))}
            </QuoteSection>
          </Box>
          <Box css={{ paddingY: '$8' }}>
            <Heading
              css={{
                pointerEvents: canvasActive ? 'none' : 'all',
                textAlign: 'center',
                '@bp1': {
                  textAlign: 'left',
                },
              }}
            >
              <picture>
                <source
                  srcSet="/images/svg-text/what-collectors-have-to-say.svg"
                  media="(min-width: 800px)"
                />
                <img
                  src="/images/svg-text/what-collectors-have-to-say-centered.svg"
                  alt="What creators have to say"
                />
              </picture>
            </Heading>
            <QuoteSection
              css={{ pointerEvents: canvasActive ? 'none' : 'all' }}
            >
              {aboutText.collectors.map(({ name, text, publicKey }) => (
                <QuoteCard
                  name={name}
                  key={name}
                  text={text}
                  publicKey={publicKey}
                />
              ))}
            </QuoteSection>
          </Box>
          <Heading css={{ pointerEvents: canvasActive ? 'none' : 'all' }}>
            <picture>
              <source
                srcSet="/images/svg-text/how-it-works.svg"
                media="(min-width: 800px)"
              />
              <img
                src="/images/svg-text/how-it-works-mobile.svg"
                alt="How it works"
              />
            </picture>
          </Heading>
          <TextSection css={{ pointerEvents: canvasActive ? 'none' : 'all' }}>
            <section>
              <Subhead>For Creators</Subhead>
              <Paragraph>{aboutText.forCreators}</Paragraph>
              <Link
                size="small"
                href="https://help.foundation.app/hc/en-us/articles/4562018706459"
              >
                Read a complete guide to selling NFTs on Foundation
              </Link>
            </section>
            <section>
              <Subhead>For Collectors</Subhead>
              <Paragraph>{aboutText.forCollectors}</Paragraph>
              <Link
                size="small"
                href="https://help.foundation.app/hc/en-us/articles/4561241975451"
              >
                Read a complete guide to collecting NFTs on Foundation
              </Link>
            </section>
          </TextSection>
          <TextSection css={{ pointerEvents: canvasActive ? 'none' : 'all' }}>
            <section>
              <Subhead>For the Community</Subhead>
              <Paragraph>{aboutText.forTheCommunity}</Paragraph>
              <Link
                size="small"
                href="https://foundation.app/community-guidelines"
              >
                Read our Community Guidelines
              </Link>
            </section>
          </TextSection>
        </Body>
      </BrandTheme>
    </Page>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<AboutPageProps>
> {
  return {
    props: {
      stats: await getSalesStats(),
    },
    revalidate: 21600,
  };
}
