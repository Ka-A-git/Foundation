import Flex from 'components/base/Flex';
import Box from 'components/base/Box';
import Grid from 'components/base/Grid';
import { VerificationLaterStateContainer } from 'components/verify/VerificationContainer';
import SpinnerStroked from 'components/SpinnerStroked';
import Heading from 'components/base/Heading';
import { ServiceName } from 'types/SocialVerification';

interface SocialVerifyingProps {
  serviceName?: ServiceName;
}

export default function SocialVerifying({
  serviceName = ServiceName.TWITTER,
}: SocialVerifyingProps): JSX.Element {
  return (
    <VerificationLaterStateContainer>
      <Box>
        <Grid css={{ gap: '$4' }}>
          <Heading size={{ '@initial': 2, '@bp0': 3 }}>
            Your {serviceName} profile is being verified…
          </Heading>
          <Flex css={{ justifyContent: 'center' }}>
            <SpinnerStroked size={62} />
          </Flex>
        </Grid>
      </Box>
    </VerificationLaterStateContainer>
  );
}
