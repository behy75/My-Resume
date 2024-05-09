import React, { useState } from 'react';
import { usePersonalInformation } from '@/store/usePersonalInformation';
import DynamicModal from '../customs/DynamicModal';
import { PERSONAL_INFORMATION_STATISTICS } from '@/app/utils';
const { FIRST_NAME, LAST_NAME, POSITION, ADDRESS, STACK } =
  PERSONAL_INFORMATION_STATISTICS;

function PersonalInformationModal() {
  const {
    firstName,
    lastName,
    position,
    address,
    stack,
    setPersonalInformation,
  } = usePersonalInformation(state => state);
  const [state, setState] = useState({
    firstName,
    lastName,
    position,
    address,
    stack,
  });

  const personalInformationFields = [
    {
      ...FIRST_NAME,
      value: state.firstName,
      setValue: firstName =>
        setState(prevState => ({ ...prevState, firstName })),
    },
    {
      ...LAST_NAME,
      value: state.lastName,
      setValue: lastName => setState(prevState => ({ ...prevState, lastName })),
    },
    {
      ...POSITION,
      value: state.position,
      setValue: position => setState(prevState => ({ ...prevState, position })),
    },
    {
      ...ADDRESS,
      value: state.address,
      setValue: address => setState(prevState => ({ ...prevState, address })),
    },
    {
      ...STACK,
      value: state.stack,
      setValue: stack => setState(prevState => ({ ...prevState, stack })),
    },
  ];
  console.log(FIRST_NAME);
  const onSubmit = () => {
    setPersonalInformation({ ...state });
  };

  return (
    <DynamicModal
      title="Personal Information"
      fields={personalInformationFields}
      onSubmit={onSubmit}
    />
  );
}

export default PersonalInformationModal;
