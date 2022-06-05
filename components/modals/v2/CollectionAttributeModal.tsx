import * as Accordion from '@radix-ui/react-accordion';
import { toPairs } from 'ramda';
import { styled } from 'stitches.config';

import { SearchResponse } from '@algolia/client-search';

import BaseButton from 'components/base/BaseButton';
import ButtonV2 from 'components/base/ButtonV2';
import ChevronIcon from 'assets/icons/chevron-icon.svg';
import IconV2 from 'components/base/IconV2';
import Modal from 'components/base/Modal';
import PropertiesIcon from 'assets/icons/properties-icon.svg';
import Text from 'components/base/Text';
import AttributeOption from './AttributeOption';
import Flex from 'components/base/Flex';

import { notEmptyOrNil } from 'utils/helpers';

import { useAlgoliaArtworksFilters } from 'hooks/queries/algolia/use-algolia-artworks';
import useAlgoliaFacets from 'hooks/queries/algolia/use-algolia-facets';

type AttributeValue = {
  label: string;
  value: string;
  count: number;
};

export type Attributes = {
  category: string;
  attributes: AttributeValue[];
};

interface CollectionAttributeModalProps {
  contractAddress: string;
}

export default function CollectionAttributeModal(
  props: CollectionAttributeModalProps
) {
  const { contractAddress } = props;

  const [filtersData, setFilters] = useAlgoliaArtworksFilters({
    contractAddress,
  });

  // TODO: replace with already made hook
  const { data } = useAlgoliaFacets(
    {
      searchIndex: filtersData.searchIndex,
      searchTerm: '',
      options: {
        facets: ['attributes.*'],
        hitsPerPage: 0,
        facetFilters: [
          'moderationStatus:ACTIVE',
          'isDeleted:false',
          `collection.contractAddress:${contractAddress}`,
        ],
      },
    },
    { refetchOnWindowFocus: false }
  );

  const attributes = data ? getFacetValues(data) : [];

  const hasAttributes = notEmptyOrNil(attributes);

  if (!hasAttributes) {
    return null;
  }

  const resultsCount = data.nbHits;

  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <AttributesButton type="button" size={{ '@initial': 0, '@bp3': 1 }}>
          <PropertiesIcon />
          Attributes
        </AttributesButton>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay>
          <ModalContent>
            <Modal.Header
              title="Attributes"
              secondaryCta={
                <Modal.Close asChild>
                  <Modal.SecondaryCta
                    type="button"
                    onClick={() => setFilters({ attributes: [] })}
                  >
                    Clear
                  </Modal.SecondaryCta>
                </Modal.Close>
              }
              primaryCta={
                <Modal.Close asChild>
                  <Modal.PrimaryCta type="submit">Done</Modal.PrimaryCta>
                </Modal.Close>
              }
            />
            <ModalBody>
              <Accordion.Root type="multiple">
                {attributes.map((attribute) => (
                  <AccordionItem
                    key={attribute.category}
                    value={attribute.category}
                  >
                    <AccordionHeader>
                      <AccordionTrigger asChild>
                        <BaseButton css={{ color: '$black100', minWidth: 0 }}>
                          <AttributeHeading>
                            <Text size={{ '@initial': 1, '@bp2:': 2 }}>
                              {attribute.category}
                            </Text>
                            <SelectedAttributes
                              attributes={getSelectedAttributes(
                                attribute.attributes,
                                filtersData.attributes
                              )}
                            />
                          </AttributeHeading>
                          <IconV2 size={2} aria-hidden icon={ChevronIcon} />
                        </BaseButton>
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                      {attribute.attributes.map((attr) => (
                        <AttributeOption
                          key={attr.value}
                          value={attr.value}
                          label={attr.label}
                          count={attr.count}
                          percentage={`${(
                            (attr.count / resultsCount) *
                            100
                          ).toFixed(2)}%`}
                          setCheckedOptions={(value) =>
                            setFilters({
                              attributes: withOrWithoutValue(
                                value,
                                filtersData.attributes
                              ),
                            })
                          }
                          isChecked={filtersData.attributes.includes(
                            attr.value
                          )}
                        />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion.Root>
            </ModalBody>
          </ModalContent>
        </Modal.Overlay>
      </Modal.Portal>
    </Modal.Root>
  );
}

interface SelectedAttributesProps {
  attributes: string[];
}

function SelectedAttributes(props: SelectedAttributesProps) {
  const { attributes } = props;

  const hasAttributes = notEmptyOrNil(attributes);

  if (!hasAttributes) {
    return null;
  }

  return (
    <SelectedAttributesContainer>
      <SelectedAttributesText>{attributes.join(', ')}</SelectedAttributesText>
    </SelectedAttributesContainer>
  );
}

const AttributesButton = styled(ButtonV2, {
  svg: {
    display: 'none',
  },
  '@bp1': {
    svg: {
      display: 'block',
    },
  },
  '@bp2': {
    marginLeft: '$2',
  },
  defaultVariants: {
    icon: true,
    variant: 'outline',
  },
});

const ModalBody = styled(Modal.Body, {
  paddingX: 0,
  paddingBottom: 0,
  borderBottomLeftRadius: '$4',
  borderBottomRightRadius: '$4',
});

const AttributeHeading = styled(Flex, {
  flex: 1,
  minWidth: 0,
  alignItems: 'baseline',
});

const SelectedAttributesContainer = styled(Flex, {
  flex: 1,
  marginLeft: '$2',
  minWidth: 0,
});

const SelectedAttributesText = styled(Text, {
  color: '$black60',
  fontSize: 12,
  maxWidth: '95%',
  defaultVariants: {
    ellipsis: true,
    weight: 'body',
  },
});

const AccordionHeader = styled(Accordion.Header, {
  svg: {
    transition: 'transform 300ms',
  },
  [`[data-state=open] svg`]: {
    transform: 'rotate(180deg)',
  },
});

const AccordionContent = styled(Accordion.Content, {
  borderRadius: '$3',
  backgroundColor: '$black5',
  overflow: 'hidden',

  marginX: '$4',
  marginBottom: '$4',
  padding: '$2',

  '@bp2': {
    marginX: '$6',
    marginBottom: '$6',
    padding: '$3',
  },
});

const AccordionTrigger = styled(Accordion.Trigger, {
  width: '100%',
  border: 'none',
  borderRadius: 0,
  borderTop: 'solid 1px $black5',
  justifyContent: 'space-between',
  display: 'flex',

  padding: '$4',

  '@bp2': {
    paddingY: '$5',
    paddingX: '$6',
  },

  '@hover': {
    '&:hover': {
      position: 'relative',
      backgroundColor: '$black5',
      borderTop: 'solid 1px $black10',
    },
  },
  [`&[data-state=open]`]: {
    '@hover': {
      '&:hover': {
        backgroundColor: 'transparent',
        borderTop: 'solid 1px $black5',
      },
    },
  },
});

const AccordionItem = styled(Accordion.Item, {
  [`&:first-child ${AccordionTrigger}`]: {
    borderTop: 'none',
    '@hover': {
      '&:hover': {
        borderTop: 'none',
      },
    },
  },
});

const ModalContent = styled(Modal.Content, {
  height: '80vh',
  maxHeight: 760, // TODO: need to think about content shift, this won't work on small # of attributes
});

// TODO: move into utils
function getSelectedAttributes(
  attributes: AttributeValue[],
  selectedAttributes: string[]
) {
  return attributes
    .filter((attr) =>
      selectedAttributes.some((innerAttr) => innerAttr === attr.value)
    )
    .map((attr) => attr.label);
}

export function withOrWithoutValue<T extends string>(newValue: T, values: T[]) {
  const hasAppliedFilter = values.includes(newValue);

  return hasAppliedFilter
    ? values.filter((value) => value !== newValue)
    : [...values, newValue];
}

export function getFacetValues<T extends SearchResponse<unknown>>(res: T) {
  const sortedFacets = Object.keys(res.facets).sort((a, b) =>
    a.localeCompare(b)
  );

  return sortedFacets.map((facetKey) => {
    const [, attributeName] = facetKey.split('attributes.');
    const attributes = toPairs(res.facets[facetKey]);
    return {
      category: attributeName,
      attributes: attributes
        .sort(([a], [b]) => {
          return a.localeCompare(b);
        })
        .map(([label, count]) => ({
          value: `${facetKey}:${label}`,
          label,
          count,
        })),
    };
  });
}
