import React, { useState } from 'react';
import { useExperience } from '@/store/useExperience';
import DynamicModal from '../customs/DynamicModal';
import {
  handleRemovePage,
  handleSelectPage,
  handleSetValue,
} from './ExperiencesActions';

export default function ExperiencesModal() {
  const { experiences, setExperiences } = useExperience(state => state);
  const [state, setState] = useState({
    listOfExperiences: [...experiences],
    pageNumber: 0,
  });

  const experiencesFields = [
    {
      title: 'Select Page',
      value: {
        pageNumber: state.pageNumber,
        lengthOfPages: state.listOfExperiences.length,
      },
      setValue: val => handleSelectPage(val, setState),
      type: 'select_page',
      placeholder: 'Select Page',
    },
    {
      title: 'Remove',
      value: state.listOfExperiences.length,
      setValue: () => handleRemovePage(state, setState),
      type: 'button',
      placeholder: 'Remove Page',
    },
    {
      title: 'Role',
      value: state.listOfExperiences[state.pageNumber].role,
      setValue: role => handleSetValue('role', role, setState),
      type: 'text',
      placeholder: 'Role',
    },
    {
      title: 'Website URL',
      value: state.listOfExperiences[state.pageNumber].websiteURL,
      setValue: websiteURL =>
        handleSetValue('websiteURL', websiteURL, setState),
      type: 'text',
      placeholder: 'Website URL',
    },
    {
      title: 'Arrival Date',
      value: state.listOfExperiences[state.pageNumber].arrivalDate,
      setValue: arrivalDate =>
        handleSetValue('arrivalDate', arrivalDate, setState),
      type: 'text',
      placeholder: 'Arrival',
    },
    {
      title: 'Departure Date',
      value: state.listOfExperiences[state.pageNumber].departureDate,
      setValue: departureDate =>
        handleSetValue('departureDate', departureDate, setState),
      type: 'text',
      placeholder: 'Departure',
    },
    {
      title: 'Name of Company',
      value: state.listOfExperiences[state.pageNumber].nameOfCompany,
      setValue: nameOfCompany =>
        handleSetValue('nameOfCompany', nameOfCompany, setState),
      type: 'text',
      placeholder: 'Name of Company',
    },
    {
      title: 'Activities',
      value: state.listOfExperiences[state.pageNumber].activities.join("\n\n"),
      setValue: activities => handleSetValue('activities', activities, setState),
      type: 'text_area',
      placeholder: 'Activities',
    },
  ];

  const onSubmit = () => {
    setExperiences([...state.listOfExperiences]);
  };

  return (
    <DynamicModal
      title="Experiences Information"
      fields={experiencesFields}
      onSubmit={onSubmit}
    />
  );
}
