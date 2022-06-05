import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';

import { doImportCollectionCheck } from 'queries/admin/collection';

interface UseImportCollectionCheckArgs {
  contractAddress: string;
  adminPublicKey: string;
}

export default function useImportCollectionCheck(
  options?: UseMutationOptions<Response, Response, UseImportCollectionCheckArgs>
): UseMutationResult<Response, Response, UseImportCollectionCheckArgs> {
  return useMutation(doImportCollectionCheck, options);
}
