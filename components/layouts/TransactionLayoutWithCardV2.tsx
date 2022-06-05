import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import Body from 'components/base/Body';
import Page from 'components/Page';
import Grid from 'components/base/Grid';
import Box from 'components/base/Box';
import Flex from 'components/base/Flex';
import Layout, { BackgroundColor } from 'components/layouts/Layout';
import ArtworkCard from 'components/cards/artwork/ArtworkCard';
import CollectionCard from 'components/cards/collections/CollectionCard';
import CollectionCardBlueprint from 'components/collections/CollectionCardBlueprint';

import { PageType } from 'types/page';
import { TransactionLayoutQueryType } from 'types/Artwork';

import { useArtworkByContractTokenIdFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-contract-token-id';
import { useArtworkByUuid } from 'graphql/hasura/queries/artwork-by-uuid.generated';
import useCollectionByContractSlug from 'hooks/queries/hasura/collections/use-collection-by-contract-slug';
import useCreateCollectionQuery from 'hooks/queries/use-create-collection';

import { getFirstValue } from 'utils/helpers';
import { maybeUpperCase } from 'utils/case';

interface TransactionLayoutWithCardV2Props {
  title: string;
  backgroundColor: BackgroundColor;
  pageType: PageType;
  artworkQueryType: TransactionLayoutQueryType;
}

export type CurriedLayout = (
  arg0: JSX.Element,
  arg1: TransactionLayoutWithCardV2Props
) => JSX.Element;

export default function TransactionLayoutWithCardV2(
  props: TransactionLayoutWithCardV2Props
): CurriedLayout {
  const { artworkQueryType } = props;

  return function TransactionLayoutContainer(page: JSX.Element) {
    if (artworkQueryType === 'create-collection') {
      return (
        <TransactionLayoutCreateCollection {...props}>
          {page}
        </TransactionLayoutCreateCollection>
      );
    }
    if (artworkQueryType === 'collection-slug') {
      return (
        <TransactionLayoutCollectionBySlug {...props}>
          {page}
        </TransactionLayoutCollectionBySlug>
      );
    }
    if (artworkQueryType === 'uuid') {
      return <TransactionLayoutUuid {...props}>{page}</TransactionLayoutUuid>;
    }
    return (
      <TransactionLayoutTokenId {...props}>{page}</TransactionLayoutTokenId>
    );
  };
}

interface TransactionLayoutRenderProps
  extends TransactionLayoutWithCardV2Props {
  children: ReactNode;
}

function TransactionLayoutUuid(props: TransactionLayoutRenderProps) {
  const { children, ...rest } = props;

  const router = useRouter();

  const artworkId = getFirstValue(router.query.id);

  const { data: artworkData } = useArtworkByUuid(
    { id: artworkId },
    {
      enabled: Boolean(artworkId),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const artwork = artworkData?.artwork;

  return (
    <TransactionLayout
      {...rest}
      cardComponent={
        <ArtworkCard
          artwork={artwork}
          creator={artwork?.creator}
          currentUserPublicKey={null}
          cardType="detailed"
        />
      }
    >
      {children}
    </TransactionLayout>
  );
}

function TransactionLayoutTokenId(props: TransactionLayoutRenderProps) {
  const { children, ...rest } = props;

  const { data: artwork } = useArtworkByContractTokenIdFromRouter();

  return (
    <TransactionLayout
      {...rest}
      cardComponent={
        <ArtworkCard
          artwork={artwork}
          creator={artwork?.creator}
          currentUserPublicKey={null}
          cardType="detailed"
        />
      }
    >
      {children}
    </TransactionLayout>
  );
}

function TransactionLayoutCreateCollection(
  props: TransactionLayoutRenderProps
) {
  const { children, ...rest } = props;

  const { data: queryData } = useCreateCollectionQuery();

  return (
    <TransactionLayout
      {...rest}
      cardComponent={
        <CollectionCardBlueprint
          name={queryData?.name}
          symbol={maybeUpperCase(queryData?.symbol)}
        />
      }
    >
      {children}
    </TransactionLayout>
  );
}

function TransactionLayoutCollectionBySlug(
  props: TransactionLayoutRenderProps
) {
  const { children, ...rest } = props;

  const router = useRouter();

  const contractSlug = getFirstValue(router.query.addressOrSlug);

  const { data: collectionData } = useCollectionByContractSlug(
    { contractSlug, indexedStates: [true] },
    {
      enabled: Boolean(contractSlug),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <TransactionLayout
      {...rest}
      cardComponent={
        collectionData ? (
          <CollectionCard
            collection={collectionData}
            creator={collectionData?.creator}
          />
        ) : (
          <CollectionCardBlueprint symbol="" name="" />
        )
      }
    >
      {children}
    </TransactionLayout>
  );
}

interface TransactionLayoutProps extends TransactionLayoutRenderProps {
  cardComponent: ReactNode;
}

function TransactionLayout(props: TransactionLayoutProps) {
  const { title, backgroundColor, pageType, children, cardComponent } = props;

  return (
    <Layout backgroundColor={backgroundColor}>
      <Page title={title} type={pageType}>
        <Body
          css={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Flex
            css={{
              position: 'relative',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Grid
              css={{
                gridGap: '$8',
                alignItems: 'flex-start',
                '@bp0-max': {
                  minWidth: '100%',
                },
                '@bp2': {
                  gridTemplateColumns: '560px 340px',
                },
              }}
            >
              {children}
              <Box>{cardComponent}</Box>
            </Grid>
          </Flex>
        </Body>
      </Page>
    </Layout>
  );
}
