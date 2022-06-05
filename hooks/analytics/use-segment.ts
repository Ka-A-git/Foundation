import { useEffect } from 'react';
import { Analytics, AnalyticsBrowser } from '@segment/analytics-next';

export let analytics: Analytics | undefined = undefined;

export default function useSegment() {
  useEffect(() => {
    const segmentKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;
    const loadAnalytics = async () => {
      if (!analytics && segmentKey) {
        try {
          const [response] = await AnalyticsBrowser.load({
            writeKey: segmentKey,
          });
          analytics = response;
        } catch (error) {
          console.log('Error loading segment');
        }
      }
    };
    loadAnalytics();
  }, []);

  return analytics;
}
