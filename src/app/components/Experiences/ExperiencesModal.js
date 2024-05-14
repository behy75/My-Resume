import React, { useEffect, useState } from 'react';
import DynamicModal from '../Common/DynamicModal';
import {
  handleRemovePage,
  handleSelectPage,
  handleSetValue,
} from './ExperiencesActions';
import { EXPERIENCES_STATISTICS } from '@/app/utils';
import { useUpdateData } from '@/app/hooks/useUpdateData';
import { useQueryClient } from 'react-query';
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

export default function ExperiencesModal({ title }) {
  const { mutate: setExperiences } = useUpdateData();
  const queryClient = useQueryClient();
  const experiences = queryClient.getQueryData('experiences') || [];

  useEffect(
    () =>
      setState(prevState => ({
        ...prevState,
        listOfExperiences: [...experiences],
      })),
    [experiences]
  );

  const [state, setState] = useState({
    listOfExperiences: [...experiences],
    pageNumber: 0,
  });

  const experiencesFields = [
    {
      ...SELECT_PAGE,
      value: {
        pageNumber: state.pageNumber,
        lengthOfPages: state.listOfExperiences?.length,
      },
      setValue: val => handleSelectPage(val, setState),
    },
    {
      ...REMOVE_PAGE,
      value: state.listOfExperiences?.length,
      setValue: () => handleRemovePage(state, setState),
    },
    {
      ...ROLE,
      value: state.listOfExperiences[state.pageNumber]?.role,
      setValue: role => handleSetValue('role', role, setState),
    },
    {
      ...WEBSITE_URL,
      value: state.listOfExperiences[state.pageNumber]?.websiteURL,
      setValue: websiteURL =>
        handleSetValue('websiteURL', websiteURL, setState),
    },
    {
      ...ARRIVAL_DATE,
      value: state.listOfExperiences[state.pageNumber]?.arrivalDate,
      setValue: arrivalDate =>
        handleSetValue('arrivalDate', arrivalDate, setState),
    },
    {
      ...DEPARTURE_DATE,
      value: state.listOfExperiences[state.pageNumber]?.departureDate,
      setValue: departureDate =>
        handleSetValue('departureDate', departureDate, setState),
    },
    {
      ...NAME_OF_COMPANY,
      value: state.listOfExperiences[state.pageNumber]?.nameOfCompany,
      setValue: nameOfCompany =>
        handleSetValue('nameOfCompany', nameOfCompany, setState),
    },
    {
      ...ACTIVITIES,
      value: state.listOfExperiences[state.pageNumber]?.activities.join('\n'),
      setValue: activities =>
        handleSetValue('activities', activities, setState),
    },
  ];

  const onSubmit = () =>
    setExperiences({
      targetDataName: 'experiences',
      updatedData: [...state.listOfExperiences],
    });

  return (
    <DynamicModal
      title={title}
      fields={experiencesFields}
      onSubmit={onSubmit}
    />
  );
}
