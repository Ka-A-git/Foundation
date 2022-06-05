import { Dispatch, SetStateAction } from 'react';
import { useToggle } from 'react-use';
import { Formik, Form } from 'formik';
import { BigNumberish } from 'ethers';
import Tippy from '@tippyjs/react';

import Flex from 'components/base/Flex';
import Card from 'components/base/Card';
import Text from 'components/base/Text';
import Button from 'components/base/Button';
import TextLink from 'components/base/TextLink';
import Box from 'components/base/Box';
import CollectionPriceFields from './CollectionPriceFields';
import ChevronButton from 'components/base/ChevronButton';

import { useAlgoliaArtworksFilters } from 'hooks/queries/algolia/use-algolia-artworks';

export function usePriceFilters(
  contractAddress: string,
  onToggle?: Dispatch<SetStateAction<boolean>>
) {
  const [filtersData, setFilterData] = useAlgoliaArtworksFilters({
    contractAddress,
  });

  const priceRanges =
    filtersData.searchStats?.facets_stats?.[filtersData.priceFilterAttribute];

  const handleSubmit = (values: PriceFilterFormValues) => {
    setFilterData({
      minPrice: values.min || 0,
      maxPrice: values.max,
    });
    if (onToggle) {
      onToggle(false);
    }
  };

  const clearValues = () => {
    setFilterData({ minPrice: null, maxPrice: null });
    if (onToggle) {
      onToggle(false);
    }
  };

  return {
    handleSubmit,
    clearValues,
    priceRanges,
  };
}

export type PriceFilterFormValues = {
  min: BigNumberish;
  max: BigNumberish;
};

interface CollectionPriceFiltersProps {
  contractAddress: string;
}

export default function CollectionPriceFilters(
  props: CollectionPriceFiltersProps
) {
  const { contractAddress } = props;

  const [isOpen, toggleOpen] = useToggle(false);

  const [filtersData] = useAlgoliaArtworksFilters({
    contractAddress,
  });

  const { handleSubmit, clearValues } = usePriceFilters(
    contractAddress,
    toggleOpen
  );

  const priceRanges =
    filtersData.searchStats?.facets_stats?.[filtersData.priceFilterAttribute];

  return (
    <Formik<PriceFilterFormValues>
      onSubmit={handleSubmit}
      enableReinitialize
      initialValues={{
        min: filtersData?.minPrice ?? '',
        max: filtersData?.maxPrice ?? '',
      }}
    >
      <Form>
        <Flex css={{ marginLeft: '$3', alignItems: 'center' }}>
          <Box
            css={{
              width: 1,
              height: 32,
              backgroundColor: '$black10',
              marginRight: '$3',
            }}
          />
          <Tippy
            content={
              <Card
                css={{
                  paddingTop: '$6',
                  paddingBottom: '$5',
                  minWidth: 380,
                  boxShadow: '$1',
                }}
              >
                <Box css={{ paddingX: '$6', marginBottom: '$7' }}>
                  <Flex
                    css={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text size={2} weight="semibold">
                      Price
                    </Text>
                    <Flex css={{ alignItems: 'center' }}>
                      <TextLink
                        as="div"
                        css={{
                          fontSize: '$0',
                          color: '$black60',
                          marginRight: '$4',
                          weight: 'semibold',
                        }}
                        onClick={clearValues}
                      >
                        Clear
                      </TextLink>
                      <Button
                        css={{
                          paddingX: '$6',
                        }}
                        color="black"
                        size="small"
                        shape="round"
                      >
                        Done
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
                <Box css={{ paddingX: '$6' }}>
                  <CollectionPriceFields
                    min={priceRanges?.min}
                    max={priceRanges?.max}
                  />
                </Box>
              </Card>
            }
            interactive={true}
            visible={isOpen}
            animation="shift-away"
            placement="bottom-start"
            onClickOutside={toggleOpen}
          >
            <div>
              <ChevronButton
                size={{ '@initial': 0, '@bp3': 1 }}
                type="button"
                variant="outline"
                onClick={toggleOpen}
                pressed={isOpen}
              >
                Price
              </ChevronButton>
            </div>
          </Tippy>
        </Flex>
      </Form>
    </Formik>
  );
}
