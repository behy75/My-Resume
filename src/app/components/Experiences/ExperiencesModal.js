import React, { useState } from 'react';
import { useExperience } from '@/store/useExperience';
import DynamicModal from '../customs/DynamicModal';
import {
  handleRemovePage,
  handleSelectPage,
  handleSetValue,
} from './ExperiencesActions';
import { EXPERIENCES_STATISTICS } from '@/app/utils';
const {
  SELECT_PAGE,
  REMOVE_PAGE,
  ROLE,
  WEBSITE_URL,
  ARRIVAL_DATE,
  DEPARTURE_DATE,
  NAME_OF_COMPANY,
  ACTIVITIES,
} = EXPERIENCES_STATISTICS;

export default function ExperiencesModal() {
  const { experiences, setExperiences } = useExperience(state => state);
  const [state, setState] = useState({
    listOfExperiences: [...experiences],
    pageNumber: 0,
  });

  const experiencesFields = [
    {
      ...SELECT_PAGE,
      value: {
        pageNumber: state.pageNumber,
        lengthOfPages: state.listOfExperiences.length,
      },
      setValue: val => handleSelectPage(val, setState),
    },
    {
      ...REMOVE_PAGE,
      value: state.listOfExperiences.length,
      setValue: () => handleRemovePage(state, setState),
    },
    {
      ...ROLE,
      value: state.listOfExperiences[state.pageNumber].role,
      setValue: role => handleSetValue('role', role, setState),
    },
    {
      ...WEBSITE_URL,
      value: state.listOfExperiences[state.pageNumber].websiteURL,
      setValue: websiteURL =>
        handleSetValue('websiteURL', websiteURL, setState),
    },
    {
      ...ARRIVAL_DATE,
      value: state.listOfExperiences[state.pageNumber].arrivalDate,
      setValue: arrivalDate =>
        handleSetValue('arrivalDate', arrivalDate, setState),
    },
    {
      ...DEPARTURE_DATE,
      value: state.listOfExperiences[state.pageNumber].departureDate,
      setValue: departureDate =>
        handleSetValue('departureDate', departureDate, setState),
    },
    {
      ...NAME_OF_COMPANY,
      value: state.listOfExperiences[state.pageNumber].nameOfCompany,
      setValue: nameOfCompany =>
        handleSetValue('nameOfCompany', nameOfCompany, setState),
    },
    {
      ...ACTIVITIES,
      value: state.listOfExperiences[state.pageNumber].activities.join('\n'),
      setValue: activities =>
        handleSetValue('activities', activities, setState),
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
