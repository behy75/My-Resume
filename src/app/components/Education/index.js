import React from 'react';
import IndividualProfile from '../../Individual_profile.json';
import School from './School';
const { education } = IndividualProfile;

export default function Education() {
  return (
    <section className="pb-0 mt-2 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
          EDUCATION
        </h2>
        {education.map((item, index) => (
          <>
            <School
              university={item.university}
              dates={item.dates}
              degree={item.degree}
              major={item.major}
              minor={item.minor}
              skills={item.skills}
            />
          </>
        ))}
      </section>
    </section>
  );
}
