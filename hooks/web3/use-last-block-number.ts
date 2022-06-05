import { useWaitForTransaction } from 'wagmi';

export default function useLastBlockNumber(txHash: string) {
  const [{ data: txReceipt }] = useWaitForTransaction({
    hash: txHash,
    skip: !txHash,
    confirmations: 2,
  });

  return txReceipt ? txReceipt.blockNumber - 1 : null;
}
