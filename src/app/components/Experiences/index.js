import React from 'react';
import Experience from './Experience';
import IndividualProfile from '../../Individual_profile.json';
const { experiences } = IndividualProfile;

export default function Experiences() {
  return (
    <section className="pb-2 pb-4 mt-4 border-b-4 border-gray-300 first:mt-0">
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
              link={experience.link}
              from={experience.from}
              to={experience.to}
              nameOfCompany={experience.nameOfCompany}
              toDoList={experience.toDoList}
            />
          </>
        ))}
      </section>
    </section>
  );
}
