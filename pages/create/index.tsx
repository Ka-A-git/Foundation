import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import NextLink from 'next/link';

import Heading from 'components/base/Heading';
import Flex from 'components/base/Flex';
import Text from 'components/base/Text';
import Card from 'components/base/Card';
import TextLink from 'components/base/TextLink';
import LoadingPage from 'components/LoadingPage';
import Paragraph from 'components/base/Paragraph';
import Icon from 'components/Icon';
import CollectionRow from 'components/create/CollectionRow';
import TransactionLayoutV2 from 'components/layouts/TransactionLayoutV2';
import Page from 'components/Page';
import TransactionWarningBlock from 'components/trust-safety/TransactionWarningBlock';
import InviteOnlyOverlay from 'components/join/InviteOnlyOverlay';

import PlusIcon from 'assets/icons/plus-large-icon.svg';

import useUserByPublicKey from 'hooks/queries/hasura/users/use-user-by-public-key';
import { useUserAvailableCollections } from 'hooks/queries/hasura/collections/use-user-collections';
import useUserModerationState from 'hooks/queries/hasura/users/use-user-moderation-state';
import useModal from 'hooks/use-modal';
import useAuthToken from 'hooks/queries/use-auth-token';

import { isAllTrue, isAnyTrue, isEmptyOrNil } from 'utils/helpers';

import { PageType } from 'types/page';
import { ModalKey } from 'types/modal';
import { ModerationStatus } from 'types/Moderation';

CreatePage.getLayout = TransactionLayoutV2({
  title: 'Create on Foundation',
  backgroundColor: '$black5',
  pageType: PageType.minimalLoggedIn,
});

export default function CreatePage(): JSX.Element {
  const { setCurrentModal } = useModal();
  const [{ data: user, loading: isUserLoading }] = useAccount();
  const { data: authToken, isLoading: isAuthTokenLoading } = useAuthToken();

  const publicAddress = user?.address;

  const isUserDisconnected = isAllTrue([!user, !isUserLoading]);
  const hasNoAuthToken = isAllTrue([!authToken, !isAuthTokenLoading]);

  useEffect(() => {
    if (isUserDisconnected || hasNoAuthToken) {
      setCurrentModal(ModalKey.AUTH_MAIN);
    }
  }, [isUserDisconnected, setCurrentModal, hasNoAuthToken]);

  const { data: userData, isLoading: userIsLoading } = useUserByPublicKey({
    publicKey: publicAddress,
  });

  const { data: moderationData, isLoading: isModerationStatusLoading } =
    useUserModerationState({
      publicKey: publicAddress,
    });

  const isUserModerated = moderationData?.isUserModerated;
  const moderationStatus = moderationData?.moderationStatus;

  const serverUser = userData?.user;

  const isApprovedCreator = serverUser?.isApprovedCreator;

  const { data: availableCollectionsData, isLoading: isCollectionsLoading } =
    useUserAvailableCollections(
      { publicKey: publicAddress },
      {
        enabled: Boolean(publicAddress),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        initialData: {
          collections: [],
        },
      }
    );

  const isLoading = isAnyTrue([
    isCollectionsLoading,
    userIsLoading,
    isModerationStatusLoading,
  ]);

  if (isUserModerated && moderationStatus === ModerationStatus.UnderReview) {
    return (
      <Page title="Under Review">
        <TransactionWarningBlock moderationStatus={moderationStatus} />
      </Page>
    );
  }

  if (isUserModerated && moderationStatus === ModerationStatus.Suspended) {
    return (
      <Page title="Permanently Removed">
        <TransactionWarningBlock moderationStatus={moderationStatus} />
      </Page>
    );
  }

  return (
    <>
      {isLoading ? (
        <LoadingPage
          css={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 999,
            transform: 'translate(-50%, -50%)',
            padding: 0,
          }}
        />
      ) : (
        <InviteOnlyOverlay enabled={!isApprovedCreator}>
          <Flex
            css={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Heading
              size={{ '@initial': 3, '@bp0': 5, '@bp1': 6 }}
              css={{
                textAlign: 'center',
                marginBottom: '$6',
              }}
            >
              Create on Foundation
            </Heading>
            <Flex
              css={{
                justifyContent: 'center',
                flexDirection: 'column',
                marginX: 'auto',
                marginBottom: '$9',
                '@bp0': {
                  maxWidth: 480,
                  width: 480,
                },
              }}
            >
              {isEmptyOrNil(availableCollectionsData) ? (
                <>
                  <Paragraph
                    css={{
                      fontSize: '$2',
                      color: '$black60',
                      textAlign: 'center',
                      marginBottom: '$7',
                      maxWidth: 360,
                      marginX: 'auto',
                    }}
                  >
                    To mint NFTs on Foundation, the first step is to create a
                    collection.
                  </Paragraph>
                  <NextLink href="/create/collection" passHref>
                    <Card
                      as="a"
                      isInteractive
                      css={{
                        paddingX: '$9',
                        paddingY: '$7',
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: 'currentColor',
                      }}
                    >
                      <Flex
                        css={{
                          height: 80,
                          width: 80,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '$black5',
                          color: '$black100',
                          borderRadius: '$2',
                          marginX: 'auto',
                          marginBottom: '$5',
                        }}
                      >
                        <Icon icon={PlusIcon} width={24} height={24} />
                      </Flex>
                      <Text
                        size={2}
                        weight="semibold"
                        css={{ marginBottom: '$1' }}
                      >
                        Create a new collection
                      </Text>
                      <Paragraph css={{ color: '$black60', maxWidth: 320 }}>
                        Deploy a smart contract to showcase NFTs.
                      </Paragraph>
                    </Card>
                  </NextLink>
                </>
              ) : (
                <>
                  <Text
                    weight="semibold"
                    size={2}
                    css={{
                      borderBottom: '1px solid $black10',
                      paddingBottom: '$3',
                      marginBottom: '$5',
                      marginTop: '$8',
                    }}
                  >
                    Your collections
                  </Text>
                  <NextLink href="/create/collection" passHref>
                    <Card
                      as="a"
                      isInteractive
                      css={{
                        display: 'flex',
                        padding: '$4',
                        color: 'currentColor',
                        textDecoration: 'none',
                        width: '100%',
                        marginBottom: '$4',
                      }}
                    >
                      <Flex
                        css={{
                          height: 80,
                          width: 80,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '$black5',
                          color: '$black100',
                          borderRadius: '$2',
                        }}
                      >
                        <Icon icon={PlusIcon} width={24} height={24} />
                      </Flex>
                      <Flex
                        css={{
                          marginLeft: '$4',
                          alignItems: 'center',
                        }}
                      >
                        <Text size={2} weight="semibold">
                          Create new collection
                        </Text>
                      </Flex>
                    </Card>
                  </NextLink>
                  {availableCollectionsData.map((collection) => (
                    <CollectionRow
                      key={collection.id}
                      data={collection}
                      css={{ marginBottom: '$4' }}
                    />
                  ))}
                </>
              )}

              <TextLink
                css={{
                  textAlign: 'center',
                  fontWeight: '$semibold',
                  color: '$black60',
                  maxWidth: 240,
                  marginX: 'auto',
                  marginTop: '$7',
                  textDecoration: 'none',
                }}
                href="https://help.foundation.app/hc/en-us/articles/4419002081051-A-complete-guide-to-creating-a-Collection-and-minting-an-NFT"
                target="_blank"
              >
                Learn about
                <br />
                Collections on Foundation
              </TextLink>
            </Flex>
          </Flex>
        </InviteOnlyOverlay>
      )}
    </>
  );
}
