import { compose, propOr, find, when } from 'ramda';

import SocialVerification, {
  SocialVerifService,
} from 'types/SocialVerification';

import { notEmptyOrNil } from './helpers';

interface SocialVerificationData {
  socialVerifications: SocialVerification[];
}

export const appendHandle = when(notEmptyOrNil, (handle) => `@${handle}`);

export const getTwitterUsername = compose<
  SocialVerificationData,
  SocialVerification[],
  SocialVerification,
  string,
  string
>(
  appendHandle,
  (social) => social?.username,
  find(
    (verif: SocialVerification) => verif.service === SocialVerifService.TWITTER
  ),
  propOr([], 'socialVerifications')
);

const createShareURL = (path: string): string => {
  return new URL(path, 'https://foundation.app').href;
};

interface BuildClaimTweetArgs {
  artworkName: string;
  creatorName: string;
  usernameOrAddress: string;
  twitterUsername: string;
}

// tweet at the end of the claim flow
export const buildClaimTweet = ({
  artworkName,
  creatorName,
  usernameOrAddress,
  twitterUsername,
}: BuildClaimTweetArgs): string => {
  return `I just added ${artworkName} by ${
    twitterUsername || creatorName
  } to my collection on @foundation! 🌐

${createShareURL(usernameOrAddress)}`;
};

interface BuildArtworkTweetArgs {
  creatorName: string;
  artworkPath: string;
  twitterUsername: string;
}

// tweet for sharing an artwork from an artwork page
export const buildArtworkTweet = ({
  creatorName,
  artworkPath,
  twitterUsername,
}: BuildArtworkTweetArgs): string => {
  return `Check out this NFT by ${
    twitterUsername || creatorName
  } on @foundation! 🌐

${createShareURL(artworkPath)}`;
};

interface BuildCollectionTweetArgs {
  creatorName: string;
  collectionPath: string;
}

export const buildCollectionTweet = ({
  creatorName,
  collectionPath,
}: BuildCollectionTweetArgs): string => {
  return `Check out this collection by ${creatorName} on @foundation! 🌐

${createShareURL(collectionPath)}`;
};

interface BuildVerifyTweetArgs {
  creatorName: string;
  creatorAddress: string;
  profilePath: string;
}

export const buildVerifyTweet = ({
  creatorAddress,
  profilePath,
}: BuildVerifyTweetArgs): string => {
  return `I’m on @foundation 🌐

${creatorAddress}

${createShareURL(profilePath)}`;
};

interface BuildListTweetArgs {
  artworkName: string;
  artworkPath: string;
}

// tweet at the end of the list flow
export const buildListTweet = ({
  artworkName,
  artworkPath,
}: BuildListTweetArgs): string => {
  return `I just listed “${artworkName}” for sale on @foundation! 🌐

${createShareURL(artworkPath)}`;
};

interface BuildSecondaryListTweetArgs {
  artworkName: string;
  artworkPath: string;
  twitterUsername: string;
}

// tweet at the end of the secondary list flow
export const buildSecondaryListTweet = ({
  artworkName,
  artworkPath,
  twitterUsername,
}: BuildSecondaryListTweetArgs): string => {
  if (twitterUsername) {
    return `I just listed “${artworkName}” by ${twitterUsername} for sale on @foundation! 🌐

${createShareURL(artworkPath)}`;
  }

  return `I just listed “${artworkName}” for sale on @foundation! 🌐

${createShareURL(artworkPath)}`;
};

interface BuildShareProfileTweetArgs {
  usernameOrAddress: string;
}

export const buildShareProfileTweet = ({
  usernameOrAddress,
}: BuildShareProfileTweetArgs): string => {
  return `Check out my profile on 🌐 @foundation ↓

${createShareURL(usernameOrAddress)}`;
};
