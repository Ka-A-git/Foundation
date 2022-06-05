import * as Yup from 'yup';

import { RevenueShare } from 'types/Share';
import { countDecimals } from 'utils/formatters';
import { ArtworkStatus } from 'types/Artwork';
import { contractAddressField } from './generic';
import { MintFormValues } from 'components/transactions/mint/types';

const ShareObject: Yup.SchemaOf<RevenueShare> = Yup.object().shape({
  address: Yup.string(),
  shareInPercentage: Yup.number()
    .positive('The split percentage must be a positive number')
    .max(100, 'Cannot be more than 100%')
    .test(
      'maxDigitsAfterDecimal',
      'number field must have 2 digits after decimal or fewer',
      (number) => {
        const numberOfDecimals = countDecimals(number);
        return numberOfDecimals <= 2;
      }
    ),
});

export const MintArtworkSchema: Yup.SchemaOf<MintFormValues> =
  Yup.object().shape({
    contractAddress: contractAddressField,
    name: Yup.string()
      .min(1, 'Must be at least one character')
      .nullable()
      .max(50, 'Must be less than 50 characters')
      .required('NFT name is required'),
    // when the artwork status is MINTING or MINTED we block the form
    status: Yup.string()
      .required()
      .equals(
        [ArtworkStatus.DRAFT, ArtworkStatus.FAILED],
        'NFT has already been minted'
      ),
    description: Yup.string()
      .max(1000, 'Cannot be more than 1000 characters')
      .nullable(),
    splitsEnabled: Yup.bool().required(),
    splits: Yup.array()
      .of(ShareObject)
      .when('splitsEnabled', {
        is: true,
        then: Yup.array()
          .min(2, 'You need at least two recipients')
          .max(4, 'You can have at most four recipients')
          .test(
            'sum-of-splits',
            'The split percentages need to add up to 100',
            (shares: RevenueShare[]) => {
              if (shares.length === 0) {
                return true;
              }
              const reducer = (
                accumulator: number,
                currentValue: RevenueShare
              ) => accumulator + currentValue?.shareInPercentage;
              const sum = shares.reduce(reducer, 0);
              return sum === 100;
            }
          ),
        otherwise: Yup.array(),
      }),
    // block the form when connecting to pinata
    hasPinataKey: Yup.bool().equals([true], 'Connecting to IPFS…'),
  });
