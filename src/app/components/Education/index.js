import React from 'react';
import { usePrintModeStore } from '@/store';
import { useEducation } from '@/store/useEducation';
import School from './School';
import EducationModal from './EducationModal';

export default function Education() {
  const { isPrintMode } = usePrintModeStore(state => state);
  const { colleges } = useEducation(state => state);

  return (
    <section className="relative pb-0 mt-2 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
      {!isPrintMode && <EducationModal title="Education Information" />}
      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
          EDUCATION
        </h2>
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
      </section>
    </section>
  );
}
