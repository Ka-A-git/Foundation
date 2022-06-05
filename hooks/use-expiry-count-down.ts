import { useState } from 'react';
import { clamp } from 'ramda';
import { useHarmonicIntervalFn } from 'react-use';

import { parseISO, differenceInSeconds } from 'date-fns/fp';

import { timeRemainingInWords } from 'utils/dates/dates';
import getChainId from 'lib/chainId';

interface ExpiryCountdownArgs {
  expiryDate: string;
  duration?: number;
}

interface CalculateProgressPercentageArgs {
  expiryDate: Date;
  duration: number;
}

// If mainnet totalDuration is 24 hours (86400 as seconds)
// If goerli totalDuration is 30 mins (1800 as seconds)
const totalDuration = getChainId() === 1 ? 86400 : 1800;

// When 24 hours is remaining percent should be 100%
// When 12 hours is remaining percent should be 50%
// When 0 hours is remaining percent should be 0%
export const calculateProgressPercentage = (
  args: CalculateProgressPercentageArgs
) => {
  const { expiryDate, duration } = args;
  const now = new Date();

  const secondsRemainingUntilExpiryDate = differenceInSeconds(now, expiryDate);

  const secondsRemainingIn24Hours = duration - secondsRemainingUntilExpiryDate;
  const secondsAsPercentProgress = (secondsRemainingIn24Hours / duration) * 100;
  const percentRemaining = 100 - secondsAsPercentProgress;
  return clamp(0, 100, percentRemaining);
};

export default function useExpiryCountdown(args: ExpiryCountdownArgs) {
  const { expiryDate, duration = totalDuration } = args;

  const expiryDateObject = parseISO(`${expiryDate}Z`);

  const [percent, setPercent] = useState<number>(
    calculateProgressPercentage({ expiryDate: expiryDateObject, duration })
  );
  const [timeRemaining, setTimeRemaining] = useState<string>(
    timeRemainingInWords(expiryDate, 'short')
  );

  useHarmonicIntervalFn(() => {
    const percentRemaining = calculateProgressPercentage({
      expiryDate: expiryDateObject,
      duration,
    });
    const timeRemaining = timeRemainingInWords(expiryDate, 'short');
    setPercent(percentRemaining);
    setTimeRemaining(timeRemaining);
  }, 1000 * 5);

  return {
    timeRemaining,
    percent,
  };
}
