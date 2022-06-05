import { styled } from 'stitches.config';
import Flex from 'components/base/Flex';
import ConnectWalletButton from 'components/headers/ConnectWalletButton';
import { H1Heading } from 'components/base/Heading';
import Text from 'components/base/Text';

interface AuthRequiredPageProps {
  heading: string;
  subheading: string;
}

export default function AuthRequiredPage(
  props: AuthRequiredPageProps
): JSX.Element {
  const { heading, subheading } = props;
  return (
    <Container>
      <H1Heading size={{ '@initial': 4, '@bp2': 6 }}>{heading}</H1Heading>
      <Paragraph>{subheading}</Paragraph>
      <ConnectWalletButton />
    </Container>
  );
}

const Container = styled(Flex, {
  flexDirection: 'column',
  flex: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '65ch',
  margin: '0 auto',
  textAlign: 'center',
  '@bp2': {
    paddingBottom: '$10',
  },
});

const Paragraph = styled(Text, {
  color: '$black70',
  fontSize: '$2',
  paddingX: '$4',
  marginTop: '$3',
  marginBottom: '$5',
  lineHeight: '$mid',
  '@bp2': {
    marginBottom: '$7',
    fontSize: '20px',
  },
});
