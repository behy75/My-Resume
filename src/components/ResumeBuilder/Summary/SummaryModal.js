import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { SUMMARY_INFORMATION_STATISTICS } from '@/utils';
import { useUpdateData } from '@/hooks/useUpdateData';
import DynamicModal from '../../Common/DynamicModal';
const { SUMMARY } = SUMMARY_INFORMATION_STATISTICS;

export default function SummaryModal() {
  const queryClient = useQueryClient();
  const summary = queryClient.getQueryData('summary');
  const { mutate: setSummary } = useUpdateData();

  const [state, setState] = useState({
    summary,
  });

  const summaryFields = [
    {
      ...SUMMARY,
      value: state.summary,
      setValue: summary => setState(prevState => ({ ...prevState, summary })),
    },
  ];

  const onSubmit = () => {
    // setSummary({ targetDataName: 'summary', updatedData: state.summary });
    setSummary({ ...state });
  };

  return (
    <DynamicModal title="Summary" fields={summaryFields} onSubmit={onSubmit} />
  );
}
