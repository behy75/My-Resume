import { create } from 'zustand';
import IndividualProfile from '../app/Individual_profile.json';
const { skills } = IndividualProfile;

export const useSkills = create(set => ({
  skills,
  setSkills: newSkills => {
    set(() => ({
      skills: [...newSkills],
    }));
  },
}));
