import { useAccount } from 'wagmi';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';

import { buildClaimTweet } from 'utils/twitter-templates';
import { getUsernameOrAddress } from 'utils/helpers';

import { useSocialVerificationByService } from './queries/hasura/social-verification/use-social-verification';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';

import { SocialVerifService } from 'types/SocialVerification';

interface BuyTweetTextVariables {
  artwork: ArtworkFragmentExtended;
}

export default function useBuyTweetText(variables: BuyTweetTextVariables) {
  const { artwork } = variables;

  const [{ data: user }] = useAccount();

  const publicAddress = user?.address;

  const { data: userData } = useUserByPublicKey(
    { publicKey: publicAddress },
    { refetchOnWindowFocus: false }
  );

  const artworkCreator = artwork?.creator;
  const artworkCreatorName = artworkCreator?.name ?? artworkCreator?.username;

  const { data: socialVerificationsData } = useSocialVerificationByService({
    publicKey: artwork?.creator?.publicKey,
    service: SocialVerifService.TWITTER,
  });

  const twitterShareText = buildClaimTweet({
    artworkName: artwork?.name,
    creatorName: artworkCreatorName,
    usernameOrAddress: getUsernameOrAddress(userData?.user),
    twitterUsername: socialVerificationsData?.username,
  });

  return twitterShareText;
}
