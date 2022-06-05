import NextLink from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { styled } from 'stitches.config';

import { H2Heading } from 'components/base/Heading';
import CtaButton, { CtaButtonProps } from 'components/homepage/CtaButton';
import Body from 'components/base/Body';
import Box from 'components/base/Box';
import Link from 'components/base/Link';
import Logo from 'assets/images/fnd-logo.svg';
import Page from 'components/Page';

import { onGridPx } from 'utils/styles';
import { PageType } from 'types/page';

const animationProps = {
  initial: { y: '-100%' },
  exit: { y: '-100%' },
  animate: { y: 0 },
  transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
};

interface MarketingPageProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  title: string;
  heading: string;
  link: CtaButtonProps;
  ogImage: string;
}

export default function MarketingPage(props: MarketingPageProps): JSX.Element {
  const { children, header, footer, title, heading, link, ogImage } = props;
  const bodyObserver = useInView();
  const heroObserver = useInView();
  const footerObserver = useInView();
  const showHeader =
    !heroObserver.inView && !footerObserver.inView && bodyObserver.inView;
  return (
    <Page title={title} type={PageType.maximal} image={ogImage}>
      <Header ref={heroObserver.ref}>{header}</Header>
      <Body css={{ maxWidth: onGridPx(303) }} ref={bodyObserver.ref}>
        {children}
        <Footer ref={footerObserver.ref}>{footer}</Footer>
      </Body>
      <AnimatePresence>
        {showHeader && (
          <FixedHeader key="fixed-connect-header" {...animationProps}>
            <HeaderHeading>
              <NextLink href="/" passHref>
                <LogoLink>
                  <Logo />
                </LogoLink>
              </NextLink>
              <H2Heading size={{ '@initial': 2, '@bp2': 3 }} weight="medium">
                {heading}
              </H2Heading>
            </HeaderHeading>
            {link && (
              <CtaButton size={{ '@initial': 0, '@bp2': 1 }} {...link} />
            )}
          </FixedHeader>
        )}
      </AnimatePresence>
    </Page>
  );
}

const FixedHeader = styled(motion.div, {
  zIndex: 999,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,

  padding: '$4',
  background: '$black0',
  boxShadow: '0 1px 0 0 $colors$blackT10',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@bp2': {
    paddingX: '$7',
  },
});

const HeaderHeading = styled(Box, {
  display: 'flex',
  alignItems: 'center',

  svg: {
    width: 76,
    display: 'none',
  },

  '@bp2': {
    svg: {
      display: 'block',
    },
    h2: {
      marginLeft: '$6',
    },
  },
});

const Header = styled(Box, {
  paddingTop: '$8',
  paddingBottom: '$9',
  borderBottom: '1px dotted',
  borderColor: '$black10',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  maxWidth: '100%',
  overflow: 'hidden',

  '@bp2': {
    borderBottom: 'none',
    paddingY: '$11',
  },
});

const Footer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  paddingY: '$10',
  position: 'relative',
  '@bp2': {
    paddingY: '$11',
  },
});

const LogoLink = styled(Link, {
  color: '$black100',
  textDecoration: 'none',
  transition: 'color $2 $ease',
  '@hover': {
    '&:hover': {
      color: '$black80',
    },
  },
});
