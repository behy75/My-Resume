import React, { useMemo } from 'react';
import { usePrintModeStore } from '@/store';
import School from './School';
import EducationModal from './EducationModal';
import { useFetchData } from '@/hooks/useFetchData';
import LoadingAndError from '../../Common/LoadingAndError';

function DisplaySection({ colleges, isLoading, error, isError }) {
  if (isLoading) {
    return <LoadingAndError title="Colleges" isError={false} />;
  }

  if (isError) {
    return <LoadingAndError title={error.message} isError={isError} />;
  }

  return (
    <>
      {colleges.map((college, index) => (
        <div key={index}>
          <School
            nameOfCollege={college.nameOfCollege}
            arrivalDate={college.arrivalDate}
            departureDate={college.departureDate}
            field={college.field}
            grade={college.grade}
            major={college.major}
            minor={college.minor}
            skills={college.skills}
          />
        </div>
      ))}
    </>
  );
}

export default function Education() {
  const {
    data: colleges = [],
    isLoading,
    error,
    isError,
    isFetching,
    refetch,
  } = useFetchData('colleges');
  const { isPrintMode } = usePrintModeStore(state => state);

  const showEducationModal = useMemo(() => {
    return !isError && !isLoading && !isPrintMode;
  }, [colleges, isPrintMode]);

  return (
    <section className="relative pb-0 mt-2 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
      {showEducationModal && <EducationModal title="Education Information" />}
      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
          EDUCATION
        </h2>
        <DisplaySection
          colleges={colleges}
          isLoading={isLoading}
          error={error}
          isError={isError}
        />
      </section>
    </section>
  );
}
