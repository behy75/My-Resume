import { create } from 'zustand';

export const usePrintModeStore = create(set => ({
  isPrintMode: false,
  setIsPrintMode: newIsPrintMode =>
    set(state => ({ isPrintMode: newIsPrintMode })),
}));

export const useShowFullSummary = create(set => ({
  showFullSummary: false,
  setShowFullSummary: newShowFullSummary => {
    set(state => ({ showFullSummary: newShowFullSummary }));
  },
}));
