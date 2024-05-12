import { create } from 'zustand';
import DB from '../../DB.json';
const socialNetworks = DB.social_networks;

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
