import React, { useState } from 'react';
import { useContactInformation } from '@/store/useContactInformation';
import DynamicModal from '../customs/DynamicModal';

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
      title: 'Website URL',
      value: webSite.link,
      displayName: webSite.displayName,
      setValue: webSite => setState(prevState => ({ ...prevState, webSite })),
      type: 'text',
      placeholder: '',
      isTwoColumn: true,
    },
    {
      title: 'Linkedin',
      value: linkedin.link,
      displayName: linkedin.displayName,
      setValue: linkedin => setState(prevState => ({ ...prevState, linkedin })),
      type: 'text',
      placeholder: 'https://www.linkedin.com/in/behnam-ebrahimy/',
      isTwoColumn: true,
    },
    {
      title: 'Git Hub',
      value: gitHub.link,
      displayName: gitHub.displayName,
      setValue: gitHub => setState(prevState => ({ ...prevState, gitHub })),
      type: 'text',
      placeholder: 'https://github.com/behy75',
      isTwoColumn: true,
    },
    {
      title: 'Email',
      value: email.link,
      displayName: email.displayName,
      setValue: email => setState(prevState => ({ ...prevState, email })),
      type: 'email',
      placeholder: 'Bebrahimy19@gmail.com',
      isTwoColumn: true,
    },
    {
      title: 'Phone',
      value: phone.link,
      displayName: phone.displayName,
      setValue: phone => setState(prevState => ({ ...prevState, phone })),
      type: 'phone',
      placeholder: '+98(918)6393984',
      isTwoColumn: true,
    },
  ];

  const onSubmit = () => {
    setContactInformation({ ...state });
  };

  return (
    <DynamicModal
      title={title}
      fields={SocialNetWorkFields}
      onSubmit={onSubmit}
    />
  );
}

export default SocialNetWorkModal;
