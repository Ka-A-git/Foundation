import { useEffect } from 'react';
import useSegmentEvent, { SegmentEvent, EventName } from './use-segment-event';

/*

  1. record viewed (useEffect on mount)
  2. on submitted (onMutate?)
  3. on success (onSuccess)

*/

interface SegmentTransactionArgs<T> {
  isReady: boolean;
  payload: T;
  viewedEventName?: EventName;
}

export default function useSegmentTransaction<
  T extends Record<string, unknown>
>(args: SegmentTransactionArgs<T>): [T, (event: SegmentEvent<T>) => void] {
  const { isReady, payload, viewedEventName } = args;

  const [sendSegmentEvent] = useSegmentEvent();

  useEffect(
    () => {
      if (isReady && viewedEventName) {
        sendSegmentEvent<T>({
          eventName: viewedEventName,
          payload,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isReady]
  );

  return [payload, sendSegmentEvent];
}
