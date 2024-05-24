import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import DynamicModal from '../../Common/DynamicModal';
import { useUpdateSocialNetworks } from '@/hooks/useSocialNetworks';
import { CONTACT_INFORMATION_STATISTICS } from '@/utils';
const { WEBSITE_URL, LINKEDIN, GITHUB, EMAIL, PHONE } =
  CONTACT_INFORMATION_STATISTICS;

function findSocialNetworks(socialNetworks, name) {
  return socialNetworks.find(socialNetwork =>
    socialNetwork.name.toLowerCase().includes(name)
  );
}

function SocialNetWorkModal({ title }) {
  const {
    mutate: setUpdateSocialNetworks,
    data,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useUpdateSocialNetworks();
  const queryClient = useQueryClient();
  const socialNetworks = queryClient.getQueryData('social_networks') || [];

  const [state, setState] = useState({
    webSite: { ...findSocialNetworks(socialNetworks, 'website') },
    linkedin: { ...findSocialNetworks(socialNetworks, 'linkedin') },
    gitHub: { ...findSocialNetworks(socialNetworks, 'git hub') },
    email: { ...findSocialNetworks(socialNetworks, 'email') },
    phone: { ...findSocialNetworks(socialNetworks, 'phone') },
  });

  const SocialNetWorkFields = [
    {
      ...WEBSITE_URL,
      value: state.webSite.link,
      displayName: state.webSite.displayName,
      setValue: webSite => setState(prevState => ({ ...prevState, webSite })),
    },
    {
      ...LINKEDIN,
      value: state.linkedin.link,
      displayName: state.linkedin.displayName,
      setValue: linkedin => setState(prevState => ({ ...prevState, linkedin })),
    },
    {
      ...GITHUB,
      value: state.gitHub.link,
      displayName: state.gitHub.displayName,
      setValue: gitHub => setState(prevState => ({ ...prevState, gitHub })),
    },
    {
      ...EMAIL,
      value: state.email.link,
      displayName: state.email.displayName,
      setValue: email => setState(prevState => ({ ...prevState, email })),
    },
    {
      ...PHONE,
      value: state.phone.link,
      displayName: state.phone.displayName,
      setValue: phone => setState(prevState => ({ ...prevState, phone })),
    },
  ];

  const onSubmit = () => {
    const socialNetworksData = [];
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        const { displayName, link, name } = state[key];
        socialNetworksData.push({
          display_name: displayName,
          link,
          name,
        });
      }
    }

    setUpdateSocialNetworks({
      targetDataName: 'social_networks',
      socialNetworksData,
    });
  };

  useEffect(() => {
    setState(prevState => ({
      webSite: { ...findSocialNetworks(socialNetworks, 'website') },
      linkedin: { ...findSocialNetworks(socialNetworks, 'linkedin') },
      gitHub: { ...findSocialNetworks(socialNetworks, 'git hub') },
      email: { ...findSocialNetworks(socialNetworks, 'email') },
      phone: { ...findSocialNetworks(socialNetworks, 'phone') },
    }));
  }, []);

  return (
    <DynamicModal
      title={title}
      fields={SocialNetWorkFields}
      onSubmit={onSubmit}
    />
  );
}

export default SocialNetWorkModal;
