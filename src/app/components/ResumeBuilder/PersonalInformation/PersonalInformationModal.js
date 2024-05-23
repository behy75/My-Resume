import React, { useState } from 'react';
import { PERSONAL_INFORMATION_STATISTICS } from '@/app/utils';
import { useQueryClient } from 'react-query';
import { useUpdatePersonalInformation } from '@/app/hooks/usePersonalInformation';
import DynamicModal from '../../Common/DynamicModal';
const { FIRST_NAME, LAST_NAME, POSITION, ADDRESS, STACK } =
  PERSONAL_INFORMATION_STATISTICS;

function PersonalInformationModal({ title }) {
  const {
    mutate: setPersonalInformation,
    data,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useUpdatePersonalInformation();

  const queryClient = useQueryClient();
  const personalInformation = queryClient.getQueryData('personal-information');
  const {
    address = '',
    first_name: firstName,
    last_name: lastName,
    role: position,
    stack = '',
  } = personalInformation;
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

  const onSubmit = () => {
    const updatedData = {
      first_name: state.firstName,
      last_name: state.lastName,
      address: state.address,
      role: state.position,
      stack: state.stack,
      date_of_birth: null,
      gender: null,
    };
    setPersonalInformation(updatedData);
  };

  return (
    <DynamicModal
      title={title}
      fields={personalInformationFields}
      onSubmit={onSubmit}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
    />
  );
}

export default PersonalInformationModal;
