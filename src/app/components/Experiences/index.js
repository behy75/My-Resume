import React, { useMemo } from 'react';
import { usePrintModeStore } from '@/store';
import Experience from './Experience';
import ExperiencesModal from './ExperiencesModal';
import { useFetchData } from '@/app/hooks/useFetchData';
import LoadingAndError from '../Common/LoadingAndError';

function DisplaySection({ experiences, isLoading, error, isError }) {
  if (isLoading) {
    return <LoadingAndError title="Experiences" isError={false} />;
  }

  if (isError) {
    return <LoadingAndError title={error.message} isError={isError} />;
  }

  return (
    <section className="break-inside-avoid">
      <h2 className="mb-2 text-xl font-black tracking-widest text-gray-800 print:font-normal">
        EXPERIENCE
      </h2>
      {/* Jobs */}
      {experiences.map((experience, index) => (
        <div key={index}>
          <Experience
            role={experience.role}
            websiteURL={experience.websiteURL}
            arrivalDate={experience.arrivalDate}
            departureDate={experience.departureDate}
            nameOfCompany={experience.nameOfCompany}
            activities={experience.activities}
          />
        </div>
      ))}
    </section>
  );
}

export default function Experiences() {
  const {
    data: experiences = [],
    isLoading,
    error,
    isError,
    isFetching,
    refetch,
  } = useFetchData('experiences');
  const { isPrintMode } = usePrintModeStore(state => state);

  const showExperiencesModal = useMemo(() => {
    return !isError && !isLoading && !isPrintMode;
  }, [experiences, isPrintMode]);

  return (
    <section className="relative pb-2 pb-4 mt-4 border-b-4 border-gray-300 first:mt-0">
      {showExperiencesModal && (
        <ExperiencesModal title="Experiences Information" />
      )}

      {/* To keep in the same column */}
      <DisplaySection
        experiences={experiences}
        isLoading={isLoading}
        error={error}
        isError={isError}
      />
    </section>
  );
}
