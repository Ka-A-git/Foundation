import { styled, CSS } from 'stitches.config';
import Link from 'components/base/Link';
import OpenLinkIcon from 'assets/icons/open-link-icon.svg';
interface EtherscanIconLinkProps {
  href: string;
  css?: CSS;
}

export default function EtherscanIconLink(
  props: EtherscanIconLinkProps
): JSX.Element {
  const { href, css } = props;
  return (
    <EtherscanLink
      css={css}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="View on Etherscan"
    >
      <OpenLinkIcon width={16} height={16} />
    </EtherscanLink>
  );
}

const EtherscanLink = styled(Link, {
  color: '$black30',
  cursor: 'pointer',
  transition: 'color $1 $ease',
  marginLeft: '$3',
  display: 'inline-flex',

  '@hover': {
    '&:hover': {
      color: '$black100',
    },
  },
});
