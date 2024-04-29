import React, { useState } from 'react';
import AnimatedCursor from 'react-animated-cursor';
import IndividualProfile from '../../Individual_profile.json';
const personalDetails = IndividualProfile.personal_details;

export default function Header() {
  const { name, role, address, stack } = personalDetails;
  const stackArray = stack.split(' ');
  const [shouldShowCursor, setShouldShowCursor] = useState(true);
  const handleShouldShowCursor = showCursor => {
    setShouldShowCursor(showCursor);
  };

  return (
    <header className="inline-flex justify-between items-baseline mb-2 w-full align-top border-b-4 border-gray-300">
      {shouldShowCursor && (
        <AnimatedCursor
          innerSize={8}
          outerSize={8}
          color="193, 11, 111"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={10}
          clickables={[
            'h1',
            {
              target: '.custom',
              options: {
                innerSize: 12,
                outerSize: 12,
                color: '255, 255, 255',
                outerAlpha: 0.3,
                innerScale: 0.7,
                outerScale: 5,
              },
            },
          ]}
        />
      )}
      <section className="block">
        <h1
          // onMouseEnter={() => setShouldShowCursor(true)}
          // onMouseOut={() => setShouldShowCursor(false)}
          className="mb-0 text-5xl font-bold text-gray-600 hover:text-gray-700"
        >
          {name}
        </h1>
        {/* Job Title */}
        <h2 className="m-0 text-2xl font-semibold text-gray-700 leading-snugish">
          {role}
        </h2>
        {/* Location */}
        <h3 className="m-0 mt-2 text-xl font-semibold text-gray-500 leading-snugish">
          {address}
        </h3>
      </section>
      {/* Initials Block */}
      <section
        className="justify-between px-3 mt-0 mb-5 text-4xl font-black leading-none text-white bg-gray-700 initials-container print:bg-black"
        style={{ paddingBottom: '1.5rem', paddingTop: '1.5rem' }}
      >
        {stackArray.map((stackArr, index) => (
          <section key={index} className="text-center initial">
            {stackArr}
          </section>
        ))}
      </section>
    </header>
  );
}
