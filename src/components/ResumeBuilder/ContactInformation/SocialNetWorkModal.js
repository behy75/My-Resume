import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import DynamicModal from '../../Common/DynamicModal';
import { useUpdateSocialNetworks } from '@/hooks/useSocialNetworks';
import { CONTACT_INFORMATION_STATISTICS } from '@/utils';
import { notifyError, notifySuccess } from '@/components/Common/Notify';
const { WEBSITE_URL, LINKEDIN, GITHUB, EMAIL, PHONE } =
  CONTACT_INFORMATION_STATISTICS;

function findSocialNetworks(socialNetworks = [], name) {
  return socialNetworks.find(socialNetwork => {
    return socialNetwork.name
      .toLowerCase()
      .replace(/\s+/g, '')
      .includes(name.replace(/\s+/g, ''));
  });
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
  const socialNetworks = queryClient.getQueryData('social-networks') || [];
  const [state, setState] = useState({
    webSite: {},
    linkedin: {},
    gitHub: {},
    email: {},
    phone: {},
  });
  const [closeModal, setCloseModal] = useState(false);

  const SocialNetWorkFields = [
    {
      ...WEBSITE_URL,
      value: state.webSite.link,
      displayName: state.webSite.display_name,
      setValue: webSite =>
        setState(prevState => ({
          ...prevState,
          webSite: { ...prevState.webSite, ...webSite },
        })),
    },
    {
      ...LINKEDIN,
      value: state.linkedin.link,
      displayName: state.linkedin.display_name,
      setValue: linkedin =>
        setState(prevState => ({
          ...prevState,
          linkedin: { ...prevState.linkedin, ...linkedin },
        })),
    },
    {
      ...GITHUB,
      value: state.gitHub.link,
      displayName: state.gitHub.display_name,
      setValue: gitHub =>
        setState(prevState => ({
          ...prevState,
          gitHub: { ...prevState.gitHub, ...gitHub },
        })),
    },
    {
      ...EMAIL,
      value: state.email.link,
      displayName: state.email.display_name,
      setValue: email =>
        setState(prevState => ({
          ...prevState,
          email: { ...prevState.email, ...email },
        })),
    },
    {
      ...PHONE,
      value: state.phone.link,
      displayName: state.phone.display_name,
      setValue: phone =>
        setState(prevState => ({
          ...prevState,
          phone: { ...prevState.phone, ...phone },
        })),
    },
  ];

  const onSuccess = () => {
    setCloseModal(true);
    notifySuccess(data?.message || 'Social NetWorks successfully updated.');
    setTimeout(() => {
      setCloseModal(false);
    });
  };
  const onError = () => {
    notifyError(error?.message || 'Request failed.');
  };

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
    const payload = { social_networks: [...socialNetworksData] };
    setUpdateSocialNetworks(payload, { onSuccess, onError });
  };

  useEffect(() => {
    setState(prevState => ({
      webSite: { ...findSocialNetworks(socialNetworks, 'website') },
      linkedin: { ...findSocialNetworks(socialNetworks, 'linkedin') },
      gitHub: { ...findSocialNetworks(socialNetworks, 'github') },
      email: { ...findSocialNetworks(socialNetworks, 'email') },
      phone: { ...findSocialNetworks(socialNetworks, 'phone') },
    }));
  }, [closeModal]);

  return (
    <DynamicModal
      title={title}
      fields={SocialNetWorkFields}
      onSubmit={onSubmit}
      isLoading={isLoading}
      closeModal={closeModal}
    />
  );
}

export default SocialNetWorkModal;
