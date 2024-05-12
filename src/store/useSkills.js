import { create } from 'zustand';
import IndividualProfile from '../../db.json';
const { skills } = IndividualProfile;

export const useSkills = create(set => ({
  skills,
  setSkills: newSkills => {
    set(() => ({
      skills: [...newSkills],
    }));
  },
}));
