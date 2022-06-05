import { useFormikContext } from 'formik';
import { Dispatch, SetStateAction, useCallback } from 'react';

import Grid from 'components/base/Grid';
import Heading from 'components/base/Heading';
import Flex from 'components/base/Flex';
import TextLink from 'components/base/TextLink';
import Paragraph from 'components/base/Paragraph';
import TransactionDivider from '../TransactionDivider';
import TextField from 'components/forms/fields/TextField';
import SplitsToggle from 'components/transactions/split/SplitsToggle';
import Button from 'components/base/Button';
import TextAreaField from 'components/forms/fields/TextAreaField';
import TransitionPane from 'components/animation/TransitionPane';
import TransactionSubmitButton from '../generic/TransactionSubmitButton';
import SpinnerStroked from 'components/SpinnerStroked';
import { TransactionCard } from 'components/layouts/TransactionLayoutV2';

import { useUpdateDraftArtwork } from 'graphql/server/mutations/update-artwork.generated';

import { MintFormValues } from './types';
import SelectedCollection from './SelectedCollection';

import { ArtworkFragmentExtended } from 'graphql/hasura/hasura-fragments.generated';
import GraySquare from 'components/base/GraySquare';

type FormStep = 'artwork-info' | 'splits-info';

interface MintFieldsBasicProps {
  setFormStep: Dispatch<SetStateAction<FormStep>>;
  collection: ArtworkFragmentExtended['collection'];
  artworkId: string;
}

export default function MintFieldsBasic(props: MintFieldsBasicProps) {
  const { setFormStep, artworkId, collection } = props;

  return (
    <TransitionPane>
      <TransactionCard>
        <Heading
          size={{ '@initial': 2, '@bp2': 4 }}
          css={{ marginBottom: '$4' }}
        >
          Mint an NFT
        </Heading>
        <Heading
          size={{ '@initial': 1, '@bp2': 3 }}
          css={{ marginBottom: '$4' }}
        >
          Add details
        </Heading>
        <Paragraph size="sub" css={{ marginBottom: '$4' }}>
          Once your NFT is minted to the Ethereum blockchain, you will not be
          able to edit or update any of its information.
        </Paragraph>
        <Grid css={{ gap: '$6', marginBottom: '$7' }}>
          <TextField name="name" placeholder="Name" label="Name" />
          <TextAreaField
            name="description"
            placeholder="Description"
            tip="Use markdown syntax to embed links"
            label="Description"
            maxLength={1000}
            rows={8}
          />
        </Grid>

        <Heading size={1} css={{ marginBottom: '$3' }}>
          Collection
        </Heading>
        {collection ? (
          <SelectedCollection collection={collection} />
        ) : (
          <GraySquare
            css={{
              width: '100%',
              height: 96,
              borderRadius: '$3',
              backgroundColor: '$black5',
            }}
          />
        )}

        <TransactionDivider />
        <SplitsToggle name="splitsEnabled" />
        <TransactionDivider />
        <MintSubmitButton setFormStep={setFormStep} />
        <MintPreviewButton artworkId={artworkId} />
      </TransactionCard>
    </TransitionPane>
  );
}

interface MintSubmitButtonProps {
  setFormStep: Dispatch<SetStateAction<FormStep>>;
}

function MintSubmitButton(props: MintSubmitButtonProps) {
  const { setFormStep } = props;

  const { values } = useFormikContext<MintFormValues>();

  return values.splitsEnabled ? (
    <Button
      hoverable
      type="button"
      color="black"
      size="large"
      shape="regular"
      css={{ width: '100%' }}
      onClick={() => setFormStep('splits-info')}
    >
      Continue
    </Button>
  ) : (
    <TransactionSubmitButton
      label="Mint NFT"
      submittingLabel="Minting NFT…"
      submittedLabel="NFT Minted"
    />
  );
}

interface MintPreviewButtonProps {
  artworkId: string;
}

function MintPreviewButton(props: MintPreviewButtonProps) {
  const { artworkId } = props;

  const { values } = useFormikContext<MintFormValues>();

  const { mutateAsync: updateDraftArtwork, isLoading } = useUpdateDraftArtwork({
    onSuccess: (res) => {
      const previewURL = new URL(
        `nft/foundation/${res.updateDraftArtwork.id}/preview`,
        location.origin
      );
      window.open(previewURL.href);
    },
  });

  const saveDraftArtwork = useCallback(async () => {
    return await updateDraftArtwork({
      data: {
        id: artworkId,
        name: values.name,
        description: values.description,
        contractAddress: values.contractAddress,
      },
    });
  }, [updateDraftArtwork, artworkId, values]);

  return (
    <Flex css={{ paddingTop: '$4', justifyContent: 'center' }}>
      <TextLink
        tabIndex={0}
        as="div"
        css={{ marginX: 'auto', minHeight: 20 }}
        onClick={saveDraftArtwork}
      >
        {isLoading ? <SpinnerStroked size={20} /> : 'Preview'}
      </TextLink>
    </Flex>
  );
}
