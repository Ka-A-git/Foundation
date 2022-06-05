import { useQuery, UseQueryOptions } from 'react-query';
import { BaseProvider } from '@ethersproject/providers';
import { useProvider } from 'wagmi';
import { omit } from 'ramda';
import { BigNumberish } from '@ethersproject/bignumber';
import { CallOverrides } from '@ethersproject/contracts';

import { FNDMiddleware } from 'types/contracts';

import { getMiddlewareContractToRead } from 'lib/contracts';
import { isQueryEnabled } from 'hooks/queries/shared';

import { isAllTrue } from 'utils/helpers';
import { areKeysEqual } from 'utils/users';
import { fromBNDec, toBNFixed } from 'utils/numbers';
import { ZERO_ADDRESS } from 'lib/constants';

type GetFeesArgs = [string, BigNumberish, BigNumberish];

type GetFees = [
  FNDMiddleware.FeeWithRecipientStructOutput,
  FNDMiddleware.FeeStructOutput,
  FNDMiddleware.FeeWithRecipientStructOutput,
  FNDMiddleware.RevSplitStructOutput[]
];

export interface GetFeesVariables<T> {
  currentUserPublicKey: string;
  contractAddress: string;
  tokenId: BigNumberish;
  price: T;
  overrides?: CallOverrides;
}

export type RecipientType =
  | 'FOUNDATION'
  | 'CREATOR'
  | 'OWNER'
  | 'SPLIT_RECIPIENT'
  | 'RANDO';

export type FeeStruct = {
  recipientType: RecipientType;
  recipient: string;
  amountInEth: number;
  percent: number;
};

export type ReceivedFees = {
  recipients: FeeStruct[];
  currentUserFee: FeeStruct;
  fndFeePercent: number;
  creatorFeePercent: number;
  isPrimarySale: boolean;
};

export default function useGetFees<TError = Error>(
  variables: GetFeesVariables<number>,
  options?: UseQueryOptions<GetFees, TError, ReceivedFees>
) {
  const provider = useProvider();

  const price = variables.price ? toBNFixed(variables.price) : toBNFixed(0);

  return useQuery(
    useGetFees.getKey(variables),
    () => getFees({ ...variables, price }, provider),
    {
      ...options,
      select: (res) => {
        const [fndFees, _creatorFees, ownerFees, recipients] = res;

        const fees = [
          ...recipients.map((recipient, index) =>
            createRecipientFee(
              recipient,
              index === 0 ? 'CREATOR' : 'SPLIT_RECIPIENT'
            )
          ),
          createFee(ownerFees, 'OWNER'),
          createFee(fndFees, 'FOUNDATION'),
        ].filter((fee) => !areKeysEqual([fee.recipient, ZERO_ADDRESS]));

        const currentUserFee = fees.find((fee) =>
          areKeysEqual([fee.recipient, variables.currentUserPublicKey])
        );

        const fndFee = fees.find((fee) => fee.recipientType === 'FOUNDATION');
        const creatorFee = fees.find((fee) => fee.recipientType === 'CREATOR');
        const ownerFee = fees.find((fee) => fee.recipientType === 'OWNER');

        const recipientFees = fees.filter(
          (fee) =>
            !areKeysEqual([fee.recipient, variables.currentUserPublicKey])
        );

        return {
          // TODO: handle rando case
          currentUserFee,
          recipients: recipientFees,
          fndFeePercent: fndFee.percent,
          creatorFeePercent: creatorFee.percent,
          isPrimarySale: !ownerFee,
        };
      },
      enabled: isAllTrue([
        // exclude the price so we can query for 0
        ...Object.values(omit(['price'], variables)),
        isQueryEnabled(options),
        provider,
      ]),
      keepPreviousData: true,
    }
  );
}

useGetFees.getKey = (variables: GetFeesVariables<number>) => [
  'GetFees',
  variables,
];

async function getFees(
  variables: GetFeesVariables<BigNumberish>,
  provider: BaseProvider
) {
  const { tokenId, contractAddress, price, overrides } = variables;

  const nftMarketContract = getMiddlewareContractToRead(provider);

  const txArgs: GetFeesArgs = [contractAddress, tokenId, price];

  return overrides
    ? await nftMarketContract.getFees(...txArgs, overrides)
    : await nftMarketContract.getFees(...txArgs);
}

const createFee = (
  fees: FNDMiddleware.FeeWithRecipientStructOutput,
  recipientType: RecipientType
): FeeStruct => {
  const [percentInBasisPoints, amountInWei, recipient] = fees;

  return {
    recipient,
    recipientType,
    amountInEth: fromBNDec(amountInWei),
    percent: percentInBasisPoints.toNumber() / 100,
  };
};

const createRecipientFee = (
  fees: FNDMiddleware.RevSplitStructOutput,
  recipientType: RecipientType
): FeeStruct => {
  const [_, absolutePercentInBasisPoints, amountInWei, recipient] = fees;

  return {
    recipient,
    recipientType,
    amountInEth: fromBNDec(amountInWei),
    percent: absolutePercentInBasisPoints.toNumber() / 100,
  };
};
