import * as Yup from 'yup';

import { TransferVariables } from 'hooks/web3/transactions/use-transfer';

export const TransferArtworkSchema: Yup.SchemaOf<TransferVariables> =
  Yup.object().shape({
    contractAddress: Yup.string().required(),
    tokenId: Yup.number().required(),
    transferTo: Yup.string()
      .matches(/^0x[a-fA-F0-9]{40}$/g, 'Invalid address')
      .required('To address is required'),
  });
