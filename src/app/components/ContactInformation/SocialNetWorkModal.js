import React, { useState } from 'react';
import { useContactInformation } from '@/store/useContactInformation';
import DynamicModal from '../customs/DynamicModal';
import { CONTACT_INFORMATION_STATISTICS } from '@/app/utils';
const { WEBSITE_URL, LINKEDIN, GITHUB, EMAIL, PHONE } =
  CONTACT_INFORMATION_STATISTICS;

function SocialNetWorkModal(props) {
  const { title } = props;
  const { webSite, linkedin, gitHub, email, phone, setContactInformation } =
    useContactInformation(state => state);
  const [state, setState] = useState({
    webSite,
    linkedin,
    gitHub,
    email,
    phone,
  });

  const SocialNetWorkFields = [
    {
      ...WEBSITE_URL,
      value: webSite.link,
      displayName: webSite.displayName,
      setValue: webSite => setState(prevState => ({ ...prevState, webSite })),
    },
    {
      ...LINKEDIN,
      value: linkedin.link,
      displayName: linkedin.displayName,
      setValue: linkedin => setState(prevState => ({ ...prevState, linkedin })),
    },
    {
      ...GITHUB,
      value: gitHub.link,
      displayName: gitHub.displayName,
      setValue: gitHub => setState(prevState => ({ ...prevState, gitHub })),
    },
    {
      ...EMAIL,
      value: email.link,
      displayName: email.displayName,
      setValue: email => setState(prevState => ({ ...prevState, email })),
    },
    {
      ...PHONE,
      value: phone.link,
      displayName: phone.displayName,
      setValue: phone => setState(prevState => ({ ...prevState, phone })),
    },
  ];

  const onSubmit = () => setContactInformation({ ...state });

  return (
    <DynamicModal
      title={title}
      fields={SocialNetWorkFields}
      onSubmit={onSubmit}
    />
  );
}

export default SocialNetWorkModal;
