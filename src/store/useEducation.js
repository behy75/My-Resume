import { create } from 'zustand';
import IndividualProfile from '../app/Individual_profile.json';
const { colleges } = IndividualProfile;

export const useEducation = create(set => ({
  colleges,
  setColleges: newColleges => {
    set(() => ({
      colleges: newColleges,
    }));
  },
}));
