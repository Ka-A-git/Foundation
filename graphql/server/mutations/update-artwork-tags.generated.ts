import * as Types from '../types-server.generated';

import { ArtworkFragment } from '../server-fragments.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type UpdateArtworkTagsVariables = Types.Exact<{
  data: Types.UpdateArtworkTagsInput;
}>;


export type UpdateArtworkTags = { updateArtworkTags: Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'mintTxHash' | 'auctionStartTxHash' | 'width' | 'height' | 'duration' | 'mimeType' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus'> };


export const UpdateArtworkTagsDocument = /*#__PURE__*/ `
    mutation UpdateArtworkTags($data: UpdateArtworkTagsInput!) {
  updateArtworkTags(data: $data) {
    ...ArtworkFragment
  }
}
    ${ArtworkFragment}`;
export const useUpdateArtworkTags = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateArtworkTags, TError, UpdateArtworkTagsVariables, TContext>) =>
    useMutation<UpdateArtworkTags, TError, UpdateArtworkTagsVariables, TContext>(
      ['UpdateArtworkTags'],
      useServerFetcher<UpdateArtworkTags, UpdateArtworkTagsVariables>(UpdateArtworkTagsDocument),
      options
    );