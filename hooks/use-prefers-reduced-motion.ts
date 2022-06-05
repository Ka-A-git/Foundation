import { useEffect, useState } from 'react';

const NO_PREFERNCE_QUERY = '(prefers-reduced-motion: no-preference)';

const getInitialState = (): boolean => {
  // During SSR, assume no-preference
  if (typeof window === 'undefined') {
    return false;
  }

  const hasNoPreference = window.matchMedia(NO_PREFERNCE_QUERY).matches;
  return hasNoPreference === false;
};

export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);

  useEffect(() => {
    const preference = window.matchMedia(NO_PREFERNCE_QUERY);
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    preference.addEventListener('change', listener);
    return () => {
      preference.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
}
