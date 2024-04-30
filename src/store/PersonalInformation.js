import { create } from 'zustand';
import IndividualProfile from '../app/Individual_profile.json';
const personalDetails = IndividualProfile.personal_details;
const { first_name, last_name, web_site_url, role, address, stack } =
  personalDetails;

export const usePersonalInformation = create(set => ({
  firstName: first_name,
  lastName: last_name,
  position: role,
  address: address,
  webSiteURL: web_site_url,
  stack: stack,
  setPersonalInformation: ({
    firstName,
    lastName,
    position,
    address,
    webSiteURL,
    stack,
  }) => {
    set(state => ({
      firstName,
      lastName,
      position,
      address,
      webSiteURL,
      stack,
    }));
  },
  setFirstName: newFirstName => {
    set(state => ({ firstName: newFirstName }));
  },
  setLastName: newLastName => {
    set(state => ({ lastName: newLastName }));
  },
  setPosition: newPosition => {
    set(state => ({ position: newPosition }));
  },
  setAddress: newAddress => {
    set(state => ({ address: newAddress }));
  },
  setWebSiteURL: newWebSiteURL => {
    set(state => ({ webSiteURL: newWebSiteURL }));
  },
  setStack: newStack => {
    set(state => ({ stack: newStack }));
  },
}));
