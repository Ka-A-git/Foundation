import NextLink from 'next/link';

import { H3Heading } from 'components/base/Heading';
import Body from 'components/base/Body';
import Box from 'components/base/Box';
import ExternalLink from 'components/links/ExternalLink';
import Flex from 'components/base/Flex';
import Link from 'components/base/Link';
import Logo from 'assets/images/fnd-logo.svg';

import { styled } from 'stitches.config';
import { SiteLink } from './types';

const adminLinks: SiteLink[] = [
  {
    children: 'Privacy Policy',
    href: '/privacy',
    css: {
      color: '$black40',
      fontSize: '$0',
      '@bp2': {
        fontSize: '$1',
      },
    },
  },
  {
    children: 'Terms of Service',
    href: '/terms',
    css: {
      color: '$black40',
      fontSize: '$0',
      '@bp2': {
        fontSize: '$1',
      },
    },
  },
];

const learnLinks: SiteLink[] = [
  {
    children: 'Create',
    href: '/how-to-create',
  },
  {
    children: 'Collect',
    href: '/how-to-collect',
  },
  {
    children: 'Sell',
    href: '/how-to-sell',
  },
];

const companyLinks: SiteLink[] = [
  {
    children: 'Careers',
    href: '/careers',
  },
  {
    children: 'Help Center',
    href: 'https://help.foundation.app',
    external: true,
  },
];

const connectLinks: SiteLink[] = [
  {
    children: 'Twitter',
    href: 'https://twitter.com/foundation',
    external: true,
  },
  {
    children: 'Instagram',
    href: 'https://instagram.com/withfoundation',
    external: true,
  },
  {
    children: 'Subscribe',
    href: '/newsletters',
  },
];

export default function MaximalFooter(): JSX.Element {
  return (
    <Footer>
      <FooterBody>
        <FooterLogo>
          <NextLink href="/" passHref>
            <FooterLogoLink>
              <Logo />
            </FooterLogoLink>
          </NextLink>
        </FooterLogo>
        <OuterGrid>
          <OuterGridBox>
            <Links>
              {adminLinks.map((props, index) => (
                <FooterLink key={index} {...props} />
              ))}
            </Links>
          </OuterGridBox>
          <OuterGridBox>
            <InnerGrid>
              <InnerGridBox>
                <FooterHeading>Learn</FooterHeading>
                <Links>
                  {learnLinks.map((props, index) => (
                    <FooterLink key={index} {...props} />
                  ))}
                </Links>
              </InnerGridBox>
              <InnerGridBox>
                <FooterHeading>Company</FooterHeading>
                <Links>
                  {companyLinks.map((props, index) => (
                    <FooterLink key={index} {...props} />
                  ))}
                </Links>
              </InnerGridBox>
              <InnerGridBox>
                <FooterHeading>Connect</FooterHeading>
                <Links>
                  {connectLinks.map((props, index) => (
                    <FooterLink key={index} {...props} />
                  ))}
                </Links>
              </InnerGridBox>
            </InnerGrid>
          </OuterGridBox>
        </OuterGrid>
      </FooterBody>
    </Footer>
  );
}

function FooterLink(props: SiteLink): JSX.Element {
  const { external, children, href, css } = props;
  if (external) {
    return (
      <FooterExternalLink
        css={css}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </FooterExternalLink>
    );
  }
  return (
    <NextLink href={href} passHref>
      <FooterInternalLink css={css}>{children}</FooterInternalLink>
    </NextLink>
  );
}

const Footer = styled('footer', Box, {
  backgroundColor: '$black100',
});

const FooterLogo = styled(Box, {
  width: '100%',
  color: '$black0',
  marginBottom: '$7',
  svg: {
    width: 76,
  },
});

const FooterBody = styled(Body, {
  paddingY: '$10',
});

const Links = styled(Flex, {
  flexDirection: 'column',
  alignItems: 'flex-start',
  a: {
    marginBottom: '$4',
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

const FooterExternalLink = styled(ExternalLink, {
  fontSize: '$2',
  color: '$black20',
  '@hover': {
    '&:hover': {
      color: '$black0',
    },
  },
});

const FooterInternalLink = styled(Link, {
  fontSize: '$2',
  color: '$black20',
  fontWeight: '$medium',
  textDecoration: 'none',
  transition: 'color $2 $ease',
  '@hover': {
    '&:hover': {
      color: '$black0',
    },
  },
});

const FooterLogoLink = styled(Link, {
  color: '$black0',
  textDecoration: 'none',
  transition: 'color $2 $ease',
  '@hover': {
    '&:hover': {
      color: '$black30',
    },
  },
});

const FooterHeading = styled(H3Heading, {
  color: '$black40',
  fontSize: '$0',
  letterSpacing: '$0',
  fontWeight: '$medium',
  marginBottom: '$5',
  '@bp2': {
    marginBottom: '$6',
  },
});

const OuterGrid = styled(Flex, {
  gap: '$8',
  flexDirection: 'column-reverse',
  '@bp2': {
    gap: 0,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const OuterGridBox = styled(Box, {
  '&:first-child': {
    width: '100%',
    '@bp2': {
      width: '20%',
    },
    '@bp3': {
      width: '30%',
    },
    '@bp4': {
      width: '40%',
    },
  },
  '&:last-child': {
    width: '100%',
    '@bp2': {
      width: '80%',
    },
    '@bp3': {
      width: '70%',
    },
    '@bp4': {
      width: '60%',
    },
  },
});

const InnerGrid = styled(Flex, {
  gap: '$8',
  flexDirection: 'column',
  '@bp2': {
    gap: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const InnerGridBox = styled(Box, {
  '@bp2': {
    // marginLeft: 'auto',
    width: '25%',
  },
});
