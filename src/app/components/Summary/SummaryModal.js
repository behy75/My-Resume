import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
// import { useShowFullSummary } from '@/store';
import DynamicModal from '../Common/DynamicModal';
import { useUpdateData } from '@/app/hooks/useFetchData';
import { SUMMARY_INFORMATION_STATISTICS } from '@/app/utils';
const { SUMMARY } = SUMMARY_INFORMATION_STATISTICS;

export default function SummaryModal() {
  const queryClient = useQueryClient();
  const summary = queryClient.getQueryData('summary');
  // const { setSummary } = useShowFullSummary(state => state);
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
