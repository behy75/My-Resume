import { create } from 'zustand';
import DB from '../../DB.json';

export const usePrintModeStore = create(set => ({
  isPrintMode: false,
  setIsPrintMode: newIsPrintMode =>
    set(state => ({ isPrintMode: newIsPrintMode })),
}));

export const useShowFullSummary = create(set => ({
  showFullSummary: false,
  summary: DB.summary,
  setShowFullSummary: newShowFullSummary =>
    set(state => ({ showFullSummary: newShowFullSummary })),
  setSummary: summary => set(state => ({ ...summary })),
}));

export const useUserLoggedIn = create(set => ({
  token: '',
  loginMessage: '',
  isLogin: false,
  setUserLoggedInData: ({ token, isLogin, loginMessage }) =>
    set(state => ({ token, isLogin, loginMessage })),
}));
