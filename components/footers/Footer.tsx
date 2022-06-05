import { includes } from 'ramda';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import { CSS } from 'stitches.config';

import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import Grid from 'components/base/Grid';
import Body from 'components/base/Body';
import Link from 'components/base/Link';
import { FooterLogoLink } from 'components/links/LogoLink';
import MaximalFooter from './MaximalFooter';

import { SiteLink } from './types';
import { PageType } from 'types/page';

const socialLinks: SiteLink[] = [
  {
    children: 'Instagram',
    href: 'https://www.instagram.com/withfoundation/',
    external: true,
  },
  {
    children: 'Twitter',
    href: 'https://twitter.com/foundation',
    external: true,
  },
];

const otherLinks: SiteLink[] = [
  { children: 'Careers', href: '/careers' },
  {
    children: 'Terms of Service',
    href: '/terms',
  },
  {
    children: 'Privacy',
    href: '/privacy',
  },
  {
    children: 'Help',
    href: 'https://help.foundation.app/',
    external: true,
  },
];

interface FooterProps {
  type?: string;
  css?: CSS;
}

export default function Footer(props: FooterProps): JSX.Element {
  const { type, css = {} } = props;

  const shouldHideFooter = includes(type, [PageType.auth, PageType.minimal]);

  const maximalFooter = includes(type, [PageType.maximal]);

  if (shouldHideFooter) {
    return null;
  }

  if (maximalFooter) {
    return <MaximalFooter />;
  }

  return (
    <Box css={{ paddingY: '$8', marginTop: 'auto', ...css }}>
      <Body>
        <Grid
          css={{
            gap: '$6',
            gridTemplateColumns: 'repeat(6, 1fr)',
            alignItems: 'flex-start',
            '@bp1': { display: 'flex', alignItems: 'center' },
          }}
        >
          <Box css={{ gridColumn: '1/7' }}>
            <Flex>
              <FooterLogoLink />
            </Flex>
          </Box>
          <FooterLinkList
            css={{ gridColumn: '1/3', '@bp1': { display: 'flex' } }}
          >
            {socialLinks.map((link, key) => (
              <FooterLink key={key} href={link.href} external={link.external}>
                {link.children}
              </FooterLink>
            ))}
          </FooterLinkList>
          <FooterLinkList
            css={{
              gridColumn: '3/7',
              '@bp1': { display: 'flex', marginLeft: 'auto' },
            }}
          >
            {otherLinks.map((link, key) => (
              <FooterLink key={key} href={link.href} external={link.external}>
                {link.children}
              </FooterLink>
            ))}
          </FooterLinkList>
        </Grid>
      </Body>
    </Box>
  );
}

interface FooterLinkListProps {
  css?: CSS;
  children: ReactNode;
}

function FooterLinkList(props: FooterLinkListProps): JSX.Element {
  const { children, css } = props;
  return <Grid css={{ gap: 5, ...css }}>{children}</Grid>;
}

function FooterLink(props: SiteLink): JSX.Element {
  const { external, children, href } = props;

  const css: CSS = {
    display: 'block',
    fontSize: '$0',
    color: '$black60',
    fontWeight: '$semibold',
    textDecoration: 'none',
    marginRight: '$2',
    transition: 'color $1 $ease',
    '&:last-of-type': {
      marginRight: 0,
    },
    '@hover': {
      '&:hover': {
        color: '$black100',
      },
    },
    '@bp1': { marginRight: '$4' },
  };

  if (external) {
    return (
      <Link
        className="footer-link"
        css={css}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </Link>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Link className="footer-link" css={css}>
        {children}
      </Link>
    </NextLink>
  );
}
