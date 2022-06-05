import * as Yup from 'yup';
import { parseFiat } from 'utils/formatters';

import { UpdateReserveAuctionFormValues } from 'components/transactions/change-price/types';
import { currentPriceField } from './generic';
import { MIN_MARKET_AMOUNT } from 'lib/constants';

export const ChangePriceArtworkSchema: Yup.SchemaOf<UpdateReserveAuctionFormValues> =
  Yup.object().shape({
    auctionId: Yup.number().required('Auction already settled'),
    // TODO: share/standardise this field
    reservePrice: Yup.number()
      .transform((o, v) => parseFiat(v))
      .min(MIN_MARKET_AMOUNT, 'Must be at least ${min} ETH')
      .nullable()
      .required('Reserve price is required'),
    currentPrice:
      currentPriceField<UpdateReserveAuctionFormValues>('reservePrice'),
  });
