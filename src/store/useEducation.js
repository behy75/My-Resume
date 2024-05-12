import { create } from 'zustand';
import DB from '../../DB.json';
const { colleges } = DB;

export const useEducation = create(set => ({
  colleges,
  setColleges: newColleges => {
    set(() => ({
      colleges: newColleges,
    }));
  },
}));
