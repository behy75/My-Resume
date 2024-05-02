import { create } from 'zustand';
import IndividualProfile from '../app/Individual_profile.json';
const socialNetworks = IndividualProfile.social_networks;

function findSocialNetworks(name) {
  return socialNetworks.find(socialNetwork =>
    socialNetwork.name.toLowerCase().includes(name)
  );
}

export const useContactInformation = create(set => ({
  webSite: { ...findSocialNetworks('website') },
  linkedin: { ...findSocialNetworks('linkedin') },
  gitHub: { ...findSocialNetworks('git hub') },
  email: { ...findSocialNetworks('email') },
  phone: { ...findSocialNetworks('phone') },
  setContactInformation: ({ webSite, linkedin, gitHub, email, phone }) => {
    set(state => ({
      webSite,
      linkedin,
      gitHub,
      email,
      phone,
    }));
  },
}));
