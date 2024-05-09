import { create } from 'zustand';
import IndividualProfile from '../app/Individual_profile.json';
const { experiences } = IndividualProfile;

export const useExperience = create(set => ({
  experiences,
  setExperiences: newExperience => {
    set(() => ({
      experiences: newExperience,
    }));
  },
}));
