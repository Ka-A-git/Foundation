import { useAccount } from 'wagmi';

import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';

import TwitterForm from 'components/verify/twitter/TwitterForm';
import TextField from 'components/forms/fields/TextField';
import SubmitButton from 'components/forms/SubmitButton';
import { VerificationFormContainer } from 'components/verify/VerificationContainer';
import TwitterShareButtonLink from 'components/links/TwitterShareButtonLink';
import Grid from 'components/base/Grid';
import Box from 'components/base/Box';
import Heading from 'components/base/Heading';
import Text from 'components/base/Text';
import FormHeading from 'components/forms/FormHeading';
import Mono from 'components/base/Mono';

import { buildVerifyTweet } from 'utils/twitter-templates';

import { TwitterFormValues } from './types';

import { getUsernameOrAddress } from 'utils/helpers';

interface TwitterViewProps {
  onSubmit: (values: TwitterFormValues) => void;
}

export default function TwitterView(props: TwitterViewProps): JSX.Element {
  const { onSubmit } = props;

  const [{ data: user }] = useAccount();

  const { data: userData } = useUserByPublicKey({
    publicKey: user?.address,
  });

  const twitterShareText = buildVerifyTweet({
    creatorName: `${getUsernameOrAddress(userData?.user)}`,
    creatorAddress: user?.address,
    profilePath: `/${getUsernameOrAddress(userData?.user)}`,
  });

  return (
    <VerificationFormContainer>
      <TwitterForm
        onSubmit={onSubmit}
        initialValues={{
          tweetURL: '',
        }}
      >
        <FormHeading>Verify your profile via Twitter</FormHeading>
        <Box
          css={{
            marginY: '$6',
            marginX: 'auto',
            backgroundColor: '$white100',
            borderRadius: '$3',
            boxShadow: '$0',
            padding: '$5',
            maxWidth: 720,
            '@bp1': {
              marginY: '$11',
              padding: '$8',
            },
          }}
        >
          <Box
            css={{
              marginBottom: '$7',
            }}
          >
            <Text
              size={{ '@initial': 1, '@bp1': 2 }}
              weight="semibold"
              css={{ color: '$black60', marginBottom: '$4' }}
            >
              Step One
            </Text>
            <Grid
              css={{
                gridGap: '$3',
                gridtemplateColumns: '1fr',
                marginBottom: '$8',
                '@bp1': {
                  gridTemplateColumns: '2fr 1fr',
                },
              }}
            >
              <Box>
                <Heading
                  size={{ '@initial': 2, '@bp1': 3 }}
                  css={{ marginBottom: '$4' }}
                >
                  Post a public tweet that contains your wallet address.
                </Heading>
                <Text size={1}>Your wallet address is:</Text>
              </Box>
              <Mono
                size={0}
                css={{ wordBreak: 'break-all', gridColumn: '1/3' }}
              >
                {user?.address}
              </Mono>
              <TwitterShareButtonLink
                twitterShareText={twitterShareText}
                text={'Post Tweet'}
              />
            </Grid>
          </Box>
          <Box>
            <Text
              size={{ '@initial': 1, '@bp1': 2 }}
              weight="semibold"
              css={{ color: '$black60', marginBottom: '$4' }}
            >
              Step Two
            </Text>
            <Heading
              size={{ '@initial': 2, '@bp1': 3 }}
              css={{ marginBottom: '$4' }}
            >
              Paste the URL of the tweet to verify your profile.
            </Heading>
          </Box>
          <Grid css={{ gridGap: '$6' }}>
            <TextField
              placeholder="Tweet URL"
              name="tweetURL"
              label="Tweet URL"
            />
            <SubmitButton submittingText="Confirm" disableIfInvalid>
              Confirm
            </SubmitButton>
          </Grid>
        </Box>
      </TwitterForm>
    </VerificationFormContainer>
  );
}
