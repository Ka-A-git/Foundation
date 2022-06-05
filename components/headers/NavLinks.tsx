import { useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import { useRouter } from 'next/router';
import { FunctionComponent, SVGAttributes } from 'react';
import NextLink from 'next/link';

import NavLink from './NavLink';
import NavLinkWrapper from './NavLinkWrapper';
import Flex from 'components/base/Flex';
import InnerNavLink from './InnerNavLink';
import Box from 'components/base/Box';
import Text from 'components/base/Text';
import Icon from 'components/Icon';

import TrendingIcon from 'assets/icons/trending-icon.svg';
import BrowseIcon from 'assets/icons/browse-icon.svg';
import FeedIcon from 'assets/icons/feed-icon.svg';

import useIsomorphicLayoutEffect from 'hooks/use-isomorphic-layout-effect';
import 'tippy.js/animations/shift-away.css';

interface NavLinksProps {
  isDark: boolean;
}

interface NavLink {
  label: string;
  href?: string;
  icon?: FunctionComponent<SVGAttributes<SVGElement>>;
  innerLinks?: NavLink[];
}

export default function NavLinks(props: NavLinksProps): JSX.Element {
  const { isDark } = props;

  const router = useRouter();
  const currentPath = router.pathname;
  const ref = useRef(null);

  const POPOVER_DELAY = 0;

  const [shouldRender, setShouldRender] = useState(false);

  const appendRef = useRef(null);

  const innerLinks = [
    {
      label: 'Feed',
      href: '/feed',
      icon: FeedIcon,
    },
    {
      label: 'Trending',
      href: '/trending',
      icon: TrendingIcon,
    },

    {
      label: 'Browse',
      href: '/nfts',
      icon: BrowseIcon,
    },
  ];

  const navLinks = [
    {
      label: 'Explore',
      innerLinks,
    },
  ];

  useIsomorphicLayoutEffect(() => {
    appendRef.current = document.getElementById('portal');
  }, []);

  return (
    <NavLinkWrapper ref={ref}>
      {navLinks.map((link: NavLink) => {
        if (link.innerLinks) {
          return (
            <Box key={link.label} css={{ position: 'relative' }}>
              <Tippy
                content={
                  shouldRender ? (
                    <Flex
                      css={{
                        borderRadius: '$2',
                        width: 200,
                        backgroundColor: '$white100',
                        boxShadow: '$1',
                        flexDirection: 'column',
                        padding: '$2',
                      }}
                    >
                      {link.innerLinks.map((link) => (
                        <NextLink key={link.href} href={link.href} passHref>
                          <InnerNavLink isActive={currentPath === link.href}>
                            <Box
                              css={{
                                display: 'flex',
                              }}
                            >
                              <Box
                                css={{
                                  marginRight: '$4',
                                  verticalAlign: 'text-bottom',
                                }}
                              >
                                <Icon icon={link.icon} width={22} height={22} />
                              </Box>
                              <Text>{link.label}</Text>
                            </Box>
                          </InnerNavLink>
                        </NextLink>
                      ))}
                    </Flex>
                  ) : null
                }
                interactive={true}
                animation="shift-away"
                onTrigger={() => setShouldRender(true)}
                onUntrigger={() => setShouldRender(false)}
                onShow={() => setShouldRender(true)}
                onHidden={() => setShouldRender(false)}
                placement="bottom"
                touch={false}
                delay={[POPOVER_DELAY, 0]}
                appendTo={appendRef.current}
              >
                <Box css={{ cursor: 'pointer', minWidth: 0 }}>
                  <NavLink as="div" isDark={isDark} css={{ marginRight: '$7' }}>
                    {link.label}
                  </NavLink>
                </Box>
              </Tippy>
            </Box>
          );
        } else {
          return (
            <NextLink key={link.href} href={link.href} passHref>
              <NavLink
                isActive={currentPath === link.href}
                isDark={isDark}
                css={{ marginRight: '$7' }}
              >
                {link.label}
              </NavLink>
            </NextLink>
          );
        }
      })}
    </NavLinkWrapper>
  );
}
