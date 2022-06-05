import { useQueryClient } from 'react-query';

import useCreatorsFeed from 'hooks/queries/hasura/users/use-creators-feed';
import useInfiniteData from 'hooks/use-infinite-data';

import CreatorResults from './CreatorResults';

import { QueryCacheKey } from 'types/Queries';

interface FeedFeaturedCreatorsProps {
  publicAddress: string;
  creatorIds: string[];
  enableHeader?: boolean;
  hideBiosOnMobile?: boolean;
}

export default function FeedFeaturedCreators(
  props: FeedFeaturedCreatorsProps
): JSX.Element {
  const {
    publicAddress,
    creatorIds,
    enableHeader = true,
    hideBiosOnMobile = false,
  } = props;

  const queryClient = useQueryClient();

  const onFollowUpdate = () => {
    queryClient.invalidateQueries(QueryCacheKey.FeedFeaturedCreators);
    queryClient.invalidateQueries(QueryCacheKey.UserFollowCounts);
    queryClient.invalidateQueries(QueryCacheKey.FollowsByUserPublicKeys);
  };

  const {
    data: creatorsData,
    isLoading: creatorsLoading,
    fetchNextPage,
    isFetching,
  } = useCreatorsFeed({
    publicKey: publicAddress,
    publicKeys: creatorIds,
  });

  const creators = useInfiniteData(creatorsData, 'publicKey');

  return (
    <CreatorResults
      publicAddress={publicAddress}
      isFetching={isFetching}
      isLoading={creatorsLoading}
      creators={creators}
      handleNextPage={fetchNextPage}
      enableHeader={enableHeader}
      onFollowUpdate={onFollowUpdate}
      noMoreResults={true}
      hideBiosOnMobile={hideBiosOnMobile}
    />
  );
}
