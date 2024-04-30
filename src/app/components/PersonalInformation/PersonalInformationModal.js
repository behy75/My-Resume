import React, { useState } from 'react';
import { usePersonalInformation } from '@/store/PersonalInformation';
import DynamicModal from '../customs/DynamicModal';

function PersonalInformationModal() {
  const {
    firstName,
    lastName,
    position,
    address,
    webSiteURL,
    stack,
    setPersonalInformation,
  } = usePersonalInformation(state => state);
  const [state, setState] = useState({
    firstName,
    lastName,
    position,
    address,
    webSiteURL,
    stack,
  });

  const PersonalInformationFields = [
    {
      title: 'First name',
      value: state.firstName,
      setValue: firstName =>
        setState(prevState => ({ ...prevState, firstName })),
      type: 'text',
      placeholder: 'Behnam',
    },
    {
      title: 'Last name',
      value: state.lastName,
      setValue: lastName => setState(prevState => ({ ...prevState, lastName })),
      type: 'text',
      placeholder: 'Ebrahimy',
    },
    {
      title: 'Position',
      value: state.position,
      setValue: position => setState(prevState => ({ ...prevState, position })),
      type: 'text',
      placeholder: 'Senior Front-End Developer',
    },
    {
      title: 'Address',
      value: state.address,
      setValue: address => setState(prevState => ({ ...prevState, address })),
      type: 'text',
      placeholder: 'Tehran, Iran',
    },
    {
      title: 'Website URL',
      value: state.webSiteURL,
      setValue: webSiteURL =>
        setState(prevState => ({ ...prevState, webSiteURL })),
      type: 'text',
      placeholder: '',
    },
    {
      title: 'Stack',
      value: state.stack,
      setValue: stack => setState(prevState => ({ ...prevState, stack })),
      type: 'text',
      placeholder: 'JS',
    },
  ];

  const onSubmit = () => {
    setPersonalInformation({ ...state });
  };

  return (
    <DynamicModal
      title="Personal Information"
      fields={PersonalInformationFields}
      onSubmit={onSubmit}
    />
  );
}

export default PersonalInformationModal;
