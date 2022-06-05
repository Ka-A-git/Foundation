export const isNonUserRejectedError = (error: any) => {
  const hasError = Boolean(error?.error);

  if (hasError) {
    return true;
  }

  const hasErrorMessage = Boolean(error?.message);

  if (hasErrorMessage) {
    return ![
      'No Provider Error',
      'MetaMask Tx Signature: User denied transaction signature.',
      'User rejected request',
      'User rejected the transaction',
    ].includes(error.message);
  }

  return false;
};
