import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { includes } from 'ramda';

import Grid from 'components/base/Grid';
import Heading from 'components/base/Heading';
import Button from 'components/base/Button';
import { VerificationLaterStateContainer } from 'components/verify/VerificationContainer';

import { ServiceName } from 'types/SocialVerification';

import { useDeleteSocialVerification } from 'graphql/server/mutations/delete-social-verification.generated';
import Paragraph from 'components/base/Paragraph';
import Mono from 'components/base/Mono';

interface SocialErrorProps {
  reset?: any;
  serviceName?: ServiceName;
  failedReason?: string;
  redirectPath?: string;
  socialVerificationID?: string;
}

export default function SocialError(props: SocialErrorProps): JSX.Element {
  const {
    reset,
    serviceName = ServiceName.TWITTER,
    redirectPath,
    socialVerificationID,
    failedReason,
  } = props;

  const router = useRouter();

  const { mutateAsync: deleteInstagramVerification } =
    useDeleteSocialVerification();

  const failedReasonToShow =
    failedReason && includes('Ethereum address', failedReason)
      ? 'Your Ethereum address needs to be included somewhere in the tweet.'
      : failedReason;

  const handleDelete = useCallback(async () => {
    if (socialVerificationID) {
      await deleteInstagramVerification({
        id: socialVerificationID,
      });
    }
    await router.push(
      `/profile/verify/instagram?redirect-path=${redirectPath}`
    );
  }, [deleteInstagramVerification, socialVerificationID, redirectPath, router]);

  return (
    <VerificationLaterStateContainer>
      <Grid css={{ gap: '$4', maxWidth: 400, textAlign: 'center' }}>
        <Heading size={{ '@initial': 2, '@bp0': 3 }}>
          There was an error while verifying your {serviceName} profile.
        </Heading>
        <Paragraph css={{ marginX: 'auto', marginBottom: '$4', maxWidth: 500 }}>
          Please try again.
        </Paragraph>
        {failedReason && (
          <Mono
            css={{
              color: '$red100',
            }}
          >
            {failedReasonToShow}
          </Mono>
        )}
        <Button
          size="large"
          shape="regular"
          color="black"
          css={{
            width: '100%',
          }}
          onClick={serviceName === ServiceName.INSTAGRAM ? handleDelete : reset}
          hoverable
        >
          Retry verification
        </Button>
      </Grid>
    </VerificationLaterStateContainer>
  );
}
