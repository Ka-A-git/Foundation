import { styled, css } from 'stitches.config';

import Link from 'components/base/Link';
import Box from 'components/base/Box';

import ExternalLinkIcon from 'assets/icons/external-link.svg';

const Wrapper = styled(Box, {
  display: 'inline-block',
  background: '$white100',
  color: '$black100',
  boxShadow: '$0',
  borderRadius: '$round',
  paddingY: '$1',
  paddingX: '$3',
  '@bp5': {
    paddingY: '$2',
    paddingX: '$5',
  },
  variants: {
    frosted: {
      true: {
        color: '$white100',
        background: '$whiteT20',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
      },
    },
  },
});

const WrapperLink = styled(Link, {
  display: 'inline-block',
  background: '$white100',
  color: '$black100',
  boxShadow: '$0',
  borderRadius: '$round',
  willChange: 'transform',
  transition: 'transform $1 $ease, color $1 $ease, background $1 $ease',
  textDecoration: 'none',
  svg: {
    transition: 'color $1 $ease',
  },
  paddingY: '$1',
  paddingX: '$3',
  '@bp4': {
    paddingY: '$2',
    paddingX: '$5',
  },
  '@hover': {
    '&:hover': {
      transform: 'translateY(-2px)',
      color: '$black100',
      background: '$white100',
      svg: {
        color: '$black100',
      },
    },
  },
  variants: {
    frosted: {
      true: {
        color: '$white100',
        background: '$whiteT20',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
      },
    },
  },
});

export const CollectionContractText = styled('span', {
  fontFamily: '$mono',
  fontSize: '$0',
  letterSpacing: 1,
  textTransform: 'uppercase',
});

interface ContractPillProps {
  frosted?: boolean;
  href?: string;
  contract: string;
}

const externalLinkStyles = css({
  width: 10,
  height: 10,
  '@bp2': {
    width: 14,
    height: 14,
  },
});

export default function ContractPill(props: ContractPillProps): JSX.Element {
  const { frosted = false, href, contract } = props;

  // TODO: split this into two components.
  // Styling has now diverged between the use cases of this component.
  if (href) {
    return (
      <WrapperLink
        frosted={frosted}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        <CollectionContractText
          css={{
            '@bp4': {
              fontSize: '$2',
            },
          }}
        >
          {contract}
        </CollectionContractText>
        <Box
          css={{
            color: frosted ? '$whiteT40' : '$black20',
            display: 'inline-block',
            marginLeft: '$2',
            '@hover': { '&:hover': { color: '$black100' } },
          }}
        >
          <ExternalLinkIcon className={externalLinkStyles()} />
        </Box>
      </WrapperLink>
    );
  }
  return (
    <Wrapper frosted={frosted}>
      <CollectionContractText
        css={{
          '@bp5': {
            fontSize: '$2',
          },
        }}
      >
        {contract}
      </CollectionContractText>
    </Wrapper>
  );
}
