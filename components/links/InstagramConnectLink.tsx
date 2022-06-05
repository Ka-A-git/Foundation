import { useRouter } from 'next/router';

import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import Button from 'components/base/Button';
import Link from 'components/base/Link';

import InstagramIcon from 'assets/icons/instagram-icon.svg';

import { getFirstValue } from 'utils/helpers';

const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID;

export default function InstagramConnectLink(): JSX.Element {
  const router = useRouter();
  const redirectPath = getFirstValue(router.query['redirect-path']);
  const windowLocationHref = window.location.href;
  const partsOfURL = windowLocationHref.split('?');
  const redirectURI = encodeURI(partsOfURL[0]);
  const redirectPathEncoded = encodeURI(redirectPath);

  // Note: InstagramShareButton within InstagramView
  // uses the redirect-path query param to pass through as
  // state following the Instagram API docs
  // https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions/

  return (
    <Link
      href={`https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectURI}&scope=user_profile&response_type=code&state=${redirectPathEncoded}`}
      css={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <Button
        size="large"
        color="black"
        type="button"
        shape="regular"
        css={{ width: '100%' }}
      >
        <Flex css={{ justifyContent: 'center', alignItems: 'center' }}>
          <InstagramIcon style={{ display: 'block', width: 24, height: 24 }} />
          <Text css={{ marginLeft: '$4', position: 'relative', top: -2 }}>
            Connect to Instagram
          </Text>
        </Flex>
      </Button>
    </Link>
  );
}
