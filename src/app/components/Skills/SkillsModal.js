import React, { useState } from 'react';
import { useSkills } from '@/store/useSkills';
import DynamicModal from '../Common/DynamicModal';
import { SKILLS_INFORMATION_STATISTICS } from '@/app/utils';
const { ADD_SKILL } = SKILLS_INFORMATION_STATISTICS;

export default function SkillsModal() {
  const { skills, setSkills } = useSkills(state => state);

  const [state, setState] = useState([...skills]);

  const skillsFields = [
    {
      ...ADD_SKILL,
      value: '',
      setValue: newSkill => setState(prevState => [...prevState, newSkill]),
    },
  ];

  const onSubmit = () => setSkills([...state]);

  return (
    <DynamicModal
      title="Skills"
      fields={skillsFields}
      items={state.map(item => ({
        name: item,
        removeItem: id =>
          setState(preState =>
            preState.filter((preState, index) => index !== id)
          ),
      }))}
      onSubmit={onSubmit}
    />
  );
}
