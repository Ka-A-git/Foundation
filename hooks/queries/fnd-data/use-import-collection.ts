import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';

import { doImportCollection } from 'queries/admin/collection';

interface UseImportCollectionArgs {
  contractAddress: string;
  adminPublicKey: string;
  creatorAddress: string;
}

export default function useImportCollection(
  options?: UseMutationOptions<Response, Response, UseImportCollectionArgs>
): UseMutationResult<Response, Response, UseImportCollectionArgs> {
  return useMutation(doImportCollection, options);
}
