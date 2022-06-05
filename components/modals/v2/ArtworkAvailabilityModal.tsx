import {
  useAlgoliaArtworksFilters,
  useResetFilters,
} from 'hooks/queries/algolia/use-algolia-artworks';

import Modal from 'components/base/Modal';
import ToggleButton from 'components/base/ToggleButton';
import CollectionFilterButtons from 'components/collections/CollectionFilterButtons';

interface ArtworkAvailabilityModalProps {
  contractAddress: string;
}

export default function ArtworkAvailabilityModal(
  props: ArtworkAvailabilityModalProps
) {
  const { contractAddress } = props;

  const resetFilters = useResetFilters({ contractAddress });

  const [filtersData] = useAlgoliaArtworksFilters({ contractAddress });

  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <ToggleButton
          pressed={filtersData.marketAvailability.length > 0}
          size={0}
          type="button"
          variant="outline"
        >
          Availability
        </ToggleButton>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay>
          <Modal.Content>
            <Modal.Header
              title="Availability"
              secondaryCta={
                <Modal.Close asChild>
                  <Modal.SecondaryCta onClick={resetFilters}>
                    Clear
                  </Modal.SecondaryCta>
                </Modal.Close>
              }
              primaryCta={
                <Modal.Close asChild>
                  <Modal.PrimaryCta type="button">Done</Modal.PrimaryCta>
                </Modal.Close>
              }
            />
            <Modal.Body>
              <CollectionFilterButtons contractAddress={contractAddress} />
            </Modal.Body>
          </Modal.Content>
        </Modal.Overlay>
      </Modal.Portal>
    </Modal.Root>
  );
}
