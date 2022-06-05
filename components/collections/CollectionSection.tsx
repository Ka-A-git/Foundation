import Box from 'components/base/Box';
import Text from 'components/base/Text';
import Flex from 'components/base/Flex';
import Grid from 'components/base/Grid';
import CollectionTitle from 'components/collections/CollectionTitle';
import ContractPill, {
  CollectionContractText,
} from 'components/collections/ContractPill';
import CollectionLogo from 'components/collections/CollectionLogo';

import { buildAvatarUrl } from 'utils/assets';
import { abbreviateValue } from 'utils/formatters';
import { pluralizeWord } from 'utils/strings';

import { CollectionCardFragment } from 'types/Collection';
import { UserFragment } from 'graphql/hasura/hasura-fragments.generated';
import UserTag from 'components/users/UserTag';
import { styled } from 'stitches.config';
import { createContext, useContext } from 'react';
import { onGridPx } from 'utils/styles';

type Breakpoint = 4 | 5;

const DEFAULT_MOBILE_LAYOUT_BREAKPOINT: Breakpoint = 4;

const Context = createContext({
  breakpoint: getCollectionSectionMinMaxBreakpoints(),
});
const useCollectionSectionContext = () => useContext(Context);

interface CollectionProviderProps {
  children: React.ReactNode;
  mobileLayoutBreakpoint: Breakpoint;
}

function CollectionProvider(props: CollectionProviderProps) {
  return (
    <Context.Provider
      value={{
        breakpoint: getCollectionSectionMinMaxBreakpoints(
          props.mobileLayoutBreakpoint
        ),
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

function getCollectionSectionMinMaxBreakpoints(
  breakpoint: Breakpoint = DEFAULT_MOBILE_LAYOUT_BREAKPOINT
) {
  return {
    min: `@bp${breakpoint}` as const,
    max: `@bp${breakpoint}-max` as const,
  };
}

interface CollectionDetailsProps {
  artworkCount: number;
  collection: CollectionCardFragment;
  hasDarkBackground: boolean;
}

function CollectionDetails(props: CollectionDetailsProps) {
  const { artworkCount, collection, hasDarkBackground } = props;
  const { breakpoint } = useCollectionSectionContext();

  return (
    <Flex
      css={{
        alignItems: 'center',
        [breakpoint.min]: {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          textAlign: 'left',
          height: 'inherit',
          minHeight: 'inherit',
        },
      }}
    >
      {collection.collectionImageUrl && (
        <Box
          css={{
            marginRight: '$4',
            [breakpoint.min]: { marginBottom: 'auto' },
          }}
        >
          <CollectionLogo
            alt={collection.name}
            stroke={{ '@initial': 2, '@bp5': 3 }}
            css={{
              width: onGridPx(15),
              height: onGridPx(15),
              [breakpoint.min]: {
                width: onGridPx(32),
                height: onGridPx(32),
              },
            }}
            imageUrl={buildAvatarUrl(160, collection.collectionImageUrl)}
          />
        </Box>
      )}
      <Box
        css={{
          paddingY: '$6',
          display: 'none',
          [breakpoint.min]: { display: 'block' },
        }}
      >
        <CollectionContract
          hasDarkBackground={hasDarkBackground}
          symbol={collection.symbol}
        />
      </Box>
      <CollectionSummary
        artworkCount={artworkCount}
        hasDarkBackground={hasDarkBackground}
        name={collection.name}
        symbol={collection.symbol}
      />
    </Flex>
  );
}

interface CollectionContractProps {
  hasDarkBackground: boolean;
  symbol: string;
}

function CollectionContract(props: CollectionContractProps) {
  const { hasDarkBackground, symbol } = props;
  const { breakpoint } = useCollectionSectionContext();

  return (
    <Box
      css={{
        [breakpoint.max]: {
          [`${CollectionContractText}`]: {
            fontSize: '$0',
          },
        },
      }}
    >
      <ContractPill frosted={hasDarkBackground} contract={symbol} />
    </Box>
  );
}

interface CollectionSummaryProps {
  artworkCount: number;
  hasDarkBackground: boolean;
  name: string;
  symbol: string;
}

function CollectionSummary(props: CollectionSummaryProps) {
  const { artworkCount, hasDarkBackground, name, symbol } = props;
  const { breakpoint } = useCollectionSectionContext();

  return (
    <Flex css={{ flexDirection: 'column' }}>
      <CollectionTitle
        color={hasDarkBackground ? 'light' : 'dark'}
        css={{ marginBottom: '$2' }}
        size={{ '@initial': 3, '@bp1': 4 }}
      >
        {name}
      </CollectionTitle>
      <Flex css={{ alignItems: 'center' }}>
        <Box
          css={{
            marginRight: '$3',
            display: 'none',
            '@bp1': { display: 'block' },
            [breakpoint.min]: { display: 'none' },
          }}
        >
          <CollectionContract
            hasDarkBackground={hasDarkBackground}
            symbol={symbol}
          />
        </Box>
        <Text
          as="p"
          css={{
            color: hasDarkBackground ? '$white100' : '$black100',
            fontWeight: '$semibold',
          }}
        >
          {abbreviateValue(artworkCount)} {pluralizeWord('NFT', artworkCount)}
        </Text>
      </Flex>
    </Flex>
  );
}

interface CollectionUserProps {
  hasDarkBackground: boolean;
  user: UserFragment;
}

function CollectionUser(props: CollectionUserProps) {
  const { hasDarkBackground, user } = props;
  return (
    <UserTag
      appearance={hasDarkBackground ? 'frosted' : 'normal'}
      user={user}
      hoverable
    />
  );
}

const CollectionGrid = styled(Grid, {
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '$4',

  '@bp3': {
    gap: '$6',
  },

  '@bp4': {
    gap: '$7',
  },

  '@bp4-max': {
    overflow: 'auto',
    paddingBottom: '$3',
    paddingX: '$6',
    width: '100vw',
    scrollSnapType: 'x mandatory',
    scrollPaddingLeft: '$6',
    scrollPaddingRight: '$6',
    '& .artwork-card': {
      minWidth: '340px',
      scrollSnapAlign: 'center',
      '&:first-of-type': {
        scrollSnapAlign: 'end',
      },
      '&:last-of-type': {
        scrollSnapAlign: 'start',
      },
    },
  },

  '@bp0-max': {
    '& .artwork-card': {
      minWidth: '80vw',
    },
  },
});

export const CollectionSection = {
  Contract: CollectionContract,
  Details: CollectionDetails,
  Grid: CollectionGrid,
  Provider: CollectionProvider,
  Summary: CollectionSummary,
  User: CollectionUser,
};
