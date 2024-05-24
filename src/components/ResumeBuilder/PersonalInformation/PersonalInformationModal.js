import React, { useState } from 'react';
import { PERSONAL_INFORMATION_STATISTICS } from '@/utils';
import { useQueryClient } from 'react-query';
import { useUpdatePersonalInformation } from '@/hooks/usePersonalInformation';
import DynamicModal from '../../Common/DynamicModal';
import { notifyError, notifySuccess } from '../../Common/Notify';
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
  const [closeModal, setCloseModal] = useState(false);
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
  const onSuccess = () => {
    setCloseModal(true);
    notifySuccess(
      data?.message || 'Personal information successfully updated.'
    );
    setTimeout(() => {
      setCloseModal(false);
    });
  };
  const onError = () => {
    notifyError(error?.message || 'Request failed.');
  };

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
    setPersonalInformation(updatedData, { onSuccess, onError });
  };

  return (
    <DynamicModal
      title={title}
      fields={personalInformationFields}
      onSubmit={onSubmit}
      isLoading={isLoading}
      closeModal={closeModal}
    />
  );
}

export default PersonalInformationModal;
