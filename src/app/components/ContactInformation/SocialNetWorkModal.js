import React, { useEffect, useState } from 'react';
import DynamicModal from '../Common/DynamicModal';
import { CONTACT_INFORMATION_STATISTICS } from '@/app/utils';
import { useQueryClient } from 'react-query';
import { useUpdateData } from '@/app/hooks/useUpdateData';
const { WEBSITE_URL, LINKEDIN, GITHUB, EMAIL, PHONE } =
  CONTACT_INFORMATION_STATISTICS;

function findSocialNetworks(socialNetworks, name) {
  return socialNetworks.find(socialNetwork =>
    socialNetwork.name.toLowerCase().includes(name)
  );
}

function SocialNetWorkModal({ title }) {
  const { mutate: setContactInformation } = useUpdateData();
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

  const onSubmit = () =>
    setContactInformation({
      targetDataName: 'experiences',
      updatedData: [...state],
    });

  useEffect(
    () =>
      setState(prevState => ({
        webSite: { ...findSocialNetworks(socialNetworks, 'website') },
        linkedin: { ...findSocialNetworks(socialNetworks, 'linkedin') },
        gitHub: { ...findSocialNetworks(socialNetworks, 'git hub') },
        email: { ...findSocialNetworks(socialNetworks, 'email') },
        phone: { ...findSocialNetworks(socialNetworks, 'phone') },
      })),
    [state]
  );

  return (
    <DynamicModal
      title={title}
      fields={SocialNetWorkFields}
      onSubmit={onSubmit}
    />
  );
}

export default SocialNetWorkModal;
