import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import { TransactionActionButtonsExternal } from '../generic/TransactionActionButtons';
import TwitterShareButtonLink from 'components/links/TwitterShareButtonLink';
import Text from 'components/base/Text';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import useBuyTweetText from 'hooks/use-claim-tweet-text';

import { buildArtworkPath } from 'utils/artwork/artwork';
import { formatETHWithSuffix } from 'utils/formatters';

interface BuyNowSuccessProps {
  artwork: ArtworkFragmentExtended;
  buyNowPrice: number;
}

// TODO: Move this copy to lib/transactionCopy

export default function BuyNowSuccess(props: BuyNowSuccessProps) {
  const { artwork, buyNowPrice } = props;

  const formattedAmount = formatETHWithSuffix(buyNowPrice);
  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });

  const twitterShareText = useBuyTweetText({ artwork });

  return (
    <TransactionProgressPane
      title="You got it!"
      description={
        <>
          You bought the NFT for{' '}
          <Text css={{ display: 'inline' }} weight="semibold">
            {formattedAmount}
          </Text>
          .
        </>
      }
      status="success"
      meta={
        <TransactionActionButtonsExternal
          isReversed
          buttons={[
            <TwitterShareButtonLink
              twitterShareText={twitterShareText}
              key="button"
            />,
            { href: artworkPath, label: 'View NFT' },
          ]}
        />
      }
      fireConfetti
    />
  );
}
