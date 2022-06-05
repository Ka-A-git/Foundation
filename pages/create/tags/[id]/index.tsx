import { assocPath, T } from 'ramda';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import TagsFields from 'components/transactions/tags/TagsFields';
import TransactionFlow from 'components/transactions/generic/TransactionFlow';

import { getTagsLayout } from 'components/transactions/generic/TransactionLayoutHOC';
import { formatTagOptions } from 'components/transactions/tags/TagsTextarea';

import { TagSchema } from 'schemas/transaction';
import { useArtworkByUuidFromRouter } from 'hooks/queries/hasura/artworks/use-artwork-by-uuid-from-router';
import { useSuggestedTags } from 'graphql/server/queries/suggested-tags.generated';

import {
  UpdateArtworkTagsVariables,
  useUpdateArtworkTags,
} from 'graphql/server/mutations/update-artwork-tags.generated';

import { buildArtworkPath, buildArtworkTokenPath } from 'utils/artwork/artwork';
import { notEmptyOrNil } from 'utils/helpers';

import { transactionCopy } from 'lib/transaction-copy';

AddTags.getLayout = getTagsLayout('Add tags');

export default function AddTags() {
  const router = useRouter();

  const { data: artwork, isLoading: isArtworkLoading } =
    useArtworkByUuidFromRouter({ refetchOnWindowFocus: false });

  const { data: suggestedTags } = useSuggestedTags(null, {
    select: (res) => formatTagOptions(res.getSuggestedTags ?? []),
    initialData: { getSuggestedTags: [] },
  });

  const { mutateAsync: updateArtworkTags, reset: resetUpdateArtworkTags } =
    useUpdateArtworkTags();

  const isInCreatorFlow = !router.query.redirect;
  const artworkPath = buildArtworkPath({ artwork, user: artwork?.creator });
  const artworkBuyNowPath = `/create/${buildArtworkTokenPath(artwork)}/buy-now`;

  const listArtworkPath = isInCreatorFlow ? artworkBuyNowPath : artworkPath;

  const handleSubmit = useCallback(
    async (values: UpdateArtworkTagsVariables) => {
      const assignedValues = assocPath(
        ['data', 'tags'],
        values.data.tags.filter(notEmptyOrNil),
        values
      );
      await updateArtworkTags(assignedValues);

      await router.push(listArtworkPath);
    },
    [updateArtworkTags, router, listArtworkPath]
  );

  const copy = transactionCopy['add-tags'];

  return (
    <TransactionFlow<UpdateArtworkTagsVariables>
      txHash={null}
      transactionState={{
        loading: {
          isLoading: isArtworkLoading,
        },
        error: {
          error: null,
          description: copy.error.description,
          onReset: resetUpdateArtworkTags,
        },
        pending: {
          title: copy.pending.title,
          description: copy.pending.description,
        },
        awaiting: {
          component: () => (
            <TagsFields
              listArtworkPath={listArtworkPath}
              options={suggestedTags}
              isInCreatorFlow={isInCreatorFlow}
            />
          ),
        },
        // no success state here, we push to it programatically
        success: {
          isSuccess: false,
          component: () => null,
        },
      }}
      formProps={{
        onSubmit: handleSubmit,
        validationSchema: TagSchema,
        initialValues: {
          data: {
            id: artwork?.id,
            tags: artwork?.tags,
          },
        },
      }}
      steps={[
        [
          T,
          () => (
            <TagsFields
              listArtworkPath={listArtworkPath}
              options={suggestedTags}
              isInCreatorFlow={isInCreatorFlow}
            />
          ),
        ],
      ]}
    />
  );
}
