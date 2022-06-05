import { useEffect } from 'react';
import { GetStaticPropsResult } from 'next';
import BrandTheme from 'components/brand/BrandTheme';
import Body from 'components/base/Body';
import Page from 'components/Page';
import Hero from 'components/brand/careers/Hero';
import Button from 'components/base/Button';
import Grid from 'components/base/Grid';
import Title from 'components/brand/careers/Title';
import InfoModule from 'components/brand/careers/InfoModule';
import GraphicDivider from 'components/brand/careers/GraphicDivider';
import CircleText from 'components/brand/careers/CircleText';
import Section from 'components/brand/careers/Section';
import BackgroundGradient from 'components/brand/BackgroundGradient';
import ModuleWrapper from 'components/brand/careers/ModuleWrapper';
import Introduction from 'components/brand/careers/Introduction';
import Paragraph from 'components/brand/careers/Paragraph';
import Box from 'components/base/Box';
import Job from 'components/brand/careers/Job';
import Team from 'components/brand/careers/Team';
import FooterMarquee from 'components/brand/FooterMarquee';

import { PageColorMode, PageType } from 'types/page';

import { LEVER_API_URL } from 'lib/constants';

interface Job {
  title: string;
  url: string;
  team: string;
}
interface Jobs {
  [key: string]: Job[];
}
interface CareersProps {
  jobs: Jobs[];
  numOfRoles: number;
}

export default function Careers(props: CareersProps): JSX.Element {
  const { jobs, numOfRoles } = props;

  useEffect(() => {
    document.querySelector('#header').classList.add('blue-background');
    document.body.classList.add('webkit-fit-content');
    return () => {
      document.querySelector('#header').classList.remove('blue-background');
      document.body.classList.remove('webkit-fit-content');
    };
  }, []);

  return (
    <Page
      title="Careers"
      headerMode={PageColorMode.dark}
      image="https://foundation.app/images/careers/opengraph-careers.jpg"
      type={PageType.maximal}
    >
      {/* overflowX: hidden necessary because of overflow issues w/ Safari 13.1 (2020) */}
      <BrandTheme css={{ overflowX: 'hidden', overflow: 'clip' }}>
        <Body>
          <Hero />
          <BackgroundGradient
            id="information"
            color="green"
            css={{
              display: 'grid',
              paddingY: '$10',
              '@bp1': {
                paddingY: 180,
                paddingX: '$10',
              },
            }}
          >
            <Introduction>
              At Foundation, we are laying the groundwork for web3—the next
              generation of the internet full of limitless possibilities. In
              web3, your creativity is valued and your digital objects belong to
              you. We’re on an uncharted path, working to manifest a
              decentralized, open, and transparent internet for all.
            </Introduction>
            <Button
              color="black"
              size="regular"
              shape="round"
              css={{
                margin: 'auto',
                paddingX: '$4',
                paddingY: '$1',
                fontFamily: '$suisse',
              }}
              as="a"
              href="#roles"
              hoverable
            >
              See open roles
            </Button>
          </BackgroundGradient>
          <ModuleWrapper>
            <Title>Our Values…</Title>
            <Grid css={{ gridRowGap: '$8' }}>
              <InfoModule
                emoji="🌱"
                title="Courage"
                text="The story of web3 will be told for decades to come. We take big, bold bets that put Foundation in a league all its own."
              />
              <InfoModule
                emoji="🤝"
                title="Collaboration"
                text="We work together to reach heights that no one can achieve on their own. The collective is always taken into account, towards the aims of progress, momentum, and growth."
              />
              <InfoModule
                emoji="🏆"
                title="Ownership"
                text="We are trusted and empowered to make the right decisions within our domains."
              />
              <InfoModule
                emoji="♾️"
                title="Resilience"
                text="With conviction, we face challenges head on. We have the determination and heart needed to realize our ambitious visions for web3."
              />
            </Grid>
          </ModuleWrapper>
          <GraphicDivider
            mobileImg="/images/careers/bar-1-mobile.png"
            desktopImg="/images/careers/bar-1.png"
          />
          <Section>
            <Title>We believe that…</Title>
          </Section>
          <ModuleWrapper>
            <InfoModule
              emoji="🛠"
              title="Technology should propel culture."
              text="We started this company to bridge tech with art, creativity, and design, and to move culture forward. The product and its technical underpinnings should always push us in that direction."
            />
            <InfoModule
              emoji="🖌"
              title="Great design makes the difference."
              text="We believe that tasteful and accessible design can be paired with a strong narrative to make technology more human, and more impactful."
            />
            <InfoModule
              emoji="🧠"
              title="Innovative ideas don’t come out of thin air."
              text="We are building something truly new. Doing that requires constant pushing and thinking in unfamiliar ways, and this process takes flexibility and commitment."
            />
            <InfoModule
              emoji="🏄"
              title="You should be prepared for an adventure."
              text="No one can say exactly where all this will take us. With the work we do, there are no guarantees—and nothing is more exciting than that."
            />
          </ModuleWrapper>
          <GraphicDivider
            mobileImg="/images/careers/bar-2-mobile.png"
            desktopImg="/images/careers/bar-2.png"
          />
          <Section>
            <Title>Benefits & Support</Title>
          </Section>
          <ModuleWrapper>
            <InfoModule
              emoji="💊"
              title="Health Insurance"
              benefits={[
                'Top quality health insurance (medical, dental, vision, and disability), plus a complimentary membership to One Medical, and Talkspace',
              ]}
            />
            <InfoModule
              emoji="🏡"
              title="Remote Work Environment"
              benefits={[
                'A stipend for home office expenses, and the tech they need to succeed',
                'Flexible hours',
              ]}
            />

            <InfoModule
              emoji="🏝"
              title="Flexible PTO"
              benefits={[
                'A minimum of two weeks paid vacation per year, and flexible time off',
                'Paid holidays, sick days, and mental health days',
                'Paid parental leave',
              ]}
            />

            <InfoModule
              emoji="💸"
              title="Employer-sponsored 401K"
              benefits={[
                'Contribute a portion of your salary to a 401k retirement fund. Invest anywhere, including big fund managers like Vanguard and Fidelity.',
              ]}
            />
          </ModuleWrapper>
          <BackgroundGradient
            id="roles"
            color="yellow"
            css={{ display: 'grid' }}
          >
            <Section css={{ marginTop: 160 }}>
              <Box>
                <Title
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '$6',
                  }}
                >
                  <CircleText>{numOfRoles}</CircleText>
                  Open Roles
                </Title>
                <Paragraph>
                  If you don’t see a job that fits your skills and experience,
                  be sure to check back soon.
                  <br />
                  <br />
                  In the meantime, you can keep in touch with us on{' '}
                  <a
                    href="https://twitter.com/foundation"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Twitter
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://www.instagram.com/withfoundation"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>{' '}
                  to learn about new openings and opportunities.
                </Paragraph>
              </Box>
            </Section>
          </BackgroundGradient>
          <Grid
            css={{
              gridRowGap: '$9',
              maxWidth: 960,
              marginX: 'auto',
              marginTop: '$9',
            }}
          >
            {Object.keys(jobs).map((job, index) => {
              const renderableJob = jobs[job];

              return renderableJob ? (
                <Box key={index}>
                  <Team>{job}</Team>
                  <Grid
                    css={{
                      gridRowGap: '$3',
                    }}
                  >
                    {jobs[job].map((j) => (
                      <Job key={j.url} href={j.url}>
                        {j.title}
                      </Job>
                    ))}
                  </Grid>
                </Box>
              ) : null;
            })}
            <Box>
              <Title
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '$6',
                  '@bp1': {
                    marginTop: '$10',
                  },
                }}
              >
                Learn more about us.
              </Title>
              <Paragraph
                css={{
                  marginBottom: '$7',
                  '@bp1': {
                    marginBottom: '$9',
                  },
                }}
              >
                Foundation is an equal opportunity employer. We celebrate
                diversity, and welcome people from a variety of backgrounds,
                ethnicities, cultures, perspectives, and skill sets. As part of
                our commitment to equality, we ensure a fair and consistent
                interview process, and continue to promote an inclusive work
                environment.
              </Paragraph>
            </Box>
          </Grid>
        </Body>
        <FooterMarquee backgroundColor="#05FF00" />
      </BrandTheme>
    </Page>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<CareersProps>
> {
  const res = await fetch(LEVER_API_URL);
  const data = await res.json();
  const jobsTotal = data.map((job) => {
    const x = {
      title: job['text'],
      url: job['hostedUrl'],
      team: job['categories']['team'],
    };
    return x;
  });
  const jobs = jobsTotal.reduce((r, a) => {
    r[a.team] = r[a.team] || [];
    r[a.team].push(a);
    return r;
  }, Object.create(null));

  // ENG + People jobs first

  const jobsOrdered = Object.assign(
    {
      Engineering: null,
      People: null,
    },
    jobs
  );

  return {
    props: {
      jobs: jobsOrdered,
      numOfRoles: jobsTotal.length,
    },
    // 1 hour
    revalidate: 3600,
  };
}
