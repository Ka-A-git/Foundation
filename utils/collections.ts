import { CollectionFragment } from 'graphql/hasura/hasura-fragments.generated';
import { getNFT721Address, getSuperrareAddress } from 'lib/addresses';
import { isAnyTrue } from './helpers';
import { areKeysEqual } from './users';

export function buildCollectionPath(
  collection: Pick<CollectionFragment, 'slug' | 'contractAddress'>
) {
  return `/collection/${collection?.slug ?? collection?.contractAddress}`;
}

export const isFNDContractAddress = (contractAddress: string) =>
  areKeysEqual([contractAddress, getNFT721Address()]);

export const isSUPRContractAddress = (contractAddress: string) =>
  areKeysEqual([contractAddress, getSuperrareAddress()]);

export const isSharedContract = (contractAddress: string) =>
  isAnyTrue([
    isSUPRContractAddress(contractAddress),
    isFNDContractAddress(contractAddress),
  ]);
