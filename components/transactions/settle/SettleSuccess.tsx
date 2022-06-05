import Box from 'components/base/Box';
import TransactionProgressPane from '../generic/TransactionProgressPane';
import TwitterShareButtonLink from 'components/links/TwitterShareButtonLink';
import {
  ButtonGrid,
  TransactionActionButton,
  TransactionActionButtonsExternal,
} from '../generic/TransactionActionButtons';

import useGetFees from 'hooks/web3/transactions/use-get-fees';
import useBuyTweetText from 'hooks/use-claim-tweet-text';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import useLastBlockNumber from 'hooks/web3/use-last-block-number';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { formatETHWithSuffix } from 'utils/formatters';
import { isAllTrue } from 'utils/helpers';
import { areKeysEqual } from 'utils/users';
import { buildArtworkPath, buildUserProfilePath } from 'utils/artwork/artwork';
import {
  getMostRecentAuction,
  isArtworkAuctionSeller,
  isArtworkAuctionWinner,
} from 'utils/auctions/auctions';

interface SettleSuccessProps {
  artwork: ArtworkFragmentExtended;
  publicAddress: string;
  txHash: string;
}

export default function SettleSuccess(props: SettleSuccessProps) {
  const { artwork, publicAddress, txHash } = props;

  const mostRecentActiveAuction = getMostRecentAuction(artwork);

  const isAuctionSeller = isArtworkAuctionSeller(
    publicAddress,
    mostRecentActiveAuction
  );

  const isAuctionCollector = isArtworkAuctionWinner(
    publicAddress,
    mostRecentActiveAuction
  );

  const { data: userData } = useUserByPublicKey(
    { publicKey: publicAddress },
    { refetchOnWindowFocus: false }
  );

  const lastBlockNumber = useLastBlockNumber(txHash);

  const { data: feesData } = useGetFees({
    contractAddress: artwork?.contractAddress,
    tokenId: artwork?.tokenId,
    price: mostRecentActiveAuction?.highestBidAmount,
    currentUserPublicKey: publicAddress,
    // here we pass in the previous block number to get retroactive fees
    overrides: { blockTag: lastBlockNumber },
  });

  const twitterShareText = useBuyTweetText({ artwork });

  const profilePath = buildUserProfilePath({ user: userData?.user });

  const amountReceived = feesData?.currentUserFee?.amountInEth;
  const splitPercent = feesData?.recipients?.find((recipient) =>
    isAllTrue([
      recipient.recipientType === 'SPLIT_RECIPIENT',
      areKeysEqual([publicAddress, recipient.recipient]),
    ])
  );

  if (isAuctionSeller) {
    return (
      <TransactionProgressPane
        title={
          <>
            You just got paid!
            <br />
            <Box css={{ display: 'inline', color: '$green100' }}>
              +{formatETHWithSuffix(amountReceived)}
            </Box>
          </>
        }
        description={getSuccessCopy(splitPercent?.amountInEth)}
        meta={
          <ButtonGrid>
            <TransactionActionButton href={profilePath} label="View profile" />
          </ButtonGrid>
        }
        status="success"
        fireConfetti
      />
    );
  }

  if (isAuctionCollector) {
    return (
      <TransactionProgressPane
        title="This NFT is now in your collection!"
        description="This auction has been settled on the Ethereum blockchain, and the NFT is now in your collection."
        meta={
          <TransactionActionButtonsExternal
            isReversed
            buttons={[
              <TwitterShareButtonLink
                twitterShareText={twitterShareText}
                key="button"
              />,
              { href: profilePath, label: 'View profile' },
            ]}
          />
        }
        status="success"
        fireConfetti
      />
    );
  }

  const artworkPath = buildArtworkPath({ user: artwork?.creator, artwork });

  return (
    <TransactionProgressPane
      title="Auction settled!"
      description="This auction has been settled and the ETH is now in the seller's wallet."
      meta={
        <ButtonGrid>
          <TransactionActionButton href={artworkPath} label="View NFT" />
        </ButtonGrid>
      }
      status="success"
      fireConfetti
    />
  );
}

const getSuccessCopy = (splitPercent: number) => {
  return splitPercent
    ? `This auction has been settled on the Ethereum blockchain, and your share of ${splitPercent}% has been sent to your wallet.`
    : `This auction has been settled on the Ethereum blockchain, and the ETH has been sent to your wallet.`;
};
