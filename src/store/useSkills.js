import { create } from 'zustand';
import DB from '../../DB.json';
const { skills } = DB;

export const useSkills = create(set => ({
  skills,
  setSkills: newSkills => {
    set(() => ({
      skills: [...newSkills],
    }));
  },
}));
