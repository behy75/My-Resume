import React from 'react';

export default function School(props) {
  const {
    nameOfCollege,
    arrivalDate,
    departureDate,
    field,
    major,
    minor,
    grade,
    skills,
  } = props;

  return (
    <section className="mt-2 border-b-2 break-inside-avoid">
      <header>
        <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
          {nameOfCollege}
        </h3>
        <p className="leading-normal text-gray-500 text-md">
          {arrivalDate} - {departureDate} | {field}
        </p>
      </header>
      <ul className="mt-2 list-disc list-inside text-gray-800 text-md">
        <li>
          <span className="font-semibold text-md">Major: </span>
          {major}
        </li>
        <li>
          <span className="font-semibold text-md">Minor: </span>
          {minor}
        </li>
        {grade && (
          <li>
            <span className="font-semibold text-md">GPA:</span>
            {grade}
          </li>
        )}
        <li>
          <span className="font-semibold text-md">Skills: </span>
          {skills.map((skill, skillIndex) => (
            <div key={skillIndex}>
              {skill}
              {skills.length > skillIndex + 1 ? ', ' : '.'}
            </div>
          ))}
        </li>
      </ul>
    </section>
  );
}
