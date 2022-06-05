import { forwardRef, ReactNode } from 'react';
import NextLink from 'next/link';

import ChevronRight from 'assets/icons/right-chevron.svg';

import Link from 'components/base/Link';
import Flex from 'components/base/Flex';
import Heading from 'components/base/Heading';
import Box from 'components/base/Box';

interface UserDropdownLinkProps {
  onClick?: () => void;
  icon: JSX.Element;
  children: ReactNode;
  href?: string;
}

export default function UserDropdownLink(
  props: UserDropdownLinkProps
): JSX.Element {
  const { children, icon, href, onClick } = props;

  if (onClick) {
    return (
      <InnerLink onClick={onClick} icon={icon}>
        {children}
      </InnerLink>
    );
  }
  return (
    <NextLink href={href} passHref>
      <Link css={{ textDecoration: 'none', color: 'currentColor' }}>
        <InnerLink icon={icon}>{children}</InnerLink>
      </Link>
    </NextLink>
  );
}

interface InnerLinkProps {
  onClick?: () => void;
  icon: JSX.Element;
  children: ReactNode;
}

const InnerLink = forwardRef<HTMLDivElement, InnerLinkProps>(
  (props: InnerLinkProps, ref) => {
    const { onClick, icon, children } = props;
    return (
      <Flex
        // This logic is here because if onClick is passed we still want it to be keyboard accessible
        tabIndex={onClick ? 0 : -1}
        ref={ref}
        onClick={onClick}
        css={{
          padding: '$4',
          alignItems: 'center',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'background $1 $ease',
          borderRadius: '$1',
          color: '$black100',
          '@hover': {
            '&:hover': {
              background: '$black5',
              '& .icon-icon': {
                color: '$black100',
              },
            },
          },
        }}
      >
        <Flex
          css={{
            flex: 'auto',
            alignItems: 'center',
          }}
          className="icon-label"
        >
          <Flex css={{ minWidth: 32 }}>{icon}</Flex>
          <Heading
            size={2}
            css={{ flex: 1, display: 'flex', marginLeft: '$3' }}
          >
            {children}
          </Heading>
        </Flex>

        <Box css={{ color: '$black40' }} className="icon-icon">
          <ChevronRight />
        </Box>
      </Flex>
    );
  }
);

InnerLink.displayName = 'InnerLink';
