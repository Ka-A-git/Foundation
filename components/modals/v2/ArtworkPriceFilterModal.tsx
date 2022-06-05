import { Form, Formik } from 'formik';
import {
  useAlgoliaArtworksFilters,
  useResetFilters,
} from 'hooks/queries/algolia/use-algolia-artworks';

import Modal from 'components/base/Modal';
import ToggleButton from 'components/base/ToggleButton';
import CollectionPriceFields from 'components/collections/CollectionPriceFields';

import {
  PriceFilterFormValues,
  usePriceFilters,
} from 'components/collections/CollectionPriceFilters';

interface ArtworkPriceFilterModalProps {
  contractAddress: string;
}

export default function ArtworkPriceFilterModal(
  props: ArtworkPriceFilterModalProps
) {
  const { contractAddress } = props;

  const resetFilters = useResetFilters({ contractAddress });

  const [filtersData] = useAlgoliaArtworksFilters({ contractAddress });

  const { handleSubmit, priceRanges } = usePriceFilters(contractAddress);

  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <ToggleButton
          pressed={Boolean(filtersData.minPrice || filtersData.maxPrice)}
          size={0}
          type="button"
          variant="outline"
        >
          Price
        </ToggleButton>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay>
          <Formik<PriceFilterFormValues>
            onSubmit={handleSubmit}
            enableReinitialize
            initialValues={{
              min: filtersData?.minPrice ?? '',
              max: filtersData?.maxPrice ?? '',
            }}
          >
            <Modal.Content>
              <Form>
                <Modal.Header
                  title="Price"
                  secondaryCta={
                    <Modal.Close asChild>
                      <Modal.SecondaryCta type="button" onClick={resetFilters}>
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
                <Modal.Body>
                  <CollectionPriceFields
                    min={priceRanges?.min}
                    max={priceRanges?.max}
                    css={{ gridTemplateColumns: '1fr' }}
                  />
                </Modal.Body>
              </Form>
            </Modal.Content>
          </Formik>
        </Modal.Overlay>
      </Modal.Portal>
    </Modal.Root>
  );
}
