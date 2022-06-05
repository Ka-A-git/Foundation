import * as Types from '../types-server.generated';

import { ArtworkFragment } from '../server-fragments.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { useServerFetcher } from 'lib/clients/graphql';
export type CreateArtworkVariables = Types.Exact<{
  data: Types.CreateArtworkInput;
}>;


export type CreateArtwork = { createArtwork: Pick<Types.Artwork, 'id' | 'name' | 'description' | 'assetScheme' | 'assetHost' | 'assetPath' | 'assetIPFSPath' | 'metadataScheme' | 'metadataHost' | 'metadataPath' | 'metadataIPFSPath' | 'mintTxHash' | 'auctionStartTxHash' | 'width' | 'height' | 'duration' | 'mimeType' | 'tokenId' | 'status' | 'hiddenAt' | 'deletedAt' | 'moderationStatus'> };


export const CreateArtworkDocument = /*#__PURE__*/ `
    mutation CreateArtwork($data: CreateArtworkInput!) {
  createArtwork(data: $data) {
    ...ArtworkFragment
  }
}
    ${ArtworkFragment}`;
export const useCreateArtwork = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<CreateArtwork, TError, CreateArtworkVariables, TContext>) =>
    useMutation<CreateArtwork, TError, CreateArtworkVariables, TContext>(
      ['CreateArtwork'],
      useServerFetcher<CreateArtwork, CreateArtworkVariables>(CreateArtworkDocument),
      options
    );