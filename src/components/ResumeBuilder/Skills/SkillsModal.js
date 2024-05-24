import React, { useEffect, useState } from 'react';
import { SKILLS_INFORMATION_STATISTICS } from '@/utils';
import { useQueryClient } from 'react-query';
import { useUpdateData } from '@/hooks/useUpdateData';
import DynamicModal from '../../Common/DynamicModal';
const { ADD_SKILL } = SKILLS_INFORMATION_STATISTICS;

export default function SkillsModal({ title }) {
  const queryClient = useQueryClient();
  const skills = queryClient.getQueryData('skills') || [];
  const { mutate: setSkills } = useUpdateData();
  const [state, setState] = useState([...skills]);

  useEffect(() => setState([...skills]), [skills]);

  const skillsFields = [
    {
      ...ADD_SKILL,
      value: '',
      setValue: newSkill => setState(prevState => [...prevState, newSkill]),
    },
  ];

  const onSubmit = () =>
    setSkills({ targetDataName: 'skills', updatedData: [...state] });

  return (
    <DynamicModal
      title={title}
      fields={skillsFields}
      items={state.map(item => ({
        name: item,
        removeItem: id => {
          setState(prevState =>
            prevState.filter((currentItem, index) => index !== id)
          );
        },
      }))}
      onSubmit={onSubmit}
    />
  );
}
