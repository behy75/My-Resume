import React, { useState } from 'react';
import DynamicModal from '../Common/DynamicModal';
import { PERSONAL_INFORMATION_STATISTICS } from '@/app/utils';
import { useQueryClient } from 'react-query';
import { useUpdateData } from '@/app/hooks/useUpdateData';
const { FIRST_NAME, LAST_NAME, POSITION, ADDRESS, STACK } =
  PERSONAL_INFORMATION_STATISTICS;

function PersonalInformationModal({ title }) {
  const { mutate: setPersonalInformation } = useUpdateData();
  const queryClient = useQueryClient();
  const personalInformation = queryClient.getQueryData('personal_details');
  const {
    address,
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
      address: state.address,
      first_name: state.firstName,
      last_name: state.lastName,
      role: state.position,
      stack: state.stack,
    };
    setPersonalInformation({
      targetDataName: 'personal_details',
      updatedData: { ...updatedData },
    });
  };

  return (
    <DynamicModal
      title={title}
      fields={personalInformationFields}
      onSubmit={onSubmit}
    />
  );
}

export default PersonalInformationModal;
