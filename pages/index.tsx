import { GetStaticPropsResult } from 'next';

import Page from 'components/Page';
import Body from 'components/base/Body';

import CollectionsBlock from 'components/homepage/CollectionsBlock';
import CreatorsBlock from 'components/homepage/CreatorsBlock';
import DestinationBlock from 'components/homepage/DestinationBlock';
import FeaturedArtwork from 'components/artworks/featured-artwork/FeaturedArtwork';
import UsersBlock from 'components/homepage/UsersBlock';

import { PageType } from 'types/page';
import {
  ArtworkFragmentExtended,
  UserFragment,
} from 'graphql/hasura/hasura-fragments.generated';

import { getFeaturedContentIds } from 'queries/server/content';
import { getArtworkByContractTokenId } from 'queries/hasura/artworks-v2';
import { getUsersByUsernames } from 'queries/hasura/users-v2';

import getChainId from 'lib/chainId';

import { FeaturedCollection, getFeaturedCollectionNfts } from 'utils/homepage';

interface IndexPageProps {
  artwork: ArtworkFragmentExtended;
  collections: FeaturedCollection[];
  users: UserFragment[];
}

export default function IndexPage(props: IndexPageProps): JSX.Element {
  const { artwork, collections, users } = props;
  return (
    <Page title={false} type={PageType.maximal}>
      <Body>
        {artwork && <FeaturedArtwork artwork={artwork} />}
        <CollectionsBlock collections={collections} />
        <DestinationBlock />
      </Body>
      <CreatorsBlock />
      <UsersBlock users={users} />
    </Page>
  );
}

export async function getStaticProps({
  preview = false,
}: {
  preview: boolean;
}): Promise<GetStaticPropsResult<IndexPageProps>> {
  const chainId = getChainId();

  const {
    highlightedNFTId,
    highlightedNFTCollectionSlug,
    featuredCollectionNftUrls,
    featuredProfileUsernames,
  } = await getFeaturedContentIds({ preview, chainId });

  const featuredArtwork = await getArtworkByContractTokenId({
    tokenId: highlightedNFTId,
    contractSlug: highlightedNFTCollectionSlug,
  });

  const users = await getUsersByUsernames({
    usernames: featuredProfileUsernames,
  });

  const sortedUsers = users.sort((a, b) => {
    return (
      featuredProfileUsernames.indexOf(a.username) -
      featuredProfileUsernames.indexOf(b.username)
    );
  });

  const collections = await getFeaturedCollectionNfts(
    featuredCollectionNftUrls
  );

  return {
    props: {
      artwork: featuredArtwork || null,
      collections,
      users: sortedUsers,
    },
    // refresh every 5 mins
    revalidate: 60 * 5,
  };
}
