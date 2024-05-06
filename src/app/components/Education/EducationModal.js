import React, { useState } from 'react';
import { useEducation } from '@/store/useEducation';
import DynamicModal from '../customs/DynamicModal';

function EducationModal() {
  const { colleges, setColleges } = useEducation(state => state);

  const [state, setState] = useState({
    listOfEducation: [...colleges],
    pageNumber: 0,
  });

  const handleSelectPage = val => {
    if (val == 'new') {
      setState(prevState => ({
        ...prevState,
        listOfEducation: [
          ...prevState.listOfEducation,
          {
            nameOfCollege: '',
            arrivalDate: '',
            departureDate: '',
            field: '',
            major: '',
            minor: '',
            grade: '',
            skills: [],
          },
        ],
        pageNumber: prevState.listOfEducation.length,
      }));
      return;
    }
    setState(prevState => ({ ...prevState, pageNumber: val }));
  };
  const handleRemovePage = () => {
    if (state.listOfEducation.length == 1) {
      return;
    }
    setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        listOfEducation: [
          ...prevState.listOfEducation.filter(
            (item, index) => index !== state.pageNumber
          ),
        ],
        pageNumber: 0,
      }));
    }, 0);
  };

  const handleSetSkills = skillsString => {
    const trimmedString = skillsString.split(',');

    setState(prevState => {
      const updatedListOfEducation = [...prevState.listOfEducation];
      updatedListOfEducation[state.pageNumber] = {
        ...updatedListOfEducation[state.pageNumber],
        skills: trimmedString,
      };
      return {
        ...prevState,
        listOfEducation: updatedListOfEducation,
      };
    });
  };

  const educationFields = [
    {
      title: 'Select Page',
      value: {
        pageNumber: state.pageNumber,
        lengthOfPages: state.listOfEducation.length,
      },
      setValue: handleSelectPage,
      type: 'select_page',
      placeholder: 'Select Page',
    },
    {
      title: 'Remove',
      value: state.listOfEducation.length,
      setValue: handleRemovePage,
      type: 'button',
      placeholder: 'Remove Page',
    },
    {
      title: 'Field',
      value: state.listOfEducation[state.pageNumber].field,
      setValue: field =>
        setState(prevState => {
          const updatedListOfEducation = [...prevState.listOfEducation];
          updatedListOfEducation[state.pageNumber] = {
            ...updatedListOfEducation[state.pageNumber],
            field,
          };
          return {
            ...prevState,
            listOfEducation: updatedListOfEducation,
          };
        }),
      type: 'text',
      placeholder: 'Field',
    },
    {
      title: 'Name of College',
      value: state.listOfEducation[state.pageNumber].nameOfCollege,
      setValue: nameOfCollege =>
        setState(prevState => {
          const updatedListOfEducation = [...prevState.listOfEducation];
          updatedListOfEducation[state.pageNumber] = {
            ...updatedListOfEducation[state.pageNumber],
            nameOfCollege,
          };
          return {
            ...prevState,
            listOfEducation: updatedListOfEducation,
          };
        }),
      type: 'text',
      placeholder: 'Name Of College',
    },
    {
      title: 'Arrival Date',
      value: state.listOfEducation[state.pageNumber].arrivalDate,
      setValue: arrivalDate =>
        setState(prevState => {
          const updatedListOfEducation = [...prevState.listOfEducation];
          updatedListOfEducation[state.pageNumber] = {
            ...updatedListOfEducation[state.pageNumber],
            arrivalDate,
          };
          return {
            ...prevState,
            listOfEducation: updatedListOfEducation,
          };
        }),
      type: 'text',
      placeholder: 'Arrival',
    },
    {
      title: 'Departure Date',
      value: state.listOfEducation[state.pageNumber].departureDate,
      setValue: departureDate =>
        setState(prevState => {
          const updatedListOfEducation = [...prevState.listOfEducation];
          updatedListOfEducation[state.pageNumber] = {
            ...updatedListOfEducation[state.pageNumber],
            departureDate,
          };
          return {
            ...prevState,
            listOfEducation: updatedListOfEducation,
          };
        }),
      type: 'text',
      placeholder: 'Departure',
    },
    {
      title: 'Major',
      value: state.listOfEducation[state.pageNumber].major,
      setValue: major =>
        setState(prevState => {
          const updatedListOfEducation = [...prevState.listOfEducation];
          updatedListOfEducation[state.pageNumber] = {
            ...updatedListOfEducation[state.pageNumber],
            major,
          };
          return {
            ...prevState,
            listOfEducation: updatedListOfEducation,
          };
        }),
      type: 'text',
      placeholder: 'Major',
    },
    {
      title: 'Minor',
      value: state.listOfEducation[state.pageNumber].minor,
      setValue: minor =>
        setState(prevState => {
          const updatedListOfEducation = [...prevState.listOfEducation];
          updatedListOfEducation[state.pageNumber] = {
            ...updatedListOfEducation[state.pageNumber],
            minor,
          };
          return {
            ...prevState,
            listOfEducation: updatedListOfEducation,
          };
        }),
      type: 'text',
      placeholder: 'Minor',
    },
    {
      title: 'Grade',
      value: state.listOfEducation[state.pageNumber].grade,
      setValue: grade =>
        setState(prevState => {
          const updatedListOfEducation = [...prevState.listOfEducation];
          updatedListOfEducation[state.pageNumber] = {
            ...updatedListOfEducation[state.pageNumber],
            grade,
          };
          return {
            ...prevState,
            listOfEducation: updatedListOfEducation,
          };
        }),
      type: 'text',
      placeholder: 'Grade',
    },
    {
      title: 'Skills',
      value: state.listOfEducation[state.pageNumber].skills,
      setValue: handleSetSkills,
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
