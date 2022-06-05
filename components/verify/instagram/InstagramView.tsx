import Grid from 'components/base/Grid';
import Heading from 'components/base/Heading';
import Body from 'components/base/Body';

import InstagramConnectLink from 'components/links/InstagramConnectLink';
import Paragraph from 'components/base/Paragraph';
import TextLink from 'components/base/TextLink';
import FormHeading from 'components/forms/FormHeading';

export default function InstagramView(): JSX.Element {
  return (
    <Body>
      <FormHeading>Verify your profile via Instagram</FormHeading>
      <Grid
        css={{
          marginY: '$6',
          marginX: 'auto',
          backgroundColor: '$white100',
          borderRadius: '$3',
          boxShadow: '$0',
          padding: '$5',
          maxWidth: 720,
          gridGap: '$6',
          '@bp1': {
            marginY: '$11',
            padding: '$8',
          },
        }}
      >
        <Heading size={{ '@initial': 2, '@bp1': 3 }}>
          Verify your profile to prove to the authenticity of your account to
          Foundation.
        </Heading>
        <Paragraph css={{ maxWidth: 350 }}>
          Please visit{' '}
          <TextLink
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com"
            css={{ display: 'inline' }}
          >
            Instagram
          </TextLink>{' '}
          to ensure you are currently signed in to the account you want to
          verify.
        </Paragraph>
        <InstagramConnectLink />
      </Grid>
    </Body>
  );
}
