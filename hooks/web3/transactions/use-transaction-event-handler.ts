import { ContractTransaction } from 'ethers';
import { UseQueryOptions } from 'react-query';
import { useRouter } from 'next/router';

import useEventByTransactionHash from 'hooks/queries/hasura/events/use-event-by-transaction-hash';
import { EventByTransactionHash } from 'graphql/hasura/queries/event-by-transaction-hash.generated';

import { getFirstValue } from 'utils/helpers';

type TransactionEventPollerFn = (arg0: ContractTransaction) => Promise<boolean>;
type TransactionEventPollerData = {
  txHash: string;
  isSuccess: boolean;
};

type TransactionEventPoller = [
  TransactionEventPollerData,
  TransactionEventPollerFn
];

export default function useTransactionEventHandler<
  T extends ContractTransaction
>(
  options?: UseQueryOptions<
    EventByTransactionHash,
    Error,
    EventByTransactionHash['events'][0]
  >
): TransactionEventPoller {
  const router = useRouter();

  const txHash = getFirstValue(router.query.txHash);

  const { data: eventData } = useEventByTransactionHash(
    { transactionHash: txHash },
    options
  );

  const isSuccess = Boolean(eventData);

  const handleTransaction = async (tx: T) => {
    return await router.push({
      pathname: router.pathname,
      query: { ...router.query, txHash: tx.hash },
    });
  };

  return [{ txHash, isSuccess }, handleTransaction];
}
