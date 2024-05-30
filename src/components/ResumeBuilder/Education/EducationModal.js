import React, { useEffect, useState } from 'react';
import {
  handleRemovePage,
  handleSelectPage,
  handleSetValue,
} from './EducationActions';
import { EDUCATION_STATISTICS } from '@/utils';
import { useQueryClient } from 'react-query';
import DynamicModal from '../../Common/DynamicModal';
import { useDeleteColleges, useUpdateColleges } from '@/hooks/useColleges';
import { notifyError, notifySuccess } from '@/components/Common/Notify';
import {
  convertEpochToFormattedDate,
  parseMonthYearToEpoch,
} from '@/utils/common';
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
  const queryClient = useQueryClient();
  const colleges = queryClient.getQueryData('colleges') || [];
  const {
    mutate: setColleges,
    data,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useUpdateColleges();
  const {
    mutate: deleteCollege,
    data: deleteCollegeData,
    isError: deleteCollegeIsError,
    error: deleteCollegeError,
    isLoading: deleteCollegeIsLoading,
    isSuccess: deleteCollegeIsSuccess,
  } = useDeleteColleges();
  const [state, setState] = useState({
    listOfColleges: [
      ...colleges.map(college => ({
        nameOfCollege: college.name_of_college,
        arrivalDate: convertEpochToFormattedDate(college.arrival_date),
        departureDate: convertEpochToFormattedDate(college.departure_date),
        field: college.field,
        major: college.major,
        minor: college.minor,
        grade: college.grade,
        skills: college.skills,
      })),
    ],
    pageNumber: 0,
  });
  const [closeModal, setCloseModal] = useState(false);

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
      setValue: () =>
        handleRemovePage(
          state,
          setState,
          deleteCollege,
          deleteCollegeData,
          deleteCollegeError,
          deleteCollegeIsLoading
        ),
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

  const onSuccess = () => {
    setCloseModal(true);
    notifySuccess(data?.message || 'Colleges successfully updated.');
    setTimeout(() => {
      setCloseModal(false);
    });
  };
  const onError = () => {
    notifyError(error?.message || 'Request failed.');
  };

  const onSubmit = () => {
    const collegesData = state.listOfColleges.map(college => ({
      college_id_for_user: college.collegeIdForUser,
      name_of_college: college.nameOfCollege,
      arrival_date: parseMonthYearToEpoch(college.arrivalDate),
      departure_date: parseMonthYearToEpoch(college.departureDate),
      field: college.field,
      major: college.major,
      minor: college.minor,
      grade: college.grade,
      skills: college.skills,
    }));

    const payload = { colleges: [...collegesData] };
    setColleges(payload, { onSuccess, onError });
  };

  useEffect(
    () =>
      setState(prevState => ({
        ...prevState,
        listOfColleges: [
          ...colleges.map(college => ({
            collegeIdForUser: college.id,
            nameOfCollege: college.name_of_college,
            arrivalDate: convertEpochToFormattedDate(college.arrival_date),
            departureDate: convertEpochToFormattedDate(college.departure_date),
            field: college.field,
            major: college.major,
            minor: college.minor,
            grade: college.grade,
            skills: college.skills,
          })),
        ],
      })),
    [colleges]
  );

  return (
    <DynamicModal
      title={title}
      fields={educationFields}
      onSubmit={onSubmit}
      isLoading={isLoading}
      closeModal={closeModal}
    />
  );
}

export default EducationModal;
