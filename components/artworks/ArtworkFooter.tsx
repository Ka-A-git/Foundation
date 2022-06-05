import NextLink from 'next/link';

import Box from 'components/base/Box';
import Grid from 'components/base/Grid';
import Flex from 'components/base/Flex';
import Link from 'components/base/Link';
import Text from 'components/base/Text';
import MarkdownText from 'components/base/MarkdownText';
import Avatar from 'components/base/Avatar';
import Footer from 'components/footers/Footer';
import Overlay from 'components/base/Overlay';
import Heading from 'components/base/Heading';
import ArtworkCard from 'components/cards/artwork/ArtworkCard';
import { CollectionSection } from 'components/collections/CollectionSection';

import { getUsernameOrAddressInfo, isAllTrue, notEmpty } from 'utils/helpers';
import { buildArtworkFooterImageUrl, buildImgixUrl } from 'utils/assets';
import { buildCollectionPath } from 'utils/collections';
import { buildUserProfilePath } from 'utils/artwork/artwork';

import { CollectionCardFragment } from 'types/Collection';
import {
  ArtworkFragmentExtended,
  UserFragment,
} from 'graphql/hasura/hasura-fragments.generated';

import { useArtworksRelated } from 'graphql/hasura/queries/artworks-related.generated';

export interface ArtworkFooterProps {
  artwork: ArtworkFragmentExtended;
  isSharedCollection: boolean;
  currentUserPublicKey: string;
  creator: UserFragment;
  collection: CollectionCardFragment;
}

export default function ArtworkFooter(props: ArtworkFooterProps): JSX.Element {
  const {
    isSharedCollection,
    currentUserPublicKey,
    creator,
    collection,
    artwork,
  } = props;

  const relatedArtworksVariables = {
    publicKey: artwork?.publicKey,
    tokenId: artwork?.tokenId,
    contractSlug: collection?.slug,
  };

  const { data: relatedArtworksData } = useArtworksRelated(
    relatedArtworksVariables,
    {
      enabled: isAllTrue([...Object.values(relatedArtworksVariables)]),
      initialData: {
        artworkUser: {
          bio: creator?.bio,
          relatedArtworks: [],
          artworksCount: { aggregate: { count: 0 } },
        },
      },
    }
  );

  const works = relatedArtworksData?.artworkUser?.relatedArtworks ?? [];

  const coverImage = isSharedCollection
    ? buildArtworkFooterImageUrl(creator?.coverImageUrl)
    : buildArtworkFooterImageUrl(collection?.coverImageUrl);

  const hasCoverImage = notEmpty(coverImage);
  const artworkCount =
    relatedArtworksData?.artworkUser?.artworksCount?.aggregate?.count;

  const { usernameOrAddress, hasUsername, nameOrUsername, hasName } =
    getUsernameOrAddressInfo(creator);

  const hasArtworks = artworkCount > 0;

  return (
    <Box
      css={{
        // min-height must be greater than height of the content, otherwise the content will be cut off
        '@media(min-height: 800px)': {
          position: 'sticky',
        },
        zIndex: 1,
        bottom: 0,
        left: 0,
      }}
    >
      <Box
        css={{
          width: '100%',
          background: hasCoverImage ? `url(${coverImage})` : `$black5`,
          backgroundColor: hasCoverImage ? `$black100` : `$black5`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          css={{
            paddingTop: '$8',
            maxWidth: '$container',
            marginX: 'auto',
            width: '100%',
            paddingX: '$6',
          }}
        >
          {hasCoverImage && (
            <Overlay css={{ zIndex: 2, pointerEvents: 'none' }} />
          )}

          <Grid
            css={{
              zIndex: 3,
              position: 'relative',
              gap: '$7',
              alignItems: 'start',
              color: hasCoverImage ? '$white100' : '$black100',
              gridTemplateColumns: '1fr',
              '@bp4': { gridTemplateColumns: '1fr minmax(min-content, 3fr)' },
            }}
          >
            {isSharedCollection ? (
              <Flex
                css={{
                  alignItems: 'center',
                  '@bp4': { alignItems: 'flex-start', textAlign: 'left' },
                }}
              >
                <NextLink
                  href={buildUserProfilePath({ user: creator })}
                  passHref
                  prefetch={false}
                >
                  <Link
                    css={{
                      textDecoration: 'none',
                      color: 'inherit',
                      maxWidth: 500,
                    }}
                  >
                    <Flex
                      css={{
                        alignItems: 'center',
                        '@bp4': {
                          alignItems: 'flex-start',
                          flexDirection: 'column',
                        },
                      }}
                    >
                      <Box
                        css={{
                          marginRight: '$4',
                          '@bp4': {
                            marginX: 'unset',
                            marginBottom: '$6',
                          },
                        }}
                      >
                        <Avatar
                          alt={collection.name}
                          appearance="frosted"
                          css={{
                            width: 64,
                            height: 64,
                            '@bp4': {
                              width: 128,
                              height: 128,
                            },
                          }}
                          imageUrl={buildImgixUrl(creator?.profileImageUrl, {
                            w: 256,
                          })}
                          shape="round"
                          stroke={{ '@initial': 2, '@bp4': 3 }}
                        />
                      </Box>
                      <Flex
                        css={{
                          flexDirection: 'column',
                        }}
                      >
                        {hasName && (
                          <Box>
                            <Heading
                              leading="tight"
                              size={{ '@initial': 3, '@bp4': 4 }}
                              css={{
                                marginBottom: '$1',
                                overflow: 'hidden',
                                wordBreak: 'break-word',
                                textOverflow: 'ellipsis',
                                textAlign: 'center',
                                '@bp1': { textAlign: 'left' },
                              }}
                            >
                              {nameOrUsername}
                            </Heading>
                          </Box>
                        )}
                        {hasUsername && (
                          <Text
                            weight="semibold"
                            size={{ '@initial': 1, '@bp4': 2 }}
                            css={{
                              color: hasCoverImage ? '$whiteT90' : 'inherit',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              wordBreak: 'break-all',
                              transition: 'color $ease $1',
                              '@hover': {
                                '&:hover': {
                                  color: hasCoverImage
                                    ? '$white100'
                                    : '$black100',
                                },
                              },
                            }}
                          >
                            {usernameOrAddress}
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                    {creator?.bio && (
                      <MarkdownText
                        css={{
                          display: 'none',
                          '@bp4': {
                            display: 'block',
                            marginTop: '$6',
                            color: '$whiteT90',
                          },
                        }}
                      >
                        {creator?.bio}
                      </MarkdownText>
                    )}
                  </Link>
                </NextLink>
              </Flex>
            ) : (
              <Flex
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  height: '100%',
                  '@bp4': {
                    alignItems: 'flex-start',
                  },
                }}
              >
                <Flex
                  css={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingRight: '$6',
                    height: 'inherit',
                    '@bp4': {
                      alignItems: 'flex-start',
                      paddingRight: '0',
                    },
                  }}
                >
                  <NextLink
                    href={buildCollectionPath(collection)}
                    passHref
                    prefetch={false}
                  >
                    <Link
                      css={{
                        display: 'flex',
                        textDecoration: 'none',
                        color: 'inherit',
                        height: 'inherit',
                        '@bp4': {
                          flexGrow: 1,
                          marginBottom: '$6',
                        },
                      }}
                    >
                      <CollectionSection.Details
                        artworkCount={artworkCount}
                        collection={collection}
                        hasDarkBackground={hasCoverImage}
                      />
                    </Link>
                  </NextLink>
                  <Box
                    css={{
                      display: 'none',
                      '@bp0': {
                        display: 'block',
                      },
                      '@bp4': {
                        display: 'none',
                      },
                    }}
                  >
                    <CollectionSection.User
                      hasDarkBackground={hasCoverImage}
                      user={creator}
                    />
                  </Box>
                </Flex>
                <Box
                  css={{
                    display: 'none',
                    '@bp4': {
                      display: 'block',
                      marginTop: '$6',
                    },
                  }}
                >
                  {/* TODO: move to below Grid on very small screens */}
                  <CollectionSection.User
                    hasDarkBackground={hasCoverImage}
                    user={creator}
                  />
                </Box>
              </Flex>
            )}
            {hasArtworks && (
              <CollectionSection.Grid
                css={{
                  '@bp4-max': {
                    // Offset parent padding
                    marginLeft: '-$6',
                  },
                }}
              >
                {works.map((artwork) => (
                  <ArtworkCard
                    key={artwork.tokenId}
                    artwork={artwork}
                    creator={creator}
                    currentUserPublicKey={currentUserPublicKey}
                  />
                ))}
              </CollectionSection.Grid>
            )}
          </Grid>
        </Box>
        <Footer
          css={{
            position: 'relative',
            zIndex: 3,
            '.footer-link': {
              color: hasCoverImage ? '$whiteT80' : '$black60',
              '@hover': {
                '&:hover': {
                  color: '$white100',
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
