import * as Yup from 'yup';

import { BurnVariables } from 'hooks/web3/transactions/use-burn';

export const BurnSchema: Yup.SchemaOf<BurnVariables> = Yup.object().shape({
  contractAddress: Yup.string().required(),
  tokenId: Yup.number().required('Token ID is required'),
});
