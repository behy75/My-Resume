import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { SUMMARY_INFORMATION_STATISTICS } from '@/utils';
import DynamicModal from '../../Common/DynamicModal';
import { useUpdateSummary } from '@/hooks/useSummary';
import { notifyError, notifySuccess } from '@/components/Common/Notify';
const { SUMMARY } = SUMMARY_INFORMATION_STATISTICS;

export default function SummaryModal() {
  const queryClient = useQueryClient();
  const { summary } = queryClient.getQueryData('summary');
  const {
    mutate: setSummary,
    data,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useUpdateSummary();
  const [state, setState] = useState({
    summary,
  });
  const [closeModal, setCloseModal] = useState(false);

  const summaryFields = [
    {
      ...SUMMARY,
      value: state.summary,
      setValue: summary => setState(prevState => ({ ...prevState, summary })),
    },
  ];

  const onSuccess = () => {
    setCloseModal(true);
    notifySuccess(data?.message || 'Summary successfully updated.');
    setTimeout(() => {
      setCloseModal(false);
    });
  };
  const onError = () => {
    notifyError(error?.message || 'Request failed.');
  };

  const onSubmit = () => {
    // setSummary({ targetDataName: 'summary', updatedData: state.summary });
    setSummary({ ...state }, { onSuccess, onError });
  };

  return (
    <DynamicModal
      title="Summary"
      fields={summaryFields}
      onSubmit={onSubmit}
      isLoading={isLoading}
      closeModal={closeModal}
    />
  );
}
