import * as Yup from 'yup';

import { amountFieldSchema, isNotOwner } from './generic';
import { BidFormValues } from 'components/transactions/bid/types';
import { UpdateArtworkTagsVariables } from 'graphql/server/mutations/update-artwork-tags.generated';

export const createBidAmountSchema: (
  arg0: number,
  arg1: number
) => Yup.SchemaOf<BidFormValues> = (min: number, max: number) => {
  return Yup.object().shape({
    amount: amountFieldSchema(min, max),
    auctionId: Yup.number().required('This NFT is not listed yet'),
    isOwner: isNotOwner,
    isHighestBidder: Yup.bool()
      .required()
      .oneOf([false], 'You are the highest bidder')
      .nullable(),
    isOpenForBids: Yup.bool()
      .required()
      .oneOf([true], 'This NFT is not listed yet')
      .nullable(),
  });
};

export const TagSchema: Yup.SchemaOf<UpdateArtworkTagsVariables> =
  Yup.object().shape({
    data: Yup.object().shape({
      id: Yup.string().required(),
      tags: Yup.array()
        .test('unique', 'Duplicate tags not accepted', (tags) => {
          return new Set(tags).size === tags.length;
        })
        .max(10, 'A maximum of 10 tags can be added to an NFT.'),
    }),
  });
