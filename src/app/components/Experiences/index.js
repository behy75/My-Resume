import React from 'react';
import { usePrintModeStore } from '@/store';
import { useExperience } from '@/store/useExperience';
import Experience from './Experience';
import ExperiencesModal from './ExperiencesModal';

export default function Experiences() {
  const { isPrintMode } = usePrintModeStore(state => state);
  const { experiences } = useExperience(state => state);
  return (
    <section className="relative pb-2 pb-4 mt-4 border-b-4 border-gray-300 first:mt-0">
      {!isPrintMode && <ExperiencesModal title="Experiences" />}

      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <h2 className="mb-2 text-xl font-black tracking-widest text-gray-800 print:font-normal">
          EXPERIENCE
        </h2>
        {/* Jobs */}
        {experiences.map(experience => (
          <>
            <Experience
              role={experience.role}
              websiteURL={experience.websiteURL}
              arrivalDate={experience.arrivalDate}
              departureDate={experience.departureDate}
              nameOfCompany={experience.nameOfCompany}
              activities={experience.activities}
            />
          </>
        ))}
      </section>
    </section>
  );
}
