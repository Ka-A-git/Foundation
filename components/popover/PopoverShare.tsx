import { TippyProps } from '@tippyjs/react';
import { useCallback } from 'react';
import { useLocation } from 'react-use';

import UploadIcon from 'assets/icons/upload-icon.svg';
import TwitterIcon from 'assets/icons/twitter-icon.svg';
import CopyIcon from 'assets/icons/copy-icon.svg';
import SuccessIcon from 'assets/icons/success-icon.svg';

import Popover from './Popover';
import PopoverButton from './PopoverButton';
import PopoverMenu from './PopoverMenu';
import Icon from 'components/Icon';
import Text from 'components/base/Text';

import { PopoverMenuOption } from './types';
import { SocialVerifService } from 'types/SocialVerification';

import useCopyText from 'hooks/use-copy-text';
import { useSocialVerificationByService } from 'hooks/queries/hasura/social-verification/use-social-verification';

import { styled } from 'stitches.config';

import {
  ArtworkFragment,
  CollectionFragment,
  UserFragment,
} from 'graphql/hasura/hasura-fragments.generated';

import {
  appendHandle,
  buildArtworkTweet,
  buildCollectionTweet,
} from 'utils/twitter-templates';
import { buildArtworkPath } from 'utils/artwork/artwork';
import { buildCollectionPath } from 'utils/collections';
import { getUserNameOrAddressAndStripAtSymbol } from 'utils/strings';

interface PopoverShareProps extends TippyProps {
  shareType: 'artwork' | 'collection';
  artwork?: ArtworkFragment;
  collection?: CollectionFragment;
  creator: UserFragment;
}

export default function PopoverShare(props: PopoverShareProps): JSX.Element {
  const {
    placement = 'top-end',
    creator,
    artwork,
    collection,
    shareType,
    ...tippyOptions
  } = props;

  const { refetch: refetchSocialVerification } = useSocialVerificationByService(
    { publicKey: creator?.publicKey, service: SocialVerifService.TWITTER },
    { enabled: false }
  );

  const creatorName = getUserNameOrAddressAndStripAtSymbol(creator);

  const { hasCopied, handleCopy } = useCopyText();
  const location = useLocation();

  const openTweetLink = useCallback(async () => {
    const res = await refetchSocialVerification();
    const socialVerificationData = res?.data;

    const twitterHandle = appendHandle(socialVerificationData?.username);

    if (shareType === 'artwork') {
      const twitterShareText = buildArtworkTweet({
        creatorName,
        artworkPath: buildArtworkPath({ artwork, user: creator }),
        twitterUsername: twitterHandle,
      });

      const tweetShareText = `https://twitter.com/intent/tweet?text=${encodeURI(
        twitterShareText
      )}`;
      window.open(tweetShareText);
    }

    if (shareType === 'collection') {
      const collectionPath = buildCollectionPath(collection);

      const collectionTweetText = buildCollectionTweet({
        creatorName: twitterHandle || creatorName,
        collectionPath: collectionPath,
      });

      const tweetShareText = `https://twitter.com/intent/tweet?text=${encodeURI(
        collectionTweetText
      )}`;
      window.open(tweetShareText);
    }
  }, [
    refetchSocialVerification,
    artwork,
    collection,
    creator,
    creatorName,
    shareType,
  ]);

  const popoverOptions: PopoverMenuOption[] = [
    {
      icon: <Icon icon={TwitterIcon} width={24} height={24} />,
      children: 'Tweet',
      onClick: () => {
        openTweetLink();
      },
    },
    {
      icon: hasCopied ? (
        <Icon icon={SuccessIcon} width={20} height={20} />
      ) : (
        <Icon icon={CopyIcon} width={20} height={20} />
      ),
      children: 'Copy Link',
      onClick: () => {
        handleCopy(location.href);
      },
    },
  ];

  return (
    <Popover
      {...tippyOptions}
      button={
        <PopoverButton
          appearance="normal"
          css={{
            paddingX: '$5',
            height: 40,
            '@bp0': {
              height: 56,
            },
            '@bp1': {
              paddingX: '$6',
            },
          }}
        >
          <Icon icon={UploadIcon} width={24} height={24} />
          <PopoverLabel>Share</PopoverLabel>
        </PopoverButton>
      }
      placement={placement}
    >
      <PopoverMenu options={popoverOptions} />
    </Popover>
  );
}

const PopoverLabel = styled(Text, {
  marginLeft: '$3',
  position: 'relative',
  top: -2,
  fontWeight: '$semibold',
  display: 'none',
  '@bp1': {
    display: 'block',
  },
});
