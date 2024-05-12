import { create } from 'zustand';
import IndividualProfile from '../../db.json';
const { experiences } = IndividualProfile;

export const useExperience = create(set => ({
  experiences,
  setExperiences: newExperience => {
    set(() => ({
      experiences: newExperience,
    }));
  },
}));
