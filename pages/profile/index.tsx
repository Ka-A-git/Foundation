import { theme } from 'stitches.config';
import { Formik, Form } from 'formik';
import { ReactNode, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

import useUpsertUser from 'hooks/mutations/use-upsert-user';
import useUserByPublicKey, {
  useUserWithEmailByPublicKey,
} from 'hooks/queries/hasura/users/use-user-by-public-key';
import { useValidSocialVerificationByService } from 'hooks/queries/hasura/social-verification/use-social-verification';
import useBodyColor from 'hooks/use-body-color';
import useAuthToken from 'hooks/queries/use-auth-token';

import { PageType } from 'types/page';
import { SocialVerifService } from 'types/SocialVerification';

import { mergeSocialLinks, socialLinks } from 'utils/social-links';
import { DEFAULT_PROVIDER_TYPE } from 'lib/constants';

import { createUserSchema } from 'schemas/user';

import Box from 'components/base/Box';
import Grid from 'components/base/Grid';
import UserFormFields from 'components/forms/onboarding/UserFormFields';
import FormContainer from 'components/forms/FormContainer';
import FormHeading from 'components/forms/FormHeading';
import FormGrid from 'components/forms/FormGrid';
import Page from 'components/Page';
import Body from 'components/base/Body';
import SubmitButton from 'components/forms/SubmitButton';
import LoadingPage from 'components/LoadingPage';
import useModal from 'hooks/use-modal';
import { ModalKey } from 'types/modal';
import { getUsernameOrAddress } from 'utils/helpers';
import { useQueryClient } from 'react-query';

export default function Profile(): JSX.Element {
  const { setCurrentModal } = useModal();
  const [{ data: user, loading: isUserLoading }] = useAccount();
  const { data: authToken, isLoading: isAuthTokenLoading } = useAuthToken({
    onError: () => {
      setCurrentModal(ModalKey.AUTH_MAIN);
    },
  });
  useBodyColor(theme.colors.black5.value);

  const { data, isLoading: isUserWithEmailLoading } =
    useUserWithEmailByPublicKey(
      { publicKey: user?.address },
      { enabled: Boolean(authToken) }
    );

  const router = useRouter();

  const { data: twitterSocialVerification } =
    useValidSocialVerificationByService({
      publicKey: user?.address,
      service: SocialVerifService.TWITTER,
    });

  const { data: instagramSocialVerification } =
    useValidSocialVerificationByService({
      publicKey: user?.address,
      service: SocialVerifService.INSTAGRAM,
    });

  const userData = data?.user;

  const username = userData?.username;

  const pageCopy = {
    title: 'Edit your profile',
    action: 'Save changes',
    submittingText: 'Saving changes…',
  };

  const { mutateAsync: upsertUser } = useUpsertUser({
    onSuccess: (res) => {
      const queryCacheKey = useUserByPublicKey.getKey({
        publicKey: res.upsertUser.publicKey,
      });
      // refetch the user on profile update
      queryClient.invalidateQueries(queryCacheKey);
    },
  });

  const queryClient = useQueryClient();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        // upsert the user
        const res = await upsertUser({ data: values });

        // get username or publicKey from response
        const usernameOrPublicKey = getUsernameOrAddress(res.upsertUser);

        // push to their profile route
        await router.push(`/${usernameOrPublicKey}`);
      } catch (err) {
        console.log('Error');
      }
    },
    [upsertUser, router]
  );

  if (
    isUserLoading ||
    isUserWithEmailLoading ||
    !userData ||
    isAuthTokenLoading
  ) {
    return (
      <Page title="Profile" type={PageType.auth}>
        <LoadingPage />
      </Page>
    );
  }

  return (
    <PageContainer>
      <FormHeading>{pageCopy.title}</FormHeading>
      <FormGrid>
        <FormContainer>
          <Formik
            initialValues={{
              name: userData?.name ?? '',
              email: userData?.email ?? '',
              providerType: userData?.providerType ?? DEFAULT_PROVIDER_TYPE,
              username: userData?.username ?? '',
              bio: userData?.bio ?? '',
              coverImageUrl: userData?.coverImageUrl ?? '',
              profileImageUrl: userData?.profileImageUrl ?? '',
              links: mergeSocialLinks(socialLinks, userData?.links),
            }}
            validationSchema={createUserSchema({ currentUsername: username })}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid
                css={{
                  gap: '$7',
                  '@bp3': {
                    gap: '$9',
                  },
                }}
              >
                <UserFormFields
                  twitterSocialVerification={twitterSocialVerification}
                  instagramSocialVerification={instagramSocialVerification}
                />
              </Grid>
              <Box css={{ paddingTop: '$7' }}>
                <SubmitButton
                  submittingText={pageCopy.submittingText}
                  disableIfInvalid
                >
                  {pageCopy.action}
                </SubmitButton>
              </Box>
            </Form>
          </Formik>
        </FormContainer>
      </FormGrid>
    </PageContainer>
  );
}

interface PageContainerProps {
  children: ReactNode | ReactNode[];
}

function PageContainer({ children }: PageContainerProps): JSX.Element {
  return (
    <>
      <Page title="Profile" type={PageType.auth}>
        <Body>{children}</Body>
      </Page>
    </>
  );
}
