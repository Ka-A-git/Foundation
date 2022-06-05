import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { formatEther, parseUnits } from '@ethersproject/units';
import {
  always,
  apply,
  compose,
  cond,
  equals,
  isEmpty,
  isNil,
  reject,
  T,
} from 'ramda';

export const fromBNDec = compose<BigNumber, string, number>(
  Number,
  formatEther
);

export const toBNFixed = (n: BigNumberish): string => {
  const value = n.toString();
  return parseUnits(value).toString();
};

// ignores 0 and null values when searching for a min in an array
export const nonZeroMin = (values: number[]): number | null => {
  return compose(
    cond([
      // If the resulting array is empty return null
      [isEmpty, always(null)],
      // Otherwise find the smallest value from the list
      [T, apply(Math.min)],
    ]),
    // Remove 0 values
    reject(equals(0)),
    // Remove any nulls from array
    reject(isNil)
  )(values);
};

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};
