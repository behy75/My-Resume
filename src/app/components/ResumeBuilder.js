'use client';
import React, { useRef } from 'react';
import Header from './Header';
import ContactInformation from './ContactInformation';
import Summary from './Summary';
import Education from './Education';
import Experiences from './Experiences';
import Skills from './Skills';
import { useReactToPrint } from 'react-to-print';

import IndividualProfile from '../Individual_profile.json';
const personalDetails = IndividualProfile.personal_details;

export default function ResumeBuilder() {
  const containerRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => containerRef?.current,
    documentTitle: personalDetails.name,
    copyStyles: true,
  });

  return (
    <>
      <button
        type="button"
        onClick={handleReactToPrint}
        className="fixed top-28 left-1 lg:left-20 xl:left-60 2xl:left-72 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Print
      </button>

      <section
        ref={containerRef}
        className="p-3 my-auto mx-auto max-w-3xl bg-gray-100 rounded-2xl border-4 border-gray-700 sm:p-9 md:p-16 lg:mt-6 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:max-w-letter md:h-letter lg:h-letter"
      >
        {/* Name */}
        <Header />

        {/* Column */}
        <section className="col-gap-8 print:col-count-2 print:h-letter-col-full col-fill-balance md:col-count-2 md:h-letter-col-full">
          {/* Contact Information */}
          <ContactInformation />
          {/* Summary */}
          <Summary />
          {/* Education */}
          <Education />
          {/* Experience */}
          <Experiences />
          {/* Skills */}
          <Skills />
        </section>
      </section>
    </>
  );
}
