import React, { useState } from 'react';
import { useSkills } from '@/store/useSkills';
import DynamicModal from '../customs/DynamicModal';

export default function SkillsModal() {
  const { skills, setSkills } = useSkills(state => state);

  const [state, setState] = useState([...skills]);

  const skillsFields = [
    {
      title: 'Add Skill',
      value: '',
      setValue: newSkill => setState(prevState => [...prevState, newSkill]),
      type: 'text_skill',
      placeholder: 'New Skill',
    },
  ];

  const onSubmit = event => {
    setSkills([...state]);
  };

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
