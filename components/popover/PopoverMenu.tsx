import { CSS } from 'stitches.config';
import NextLink from 'next/link';

import Box from 'components/base/Box';
import Text from 'components/base/Text';
import Card from 'components/base/Card';
import Link from 'components/base/Link';

import { PopoverMenuOption } from './types';

interface PopoverMenuProps {
  options: PopoverMenuOption[];
}

interface PopoverLinkProps {
  option: PopoverMenuOption;
  css?: CSS;
}

export default function PopoverMenu(props: PopoverMenuProps) {
  const { options } = props;
  return (
    <Card css={{ padding: '$3', whiteSpace: 'pre' }}>
      {options.map((option, key) => {
        if (option.externalHref) {
          return (
            <Link
              key={key}
              href={option.externalHref}
              target="_blank"
              rel="noopener noreferrer"
              css={{ textDecoration: 'none' }}
            >
              <PopoverLinkContainer option={option} />
            </Link>
          );
        }
        if (option.href) {
          return <PopoverLink option={option} key={key} />;
        }
        if (option.onClick) {
          return <PopoverAction option={option} key={key} />;
        }
      })}
    </Card>
  );
}

function PopoverAction(props: PopoverLinkProps) {
  const { option } = props;
  return (
    <Box
      css={{
        cursor: 'pointer',
      }}
      onClick={option.onClick}
    >
      <PopoverLinkContainer option={option} />
    </Box>
  );
}

function PopoverLink(props: PopoverLinkProps) {
  const { option } = props;
  return (
    <NextLink href={option.href} passHref>
      <Link
        css={{
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <PopoverLinkContainer option={option} />
      </Link>
    </NextLink>
  );
}

function PopoverLinkContainer(props: PopoverLinkProps) {
  const { option, css } = props;

  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        padding: '$3',
        borderRadius: '$2',
        textDecoration: 'none',
        color: '$black100',
        transition: '$ease $1',
        '@hover': {
          '&:hover': {
            backgroundColor: '$black5',
          },
        },
        ...css,
      }}
    >
      <Box css={{ marginRight: '$3', display: 'flex', alignItems: 'center' }}>
        {option.icon}
      </Box>
      <Text size={2} weight="semibold">
        {option.children}
      </Text>
    </Box>
  );
}
