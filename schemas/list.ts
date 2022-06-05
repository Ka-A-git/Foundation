import * as Yup from 'yup';

import { MIN_MARKET_AMOUNT } from 'lib/constants';
import { parseFiat } from 'utils/formatters';

import { CreateReserveAuctionVariables } from 'hooks/web3/transactions/use-create-reserve-auction';

export const ListArtworkSchema: Yup.SchemaOf<CreateReserveAuctionVariables> =
  Yup.object().shape({
    reservePrice: Yup.number()
      .transform((o, v) => parseFiat(v))
      .min(MIN_MARKET_AMOUNT, 'Must be at least ${min} ETH')
      .max(100000, 'Must be less than ${max} ETH')
      .nullable()
      .required('Reserve price is required'),
    contractAddress: Yup.string().required(),
    tokenId: Yup.number().required('Token ID is required'),
  });
