import { useEffect } from 'react'; 
import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { is } from 'ramda';
import { useAccount } from 'wagmi'; 

import Page from 'components/Page';
import Body from 'components/base/Body';
import Box from 'components/base/Box';
import Heading from 'components/base/Heading';
import FeedFeaturedCreators from 'components/feed/FeedFeaturedCreators';
import FeedArtworks from 'components/feed/FeedArtworks';
import FeedFollowCounter from 'components/feed/FeedFollowCounter';
import LoadingPage from 'components/LoadingPage';
import { WithLayout } from 'components/layouts/Layout';

import { sortCreatorsByUsernames } from 'utils/creator';
import { maybeGetAddress } from 'utils/users';
import getChainId from 'lib/chainId';

import { getFeaturedContentIds } from 'queries/server/content';
import { getUsersByUsernames } from 'queries/hasura/users-v2';

import useUserFollowState from 'hooks/queries/hasura/users/use-user-follow-state';

import Account from 'types/Account';
import { MIN_FOLLOWS_COUNT } from 'lib/constants';
import AuthRequiredPage from 'components/auth/AuthRequiredPage';

interface FeedPageProps {
  featuredCreators: Account[];
  featuredCreatorUsernames: string[];
} 

export default function Feed(props: FeedPageProps): JSX.Element {
  const { featuredCreators } = props;

  const [{ data: user, loading: isLoadingUser }] = useAccount();

  const router = useRouter();

  const publicAddress = user?.address;

  const { data: followCount, isLoading: isLoadingFollowCount } =
    useUserFollowState({
      publicKey: publicAddress,
      currentUserPublicKey: publicAddress,
    });

  const followingCount = followCount?.followingCount;

  const creatorIds = featuredCreators.map((creator) =>
    maybeGetAddress(creator.publicKey)
  );

  const isNumber = is(Number);

  const needsMoreFollows = Boolean(
    isNumber(followingCount) && followingCount < MIN_FOLLOWS_COUNT
  );

  useEffect(
    () => {
      if (isLoadingUser === false && needsMoreFollows) {
        router.replace('/feed?follow=true', undefined, {
          shallow: true,
          scroll: false,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [needsMoreFollows]
  );

  const inFollowMode = Boolean(router.query.follow);

  return (
    <Page title="Feed" footerCss={{ display: inFollowMode ? 'none' : 'block' }}>
      <RenderFeed
        creatorIds={creatorIds}
        followingCount={followingCount}
        publicAddress={publicAddress}
        isLoadingUser={isLoadingUser}
        isLoadingFollowCount={isLoadingFollowCount}
        inFollowMode={inFollowMode}
        user={user}
      />
    </Page>
  );
}

interface RenderFeedProps {
  isLoadingUser: boolean;
  isLoadingFollowCount: boolean;
  followingCount: number;
  creatorIds: string[];
  publicAddress: string;
  inFollowMode: boolean;
  user: unknown; // TODO: extract type from WAGMI
}

function RenderFeed(props: RenderFeedProps): JSX.Element {
  const {
    isLoadingUser,
    isLoadingFollowCount,
    followingCount,
    creatorIds,
    publicAddress,
    inFollowMode,
    user,
  } = props;

  if (isLoadingUser) {
    return <LoadingPage />;
  }

  if (!user) {
    return (
      <AuthRequiredPage
        heading="Build out your Feed"
        subheading="Start building your personal Feed by connecting your wallet and following some of your favorite creators on Foundation."
      />
    );
  }

  if (inFollowMode) {
    return (
      <>
        <Body
          css={{
            flex: 1,
            flexDirection: 'column',
            paddingTop: '$9',
            '@bp1': {
              paddingTop: '$10',
            },
            '@bp2': {
              paddingTop: '$11',
            },
          }}
        >
          <Box
            css={{
              paddingBottom: '$9',
              '@bp1': {
                paddingBottom: '$10',
              },
              '@bp2': {
                paddingBottom: '$11',
              },
            }}
          >
            <Heading
              size="4"
              css={{ maxWidth: 460, marginX: 'auto', textAlign: 'center' }}
            >
              Follow at least five creators to build your Feed…
            </Heading>
          </Box>
          <FeedFeaturedCreators
            creatorIds={creatorIds}
            publicAddress={publicAddress}
          />
        </Body>
        {isLoadingFollowCount ? null : (
          <FeedFollowCounter followingCount={followingCount} />
        )}
      </>
    );
  }

  return (
    <Body css={{ display: 'flex', flexDirection: 'column' }}>
      <FeedArtworks publicAddress={publicAddress} />
    </Body>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<FeedPageProps>
> {
  const chainId = getChainId();

  const { featuredCreatorUsernames } = await getFeaturedContentIds({
    preview: false,
    chainId,
  });

  const users = await getUsersByUsernames({
    usernames: featuredCreatorUsernames,
  });

  const sortedCreators = sortCreatorsByUsernames(
    featuredCreatorUsernames,
    users
  );

  return {
    props: {
      featuredCreators: sortedCreators,
      featuredCreatorUsernames,
    },
    // 1 hour
    revalidate: 3600,
  };
}

Feed.getLayout = WithLayout({ backgroundColor: '$black5' });
