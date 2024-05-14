import React, { useEffect, useState } from 'react';
import {
  handleRemovePage,
  handleSelectPage,
  handleSetValue,
} from './EducationActions';
import { EDUCATION_STATISTICS } from '@/app/utils';
import { useQueryClient } from 'react-query';
import { useUpdateData } from '@/app/hooks/useUpdateData';
import DynamicModal from '../../Common/DynamicModal';
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

function EducationModal({ title }) {
  const { mutate: setColleges } = useUpdateData();
  const queryClient = useQueryClient();
  const colleges = queryClient.getQueryData('colleges') || [];

  const [state, setState] = useState({
    listOfColleges: [...colleges],
    pageNumber: 0,
  });

  const educationFields = [
    {
      ...SELECT_PAGE,
      value: {
        pageNumber: state.pageNumber,
        lengthOfPages: state.listOfColleges.length,
      },
      setValue: val => handleSelectPage(val, setState),
    },
    {
      ...REMOVE_PAGE,
      value: state.listOfColleges.length,
      setValue: () => handleRemovePage(state, setState),
    },
    {
      ...FIELD,
      value: state.listOfColleges[state.pageNumber].field,
      setValue: field => handleSetValue('field', field, setState),
    },
    {
      ...NAME_OF_COLLEGE,
      value: state.listOfColleges[state.pageNumber].nameOfCollege,
      setValue: nameOfCollege =>
        handleSetValue('nameOfCollege', nameOfCollege, setState),
    },
    {
      ...ARRIVAL_DATE,
      value: state.listOfColleges[state.pageNumber].arrivalDate,
      setValue: arrivalDate =>
        handleSetValue('arrivalDate', arrivalDate, setState),
    },
    {
      ...DEPARTURE_DATE,
      value: state.listOfColleges[state.pageNumber].departureDate,
      setValue: departureDate =>
        handleSetValue('departureDate', departureDate, setState),
    },
    {
      ...MAJOR,
      value: state.listOfColleges[state.pageNumber].major,
      setValue: major => handleSetValue('major', major, setState),
    },
    {
      ...MINOR,
      value: state.listOfColleges[state.pageNumber].minor,
      setValue: minor => handleSetValue('minor', minor, setState),
    },
    {
      ...GRADE,
      value: state.listOfColleges[state.pageNumber].grade,
      setValue: grade => handleSetValue('grade', grade, setState),
    },
    {
      ...SKILLS,
      value: state.listOfColleges[state.pageNumber].skills,
      setValue: skills => handleSetValue('skills', skills, setState),
    },
  ];

  const onSubmit = () =>
    setColleges({
      targetDataName: 'colleges',
      updatedData: [...state.listOfColleges],
    });

  useEffect(
    () =>
      setState(prevState => ({
        ...prevState,
        listOfColleges: [...colleges],
      })),
    [colleges]
  );

  return (
    <DynamicModal title={title} fields={educationFields} onSubmit={onSubmit} />
  );
}

export default EducationModal;
