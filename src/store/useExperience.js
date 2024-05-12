import { create } from 'zustand';
import DB from '../../DB.json';
const { experiences } = DB;

export const useExperience = create(set => ({
  experiences,
  setExperiences: newExperience => {
    set(() => ({
      experiences: newExperience,
    }));
  },
}));
