import * as Yup from 'yup';

import slugify from 'underscore.string/slugify';

import { debounce, isAllTrue, notEmptyOrNil } from 'utils/helpers';
import { areKeysEqual } from 'utils/users';
import { maybeLowerCase } from 'utils/case';

import { getUniqueCollectionByContractSlug } from 'queries/hasura/collections';
import { contractAddressField } from './generic';
import { CreateCollectionFormValues } from 'components/transactions/collection/types';
import { SelfDestructFormValues } from 'components/transactions/collection/self-destruct/types';

// We use a constant here as its used to match in the custom field due to specific validation behvaiour we want
export const SYMBOL_CHARACTER_LIMIT_ERROR =
  'Collection symbols should be less than 8 characters';

const checkIsValidSlug = (slug: string) => {
  // slugify the URL
  const slugifiedValue = slugify(slug);
  // return true when both the current value
  // and slugified version are equal
  return areKeysEqual([maybeLowerCase(slugifiedValue), maybeLowerCase(slug)]);
};

export const CreateCollectionSchema: Yup.SchemaOf<CreateCollectionFormValues> =
  Yup.object().shape({
    name: Yup.string()
      .required('A collection name is required')
      .max(48, 'Collection names should be less than 48 characters'),
    symbol: Yup.string()
      // TODO: add a better validation message here
      .test(
        'slug-valid',
        "Collection symbols can't contain special characters or spaces",
        checkIsValidSlug
      )
      .required('A collection symbol is required')
      .max(8, SYMBOL_CHARACTER_LIMIT_ERROR),
  });

interface EditCollectionSchemaArgs {
  initialSlug: string;
}

export const EditCollectionSchema = (args: EditCollectionSchemaArgs) =>
  Yup.object().shape({
    data: Yup.object().shape({
      contractAddress: contractAddressField,
      collectionImageUrl: Yup.string().url('Is not a valid URL'),
      coverImageUrl: Yup.string().url('Is not a valid URL'),
      description: Yup.string().max(500, 'Cannot be more than 500 characters'),
      slug: Yup.string()
        .required('A collection URL is required')
        .min(1, 'Must be at least one character')
        .max(24, 'Cannot be more than 24 characters')
        .test('slug-valid', 'Collection URL is invalid', checkIsValidSlug)
        // run an async check to check whether the slug is already taken or not
        .test('slug-available', 'This URL is already taken', async (value) => {
          return new Promise((resolve) => {
            checkUniqueness({
              resolve,
              value,
              initialValue: args.initialSlug,
            });
          });
        }),
    }),
  });

interface CheckUniquenessArgs {
  value: string;
  initialValue: string;
  resolve: (arg0: boolean) => void;
}

const checkUniqueness: (arg0: CheckUniquenessArgs) => void = debounce(
  (args: CheckUniquenessArgs) => {
    const { value, initialValue, resolve } = args;

    const hasValue = notEmptyOrNil(value);
    const isValueOriginal = areKeysEqual([value, initialValue]);
    const canCheckUniqueness = isAllTrue([hasValue, !isValueOriginal]);

    if (canCheckUniqueness) {
      // return false when a collection is found (slug is taken)
      getUniqueCollectionByContractSlug({
        slug: value,
      }).then((collection) => resolve(!collection));
    } else {
      // otherwise return true (slug is available)
      resolve(true);
    }
  },
  250
);

export const SelfDestructCollectionSchema: Yup.SchemaOf<SelfDestructFormValues> =
  Yup.object().shape({
    contractAddress: Yup.string().required(),
  });
