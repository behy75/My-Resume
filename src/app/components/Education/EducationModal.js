import React, { useState } from 'react';
import { useEducation } from '@/store/useEducation';
import DynamicModal from '../customs/DynamicModal';
import {
  handleRemovePage,
  handleSelectPage,
  handleSetValue,
} from './EducationActions';
import { EDUCATION_STATISTICS } from '@/app/utils';
const {
  SELECT_PAGE,
  REMOVE_PAGE,
  FIELD,
  NAME_OF_COLLEGE,
  ARRIVAL_DATE,
  DEPARTURE_DATE,
  MAJOR,
  MINOR,
  GRADE,
  SKILLS,
} = EDUCATION_STATISTICS;

function EducationModal() {
  const { colleges, setColleges } = useEducation(state => state);

  const [state, setState] = useState({
    listOfEducation: [...colleges],
    pageNumber: 0,
  });

  const educationFields = [
    {
      ...SELECT_PAGE,
      value: {
        pageNumber: state.pageNumber,
        lengthOfPages: state.listOfEducation.length,
      },
      setValue: val => handleSelectPage(val, setState),
    },
    {
      ...REMOVE_PAGE,
      value: state.listOfEducation.length,
      setValue: () => handleRemovePage(state, setState),
    },
    {
      ...FIELD,
      value: state.listOfEducation[state.pageNumber].field,
      setValue: field => handleSetValue('field', field, setState),
    },
    {
      ...NAME_OF_COLLEGE,
      value: state.listOfEducation[state.pageNumber].nameOfCollege,
      setValue: nameOfCollege =>
        handleSetValue('nameOfCollege', nameOfCollege, setState),
    },
    {
      ...ARRIVAL_DATE,
      value: state.listOfEducation[state.pageNumber].arrivalDate,
      setValue: arrivalDate =>
        handleSetValue('arrivalDate', arrivalDate, setState),
    },
    {
      ...DEPARTURE_DATE,
      value: state.listOfEducation[state.pageNumber].departureDate,
      setValue: departureDate =>
        handleSetValue('departureDate', departureDate, setState),
    },
    {
      ...MAJOR,
      value: state.listOfEducation[state.pageNumber].major,
      setValue: major => handleSetValue('major', major, setState),
    },
    {
      ...MINOR,
      value: state.listOfEducation[state.pageNumber].minor,
      setValue: minor => handleSetValue('minor', minor, setState),
    },
    {
      ...GRADE,
      value: state.listOfEducation[state.pageNumber].grade,
      setValue: grade => handleSetValue('grade', grade, setState),
    },
    {
      ...SKILLS,
      value: state.listOfEducation[state.pageNumber].skills,
      setValue: skills => handleSetValue('skills', skills, setState),
    },
  ];

  const onSubmit = () => setColleges([...state.listOfEducation]);

  return (
    <DynamicModal
      title="Education Information"
      fields={educationFields}
      onSubmit={onSubmit}
    />
  );
}

export default EducationModal;
