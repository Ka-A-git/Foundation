import Box from 'components/base/Box';
import Grid from 'components/base/Grid';
import Button from 'components/base/Button';
import Heading from 'components/base/Heading';
import Flex from 'components/base/Flex';
import Link from 'components/base/Link';
import { VerificationLaterStateContainer } from 'components/verify/VerificationContainer';

interface SocialSuccessProps {
  redirectPath: string;
  serviceName?: string;
}

export default function SocialSuccess({
  redirectPath,
  serviceName = 'Twitter',
}: SocialSuccessProps): JSX.Element {
  return (
    <VerificationLaterStateContainer>
      <Box>
        <Grid css={{ gap: '$4' }}>
          <Flex css={{ justifyContent: 'center' }}>
            <Heading size={{ '@initial': 2, '@bp0': 3 }}>
              Your profile has been verified via {serviceName}!
            </Heading>
          </Flex>
          <Link
            href={redirectPath}
            css={{
              textDecoration: 'none',
              color: 'inherit',
              marginX: 'auto',
            }}
          >
            <Button
              size="large"
              shape="regular"
              color="black"
              type="button"
              hoverable
            >
              Continue
            </Button>
          </Link>
        </Grid>
      </Box>
    </VerificationLaterStateContainer>
  );
}
