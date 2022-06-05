import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import useHasSocialVerification from 'hooks/queries/hasura/social-verification/use-has-social-verification';
import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import { useArtworkByUuidFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-uuid-from-router';

import Box from 'components/base/Box';
import TransactionProgressPane from './TransactionProgressPane';
import TransactionPaneSkeleton from './TransactionPaneSkeleton';
import TransactionConnectWallet from './TransactionConnectWallet';
import SocialVerificationGuard from 'components/trust-safety/page-guards/SocialVerificationGuard';
import ApprovedCreatorGuard from 'components/trust-safety/page-guards/ApprovedCreatorGuard';
import { PageGuard } from 'types/Moderation';
import UserModeratedGuard from 'components/trust-safety/page-guards/UserModeratedGuard';
import { TransactionActionButton } from './TransactionActionButtons';

import { isAllTrue, isAnyTrue } from 'utils/helpers';
import {
  getArtworkModerationDescription,
  getArtworkModerationTitle,
  isFlaggedForModeration,
} from 'utils/moderation';

import { TransactionLayoutQueryType } from 'types/Artwork';

export interface TransactionGuardProps {
  artworkQueryType: TransactionLayoutQueryType;
  pageGuards: PageGuard[];
}

export default function TransactionGuard(
  component: ReactNode,
  options: TransactionGuardProps
) {
  return (
    <RenderTransactionGuard {...options}>{component}</RenderTransactionGuard>
  );
}

interface RenderTransactionGuardProps extends TransactionGuardProps {
  children: ReactNode;
}

type QueryState = {
  enabled: boolean;
};

type QueryStates = {
  artworkByUuid: QueryState;
  artworkByContractTokenId: QueryState;
  currentUser: QueryState;
  socialVericiation: QueryState;
};

function RenderTransactionGuard(props: RenderTransactionGuardProps) {
  const { children, pageGuards, artworkQueryType } = props;

  const [{ data: user }] = useAccount();

  const queryStates: QueryStates = {
    artworkByUuid: {
      enabled: isAllTrue([
        artworkQueryType === 'uuid',
        pageGuards.includes('artwork-moderated'),
      ]),
    },
    artworkByContractTokenId: {
      enabled: isAllTrue([
        artworkQueryType === 'tokenId',
        pageGuards.includes('artwork-moderated'),
      ]),
    },
    currentUser: {
      enabled: isAnyTrue([
        pageGuards.includes('approved-creator'),
        pageGuards.includes('user-moderated'),
      ]),
    },
    socialVericiation: {
      enabled: pageGuards.includes('social-verification'),
    },
  };

  const { data: artworkDataUuid, isLoading: isArtworkUuidLoading } =
    useArtworkByUuidFromRouter({
      enabled: queryStates.artworkByUuid.enabled,
    });

  const { data: artworkDataTokenId, isLoading: isArtworkTokenIdLoading } =
    useArtworkByContractTokenIdFromRouter({
      enabled: queryStates.artworkByContractTokenId.enabled,
    });

  const artworkData =
    artworkQueryType === 'uuid' ? artworkDataUuid : artworkDataTokenId;

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useUserByPublicKey(
      { publicKey: user?.address },
      { enabled: queryStates.currentUser.enabled }
    );

  const {
    data: hasSocialVerification,
    isLoading: isHasSocialVerificationLoading,
  } = useHasSocialVerification(
    { publicKey: user?.address },
    { enabled: queryStates.socialVericiation.enabled }
  );

  const isLoading = isAnyTrue([
    isAllTrue([isArtworkUuidLoading, queryStates.artworkByUuid.enabled]),
    isAllTrue([
      isArtworkTokenIdLoading,
      queryStates.artworkByContractTokenId.enabled,
    ]),
    isAllTrue([isCurrentUserLoading, queryStates.currentUser.enabled]),
    isAllTrue([
      isHasSocialVerificationLoading,
      queryStates.socialVericiation.enabled,
    ]),
  ]);

  const enabled = false;

  if (isLoading || enabled) {
    return <TransactionPaneSkeleton />;
  }

  if (!user) {
    return <TransactionConnectWallet />;
  }

  const hasApprovedCreatorGuard = isAllTrue([
    !currentUser?.user?.isApprovedCreator,
    pageGuards.includes('approved-creator'),
  ]);

  if (hasApprovedCreatorGuard) {
    return <ApprovedCreatorGuard />;
  }

  const hasSocialVerificationGuard = isAllTrue([
    !hasSocialVerification,
    pageGuards.includes('social-verification'),
  ]);

  if (hasSocialVerificationGuard) {
    return <SocialVerificationGuard />;
  }

  const userModerationStatus = currentUser?.user?.moderationStatus;

  const hasUserModerated = isAllTrue([
    isFlaggedForModeration(userModerationStatus),
    pageGuards.includes('user-moderated'),
  ]);

  if (hasUserModerated) {
    return <UserModeratedGuard userModerationStatus={userModerationStatus} />;
  }

  const artworkModerationStatus = artworkData?.moderationStatus;

  const hasArtworkModerated = isAllTrue([
    isFlaggedForModeration(artworkModerationStatus),
    pageGuards.includes('artwork-moderated'),
  ]);

  if (hasArtworkModerated) {
    return (
      <TransactionProgressPane
        key="artwork-moderated"
        status="warning"
        title={getArtworkModerationTitle(artworkModerationStatus)}
        description={getArtworkModerationDescription(artworkData)}
        meta={
          <Box css={{ width: '100%' }}>
            <TransactionActionButton href="/" label="Back home" />
          </Box>
        }
      />
    );
  }

  return <>{children}</>;
}
