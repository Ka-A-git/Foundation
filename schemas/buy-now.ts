import * as Yup from 'yup';

import { ceilETHWithSuffix, parseFiat } from 'utils/formatters';
import {
  amountFieldSchema,
  currentPriceField,
  isNotOwner,
  isOwner,
} from './generic';

import {
  BuyNowFormValues,
  CancelBuyNowFormValues,
  SetBuyNowFormValues,
} from 'components/transactions/buy-now/types';

export const BUY_NOW_MIN_PRICE = 0.01;

export const BuyNowSetSchema: Yup.SchemaOf<SetBuyNowFormValues> =
  Yup.object().shape({
    contractAddress: Yup.string().required(),
    tokenId: Yup.number().required(),
    currentPrice: currentPriceField<SetBuyNowFormValues>('buyNowPrice'),
    hasBuyNowPrice: Yup.bool().required(),
    buyNowPrice: Yup.number()
      .transform((o, v) => parseFiat(v))
      .min(
        BUY_NOW_MIN_PRICE,
        `Must be at least ${ceilETHWithSuffix(BUY_NOW_MIN_PRICE)}`
      )
      .required('Amount is required')
      .nullable(),
    isOwner: isOwner,
  });

export const BuyNowRemoveSchema: Yup.SchemaOf<CancelBuyNowFormValues> =
  Yup.object().shape({
    contractAddress: Yup.string().required(),
    tokenId: Yup.number().required(),
    hasBuyNowPrice: Yup.bool()
      .required('Buy Now price is required')
      .oneOf([true], 'Buy Now price is not set')
      .nullable(),
  });

export const createBuyNowSchema: (
  arg0: number,
  arg1: number
) => Yup.SchemaOf<BuyNowFormValues> = (min: number, max: number) => {
  return Yup.object().shape({
    payableAddress: Yup.string().required(),
    contractAddress: Yup.string().required(),
    tokenId: Yup.number().required(),
    buyNowPrice: amountFieldSchema(min, max),
    hasBuyNowPrice: Yup.bool()
      .required('Buy Now price is required')
      .oneOf([true], 'Buy Now price is not set')
      .nullable(),
    isOwner: isNotOwner,
  });
};
