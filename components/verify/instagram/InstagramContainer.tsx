import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/nextjs';
import { useAccount } from 'wagmi';

import InstagramView from 'components/verify/instagram/InstagramView';

import { useSocialVerificationByService } from 'hooks/queries/hasura/social-verification/use-social-verification';
import { useCreateSocialVerificationInstagram } from 'graphql/server/mutations/create-social-verification-instagram.generated';

import SocialSuccess from '../shared/SocialSuccess';
import SocialVerifying from '../shared/SocialVerifying';
import SocialError from '../shared/SocialError';
import LoadingPage from 'components/LoadingPage';

import { getFirstValue } from 'utils/helpers';

import {
  ServiceName,
  SocialVerifService,
  SocialVerifStatus,
} from 'types/SocialVerification';
import useAuthToken from 'hooks/queries/use-auth-token';

export default function InstagramContainer(): JSX.Element {
  const router = useRouter();
  const { data: authToken } = useAuthToken();

  // Note: state is how we get the Instagram API to return
  // the value that we call redirect-path
  // InstagramShareButton within InstagramView
  // uses the redirect-path query param (used more directly in the Twitter flow)
  // to pass through as state following the Instagram API docs
  // https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions/

  const code = getFirstValue(router.query['code']);
  const redirectPath = getFirstValue(router.query['redirect-path']);
  const error = getFirstValue(router.query['error']);
  // const errorReason = getFirstValue(router.query['error_reason']);
  // const errorDescription = getFirstValue(router.query['error_description']);
  const stateWithStringAtEnd = getFirstValue(router.query['state']);
  const states = stateWithStringAtEnd ? stateWithStringAtEnd.split('#_') : [''];
  const state = states[0];

  const windowLocationHref = window.location.href;

  // without the redirect-path part
  const partsOfURL = windowLocationHref.split('?');
  const redirectURIForMutation = partsOfURL[0];

  const [isOverwriteBackgroundProcessLoading, setIsOverwriteLoading] =
    useState(false);
  const [overwriteToTrack, setOverwriteToTrack] = useState('');
  const [usedCode, setUsedCode] = useState(false);

  const [{ data: user }] = useAccount();

  const {
    mutateAsync: createInstagramVerification,
    isLoading: createInstagramSocialVerificationLoading,
    error: createInstagramSocialVerificationError,
  } = useCreateSocialVerificationInstagram({
    onSettled: () => {
      setUsedCode(true);
    },
    onError: (err) => {
      Sentry.captureException(err, {
        tags: { section: 'social-verification-flow', service: 'instagram' },
      });
    },
  });

  useEffect(() => {
    if (code && !usedCode && authToken) {
      createInstagramVerification({
        code: code,
        redirectURI: redirectURIForMutation,
      });
    }
  }, [
    code,
    redirectURIForMutation,
    usedCode,
    createInstagramVerification,
    authToken,
  ]);

  const POLL_INTERVAL = 2000;

  // TODO: Use skip param to stop polling on success or error screen
  const {
    data: socialVerification,
    isLoading: socialVerificationLoading,
    error: socialVerificationGetError,
  } = useSocialVerificationByService(
    { publicKey: user?.address, service: SocialVerifService.INSTAGRAM },
    { refetchInterval: POLL_INTERVAL }
  );

  useEffect(() => {
    if (
      isOverwriteBackgroundProcessLoading &&
      socialVerification?.id === overwriteToTrack &&
      socialVerification?.status !== SocialVerifStatus.USERNAME_IN_USE
    ) {
      setIsOverwriteLoading(false);
      setOverwriteToTrack('');
    }
  }, [
    isOverwriteBackgroundProcessLoading,
    socialVerification?.id,
    socialVerification?.status,
    overwriteToTrack,
  ]);

  const hasVerificationResult =
    socialVerification && !socialVerificationGetError;

  const isValid = socialVerification?.isValid;

  const isSuccessful = isValid;
  const isLoading =
    socialVerificationLoading ||
    createInstagramSocialVerificationLoading ||
    isOverwriteBackgroundProcessLoading;

  const isError =
    (!isValid && hasVerificationResult) ||
    createInstagramSocialVerificationError ||
    error;

  const isVerifying = !!code;

  if (isSuccessful) {
    return (
      <SocialSuccess
        redirectPath={state ? state : redirectPath}
        serviceName="Instagram"
      />
    );
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  // TODO: Consider putting more information on the error screen
  // about why it failed
  if (isError) {
    return (
      <SocialError
        serviceName={ServiceName.INSTAGRAM}
        redirectPath={state ? state : redirectPath}
        socialVerificationID={socialVerification?.id}
      />
    );
  }

  if (isVerifying) {
    return <SocialVerifying serviceName={ServiceName.INSTAGRAM} />;
  }

  // Note: InstagramShareButton within InstagramView
  // uses the redirect-path query param to pass through as
  // state following the Instagram API docs
  // https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions/
  return <InstagramView />;
}
