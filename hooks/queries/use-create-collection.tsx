import { useQuery } from 'react-query';
import { CreateCollectionFormValues } from 'components/transactions/collection/types';

export default function useCreateCollectionQuery() {
  return useQuery<CreateCollectionFormValues>(
    useCreateCollectionQuery.getKey()
  );
}

useCreateCollectionQuery.getKey = () => ['create-collection'];
