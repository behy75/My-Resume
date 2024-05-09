import React, { useState } from 'react';
import { useEducation } from '@/store/useEducation';
import DynamicModal from '../customs/DynamicModal';
import {
  handleRemovePage,
  handleSelectPage,
  handleSetValue,
} from './EducationActions';

function EducationModal() {
  const { colleges, setColleges } = useEducation(state => state);

  const [state, setState] = useState({
    listOfEducation: [...colleges],
    pageNumber: 0,
  });

  const educationFields = [
    {
      title: 'Select Page',
      value: {
        pageNumber: state.pageNumber,
        lengthOfPages: state.listOfEducation.length,
      },
      setValue: val => handleSelectPage(val, setState),
      type: 'select_page',
      placeholder: 'Select Page',
    },
    {
      title: 'Remove',
      value: state.listOfEducation.length,
      setValue: () => handleRemovePage(state, setState),
      type: 'button',
      placeholder: 'Remove Page',
    },
    {
      title: 'Field',
      value: state.listOfEducation[state.pageNumber].field,
      setValue: field => handleSetValue('field', field, setState),
      type: 'text',
      placeholder: 'Field',
    },
    {
      title: 'Name of College',
      value: state.listOfEducation[state.pageNumber].nameOfCollege,
      setValue: nameOfCollege =>
        handleSetValue('nameOfCollege', nameOfCollege, setState),
      type: 'text',
      placeholder: 'Name Of College',
    },
    {
      title: 'Arrival Date',
      value: state.listOfEducation[state.pageNumber].arrivalDate,
      setValue: arrivalDate =>
        handleSetValue('arrivalDate', arrivalDate, setState),
      type: 'text',
      placeholder: 'Arrival',
    },
    {
      title: 'Departure Date',
      value: state.listOfEducation[state.pageNumber].departureDate,
      setValue: departureDate =>
        handleSetValue('departureDate', departureDate, setState),
      type: 'text',
      placeholder: 'Departure',
    },
    {
      title: 'Major',
      value: state.listOfEducation[state.pageNumber].major,
      setValue: major => handleSetValue('major', major, setState),
      type: 'text',
      placeholder: 'Major',
    },
    {
      title: 'Minor',
      value: state.listOfEducation[state.pageNumber].minor,
      setValue: minor => handleSetValue('minor', minor, setState),
      type: 'text',
      placeholder: 'Minor',
    },
    {
      title: 'Grade',
      value: state.listOfEducation[state.pageNumber].grade,
      setValue: grade => handleSetValue('grade', grade, setState),
      type: 'text',
      placeholder: 'Grade',
    },
    {
      title: 'Skills',
      value: state.listOfEducation[state.pageNumber].skills,
      setValue: skills => handleSetValue('skills', skills, setState),
      type: 'text',
      placeholder: 'Skills',
    },
  ];

  const onSubmit = () => {
    setColleges([...state.listOfEducation]);
  };

  return (
    <DynamicModal
      title="Education Information"
      fields={educationFields}
      onSubmit={onSubmit}
    />
  );
}

export default EducationModal;
