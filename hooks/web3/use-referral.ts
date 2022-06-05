import { isAddress } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCookie } from 'react-use';

import { getFirstValue } from 'utils/helpers';
import { areKeysEqual } from 'utils/users';

const REF_PARAM = 'ref';

interface useReferralArgs {
  contractAddress: string;
}

export default function useReferral({ contractAddress }: useReferralArgs) {
  const router = useRouter();
  const refParam = getFirstValue(router.query[REF_PARAM]);
  const [value, updateCookie] = useCookie(REF_PARAM);

  useEffect(() => {
    if (isAddress(refParam) && isAddress(contractAddress)) {
      const cookieValue = `${refParam}.${contractAddress}`;
      // Calculated a timestamp 15 minutes in the future from now
      const expiryTimestamp = new Date(new Date().getTime() + 15 * 60 * 1000);
      updateCookie(cookieValue, { expires: expiryTimestamp });
    }
  }, [refParam, contractAddress, updateCookie]);

  const refPublicKey = () => {
    if (!value) {
      return;
    }
    const [cookieRefParam, cookieContractAddress] = value.split('.');
    if (areKeysEqual([cookieContractAddress, contractAddress])) {
      return cookieRefParam;
    }
  };

  return refPublicKey();
}
