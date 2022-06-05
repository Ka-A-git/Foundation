import * as Yup from 'yup';

import { amountFieldSchema, isNotOwner, isOwner } from './generic';

import {
  AcceptOfferFormValues,
  MakeOfferFormValues,
} from 'components/transactions/offer/types';

export const createOfferSchema: (
  arg0: number,
  arg1: number
) => Yup.SchemaOf<MakeOfferFormValues> = (min: number, max: number) =>
  Yup.object().shape({
    contractAddress: Yup.string().required(),
    tokenId: Yup.number().required(),
    amount: amountFieldSchema(min, max),
    fethBalance: Yup.number().required(),
    balance: Yup.number().required(),
    maxOffer: Yup.number().nullable(),
    isOwner: isNotOwner,
  });

export const OfferAcceptSchema: Yup.SchemaOf<AcceptOfferFormValues> =
  Yup.object().shape({
    contractAddress: Yup.string().required(),
    offerFrom: Yup.string().required(),
    tokenId: Yup.number().required(),
    amount: Yup.number().required(),
    isOwner: isOwner,
    isExpired: Yup.bool().required().oneOf([false], 'Offer expired').nullable(),
  });
