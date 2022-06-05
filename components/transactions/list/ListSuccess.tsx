import TwitterShareButtonLink from 'components/links/TwitterShareButtonLink';
import TransactionProgressPane from 'components/transactions/generic/TransactionProgressPane';
import { TransactionActionButtonsExternal } from '../generic/TransactionActionButtons';

import { useSocialVerificationByService } from 'hooks/queries/hasura/social-verification/use-social-verification';
import useLastBlockNumber from 'hooks/web3/use-last-block-number';
import useGetFees from 'hooks/web3/transactions/use-get-fees';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';
import { MarketType } from 'types/Auction';
import { SocialVerifService } from 'types/SocialVerification';

import { buildArtworkPath } from 'utils/artwork/artwork';
import {
  buildListTweet,
  buildSecondaryListTweet,
  getTwitterUsername,
} from 'utils/twitter-templates';

interface ListSuccessProps {
  artwork: ArtworkFragmentExtended;
  txHash: string;
  currentUserPublicKey: string;
}

export default function ListSuccess(props: ListSuccessProps) {
  const { artwork, txHash, currentUserPublicKey } = props;

  const lastBlockNumber = useLastBlockNumber(txHash);

  const { data: feesData } = useGetFees({
    currentUserPublicKey,
    contractAddress: artwork?.contractAddress,
    tokenId: artwork?.tokenId,
    price: 0,
    overrides: { blockTag: lastBlockNumber },
  });

  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });

  const { data: socialVerificationData } = useSocialVerificationByService({
    publicKey: artwork?.creator?.publicKey,
    service: SocialVerifService.TWITTER,
  });

  const twitterShareText: Record<MarketType, string> = {
    primary: buildListTweet({
      artworkName: artwork?.name,
      artworkPath,
    }),
    secondary: buildSecondaryListTweet({
      artworkName: artwork?.name,
      artworkPath,
      twitterUsername: getTwitterUsername({
        socialVerifications: socialVerificationData
          ? [socialVerificationData]
          : null,
      }),
    }),
  };

  return (
    <TransactionProgressPane
      title="Your NFT has been listed!"
      description="Your NFT has been listed on our marketplace."
      status="success"
      meta={
        <TransactionActionButtonsExternal
          isReversed
          buttons={[
            <TwitterShareButtonLink
              twitterShareText={
                twitterShareText[
                  feesData?.isPrimarySale ? 'primary' : 'secondary'
                ]
              }
              key="button"
            />,
            { href: artworkPath, label: 'View NFT' },
          ]}
        />
      }
      fireConfetti={true}
    />
  );
}
