import Link from 'components/links/Link';
import { styled } from 'stitches.config';
import { BasicArtwork } from 'types/Artwork';
import { getFallbackArtworkLabel } from 'utils/artwork/artwork';
import { buildIPFSAssetUrl } from 'utils/assets';
import { createCanvasBackground } from 'utils/styles';
import { ArtworkMedia } from './ArtworkMedia';
import { ArtworkUnsupportedMessageWrapper } from './ArtworkUnsupportedMessageWrapper';
import AssetUnsupportedIcon from 'assets/icons/asset-unsupported-icon.svg';
import ExternalIcon from 'assets/icons/external-link.svg';
import Flex from 'components/base/Flex';
import { buildEtherscanNFTLink } from 'lib/etherscanAddresses';

type ArtworkMediaFallbackProps = {
  artwork: BasicArtwork;
  imageUrl: string;
};

export default function ArtworkMediaFallback(props: ArtworkMediaFallbackProps) {
  const { artwork, imageUrl } = props;

  const ipfsHref = artwork.assetIPFSPath ? buildIPFSAssetUrl(artwork) : null;
  const etherscanHref = buildEtherscanNFTLink(
    artwork.contractAddress,
    artwork.tokenId
  );

  return (
    <ArtworkMedia.Container
      css={{
        ...createCanvasBackground({
          imageUrl,
          patternBackgroundSize: '48px',
        }),
      }}
    >
      <FallbackContainer>
        <Badge>
          <BadgeContent>
            <AssetUnsupportedIcon />
            <BadgeText>{getFallbackArtworkLabel()}</BadgeText>
          </BadgeContent>
        </Badge>

        {ipfsHref ? (
          <Actions>
            View on <IpfsLink href={ipfsHref} /> or{' '}
            <EtherscanLink href={etherscanHref} />
          </Actions>
        ) : (
          <Actions>
            View on <EtherscanLink href={etherscanHref} />
          </Actions>
        )}
      </FallbackContainer>
    </ArtworkMedia.Container>
  );
}

const FallbackContainer = styled(ArtworkMedia.ContentContainer, {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '$4',
});

const BadgeText = styled('span', {
  display: 'block',
  paddingTop: '3px',
  height: '24px',
  pointerEvents: 'none',
});

const BadgeContent = styled(Flex, {
  fontSize: '$0',
  fontWeight: '$semibold',
  alignItems: 'center',
  justifyContent: 'center',
  [`& > ${BadgeText}`]: {
    marginLeft: '$3',
    paddingLeft: '$3',
    borderLeft: '1px solid $whiteT20',
  },
});

const Badge = styled(ArtworkUnsupportedMessageWrapper, {
  paddingX: '$6',
  paddingY: '$3',
  color: '$black20',
});

const Actions = styled('span', {
  color: '$whiteT50',
  fontSize: '$0',
});

const ActionLink = styled('a', {
  color: 'inherit',
  textDecoration: 'none',
  fontWeight: '$semibold',
  '&:hover': {
    color: '$white100',
  },
  '& > svg': {
    width: '12px',
    marginLeft: '2px',
    marginRight: '2px',
  },
});

type IpfsLinkProps = {
  href: string;
};
function IpfsLink(props: IpfsLinkProps) {
  return <ExternalLink href={props.href}>IPFS</ExternalLink>;
}

type EtherscanLinkProps = {
  href: string;
};
function EtherscanLink(props: EtherscanLinkProps) {
  return <ExternalLink href={props.href}>Etherscan</ExternalLink>;
}

type ExternalLinkProps = {
  children: string;
  href: string;
};
function ExternalLink(props: ExternalLinkProps) {
  const { children, href } = props;
  return (
    <Link href={href}>
      <ActionLink target="_blank" rel="noreferrer">
        {children} <ExternalIcon />
      </ActionLink>
    </Link>
  );
}
