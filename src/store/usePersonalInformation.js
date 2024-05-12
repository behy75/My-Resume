import { create } from 'zustand';
import DB from '../../DB.json';
const personalDetails = DB.personal_details;
const { first_name, last_name, role, address, stack } = personalDetails;

export const usePersonalInformation = create(set => ({
  firstName: first_name,
  lastName: last_name,
  position: role,
  address: address,
  stack: stack,
  setPersonalInformation: ({
    firstName,
    lastName,
    position,
    address,
    stack,
  }) => {
    set(state => ({
      firstName,
      lastName,
      position,
      address,
      stack,
    }));
  },
}));
