import { create } from 'zustand';
import IndividualProfile from '../app/Individual_profile.json';

export const usePrintModeStore = create(set => ({
  isPrintMode: false,
  setIsPrintMode: newIsPrintMode =>
    set(state => ({ isPrintMode: newIsPrintMode })),
}));

export const useShowFullSummary = create(set => ({
  showFullSummary: false,
  summary: IndividualProfile.summary,
  setShowFullSummary: newShowFullSummary =>
    set(state => ({ showFullSummary: newShowFullSummary })),
  setSummary: summary => set(state => ({ ...summary })),
}));
