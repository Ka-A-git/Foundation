import { any } from 'ramda';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import Flex from 'components/base/Flex';
import JoinCommunity from 'components/join/JoinCommunity';
import SetupProfile from 'components/join/SetupProfile';
import LoadingPage from 'components/LoadingPage';

import { useValidSocialVerificationByService } from 'hooks/queries/hasura/social-verification/use-social-verification';
import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import useModal from 'hooks/use-modal';

import { SocialVerifService } from 'types/SocialVerification';

import { ModalKey } from 'types/modal';

interface InviteOnlyOverlayProps {
  children: JSX.Element;
  enabled: boolean;
}

export default function InviteOnlyOverlay(
  props: InviteOnlyOverlayProps
): JSX.Element {
  const { children, enabled } = props;

  if (!enabled) {
    return children;
  }

  return <InviteOnlyContent />;
}

function InviteOnlyContent(): JSX.Element {
  const [showSetup, setShowSetup] = useState(false);
  const [{ data: user, loading: isUserLoading }] = useAccount();

  const publicAddress = user?.address;

  const { setCurrentModal } = useModal();

  useEffect(() => {
    if (!user && !isUserLoading) {
      setCurrentModal(ModalKey.AUTH_MAIN);
    }
  }, [user, isUserLoading, setCurrentModal]);

  const {
    data: twitterSocialVerification,
    isLoading: isLoadingTwitterVerification,
  } = useValidSocialVerificationByService({
    publicKey: publicAddress,
    service: SocialVerifService.TWITTER,
  });

  const {
    data: instagramSocialVerification,
    isLoading: isLoadingInstagramVerification,
  } = useValidSocialVerificationByService({
    publicKey: publicAddress,
    service: SocialVerifService.INSTAGRAM,
  });

  const isLoadingVerification =
    isLoadingTwitterVerification || isLoadingInstagramVerification;

  const { data: userData, isLoading: isLoadingServerUser } = useUserByPublicKey(
    { publicKey: publicAddress },
    { refetchOnWindowFocus: false }
  );

  const currentUser = userData?.user;
  const isApprovedCreator = currentUser?.isApprovedCreator;

  const loadingStates = [
    isLoadingServerUser,
    isUserLoading,
    isLoadingVerification,
  ];

  const isLoading = any(Boolean, loadingStates);

  if (isLoading) {
    return (
      <LoadingPage
        css={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: 999,
          transform: 'translate(-50%, -50%)',
          padding: 0,
        }}
      />
    );
  }

  return (
    <Flex
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginY: 'auto',
      }}
    >
      {showSetup ? (
        <SetupProfile
          isApprovedCreator={isApprovedCreator}
          twitterSocialVerification={twitterSocialVerification}
          instagramSocialVerification={instagramSocialVerification}
          currentUser={currentUser}
        />
      ) : (
        <JoinCommunity onClick={() => setShowSetup(true)} />
      )}
    </Flex>
  );
}
