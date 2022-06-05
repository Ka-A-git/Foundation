import create from 'zustand';
import { AlgoliaArtworkMarketAvailability } from 'types/Algolia';

export interface SearchState {
  searchTerm: string;
  isLoading: boolean;
  artworkAvailabilities: string[];
  setSearchLoading: (value: boolean) => void;
  setArtworkAvailabilities: (value: string[]) => void;
}

const useSearchState = create<SearchState>((set) => ({
  isLoading: true,
  searchTerm: '',
  artworkAvailabilities: [
    AlgoliaArtworkMarketAvailability.LIVE_AUCTION,
    AlgoliaArtworkMarketAvailability.RESERVE_NOT_MET,
    AlgoliaArtworkMarketAvailability.HAS_ACTIVE_BUY_NOW,
    AlgoliaArtworkMarketAvailability.HAS_ACTIVE_OFFER,
  ],
  setSearchLoading: (value) => set({ isLoading: value }),
  setArtworkAvailabilities: (value) => set({ artworkAvailabilities: value }),
}));

export default useSearchState;
