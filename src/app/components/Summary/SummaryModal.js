import React, { useState } from 'react';
import { useShowFullSummary } from '@/store';
import DynamicModal from '../Common/DynamicModal';
import { SUMMARY_INFORMATION_STATISTICS } from '@/app/utils';
const { SUMMARY } = SUMMARY_INFORMATION_STATISTICS;

export default function SummaryModal() {
  const { summary, setSummary } = useShowFullSummary(state => state);

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

  const onSubmit = () => setSummary({ ...state });

  return (
    <DynamicModal title="Summary" fields={summaryFields} onSubmit={onSubmit} />
  );
}
