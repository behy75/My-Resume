import React, { useState } from 'react';
import { useShowFullSummary } from '@/store';
import DynamicModal from '../customs/DynamicModal';

export default function SummaryModal() {
  const { summary, setSummary } = useShowFullSummary(state => state);

  const [state, setState] = useState({
    summary,
  });

  const summaryFields = [
    {
      title: 'summary',
      value: state.summary,
      setValue: summary => setState(prevState => ({ ...prevState, summary })),
      type: 'text_area',
      placeholder: 'summary',
    },
  ];

  const onSubmit = () => {
    setSummary({ ...state });
  };

  return (
    <DynamicModal title="Summary" fields={summaryFields} onSubmit={onSubmit} />
  );
}
