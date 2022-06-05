import * as Types from '../types-server.generated';

import { ArtworkFragment } from '../server-fragments.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type UpdateDraftArtworkVariables = Types.Exact<{
  data: Types.UpdateDraftArtworkInput;
}>;


export type UpdateDraftArtwork = { updateDraftArtwork: Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'mintTxHash' | 'auctionStartTxHash' | 'width' | 'height' | 'duration' | 'mimeType' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus'> };


export const UpdateDraftArtworkDocument = /*#__PURE__*/ `
    mutation UpdateDraftArtwork($data: UpdateDraftArtworkInput!) {
  updateDraftArtwork(data: $data) {
    ...ArtworkFragment
  }
}
    ${ArtworkFragment}`;
export const useUpdateDraftArtwork = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateDraftArtwork, TError, UpdateDraftArtworkVariables, TContext>) =>
    useMutation<UpdateDraftArtwork, TError, UpdateDraftArtworkVariables, TContext>(
      ['UpdateDraftArtwork'],
      useServerFetcher<UpdateDraftArtwork, UpdateDraftArtworkVariables>(UpdateDraftArtworkDocument),
      options
    );