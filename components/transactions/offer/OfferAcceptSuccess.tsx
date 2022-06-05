import { useAccount } from 'wagmi';

import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import {
  ButtonGrid,
  TransactionActionButton,
} from '../generic/TransactionActionButtons';
import Fees from '../generic/FeesTable';
import Box from 'components/base/Box';
import Paragraph from 'components/base/Paragraph';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { buildArtworkPath } from 'utils/artwork/artwork';
import { formatETHWithSuffix } from 'utils/formatters';

import useGetFees from 'hooks/web3/transactions/use-get-fees';
import useLastBlockNumber from 'hooks/web3/use-last-block-number';

interface OfferAcceptSuccessProps {
  artwork: ArtworkFragmentExtended;
  txHash: string;
  offerAmount: number;
}

export default function OfferAcceptSuccess(props: OfferAcceptSuccessProps) {
  const { artwork, txHash, offerAmount } = props;

  const [{ data: user }] = useAccount();

  const currentUserPublicKey = user?.address;

  const defaultParams = {
    contractAddress: artwork?.contractAddress,
    tokenId: artwork?.tokenId,
  };

  const lastBlockNumber = useLastBlockNumber(txHash);

  const { data: feesData } = useGetFees({
    ...defaultParams,
    currentUserPublicKey,
    price: offerAmount,
    // here we pass in the previous block number to get retroactive fees
    overrides: { blockTag: lastBlockNumber },
  });

  // TODO: come up with a stronger way to retroactively query fees
  const formattedPrice = formatETHWithSuffix(
    feesData?.currentUserFee?.amountInEth
  );

  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });

  return (
    <TransactionProgressPane
      title="You sold it!"
      description={
        <Box>
          <Paragraph css={{ marginBottom: '$7' }}>
            The NFT has been sold and transferred, and the funds for the sale
            have been sent to your wallet.
          </Paragraph>
          <Box css={{ borderTop: 'solid 1px $black10', paddingTop: '$4' }}>
            <Fees.LineItem
              label="You received"
              value={formattedPrice}
              size={3}
            />
          </Box>
        </Box>
      }
      status="success"
      meta={
        <ButtonGrid>
          <TransactionActionButton
            href={artworkPath}
            label="View NFT"
            variants={{ color: 'white' }}
          />
        </ButtonGrid>
      }
      fireConfetti={true}
    />
  );
}
