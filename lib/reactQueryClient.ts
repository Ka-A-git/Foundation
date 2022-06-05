import { QueryClient } from 'react-query';
import * as Sentry from '@sentry/nextjs';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      // log all mutation errors by default
      onError: (err) => {
        Sentry.captureException(err, {
          tags: {
            // tag the error so we can filter in sentry
            section: 'global-mutation-error',
          },
        });
      },
    },
  },
});
