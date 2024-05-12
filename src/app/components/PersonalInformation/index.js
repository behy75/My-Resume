import React from 'react';
import { motion } from 'framer-motion';
import PersonalInformationModal from './PersonalInformationModal';
import { usePersonalInformation } from '@/store/usePersonalInformation';
import { usePrintModeStore } from '@/store';

export default function PersonalInformation() {
  const { isPrintMode } = usePrintModeStore(state => state);
  const { firstName, lastName, position, address, stack } =
    usePersonalInformation(state => state);
  const stackArray = stack.split(' ');

  return (
    <header className="relative inline-flex justify-between items-baseline mb-2 w-full align-top border-b-4 border-gray-300">
      {!isPrintMode && (
        <PersonalInformationModal title="Personal Information" />
      )}
      <section className="block">
        <h1
          // onMouseEnter={() => setShouldShowCursor(true)}
          // onMouseOut={() => setShouldShowCursor(false)}
          className="mb-0 text-3xl sm:text-5xl font-bold text-gray-600 hover:text-gray-700"
        >
          {firstName} {lastName}
        </h1>
        {/* Job Title */}
        <h2 className="m-0 text-lg sm:text-2xl font-semibold text-gray-700 leading-snugish">
          {position}
        </h2>
        {/* Location */}
        <h3 className="m-0 mt-2 text-md sm:text-xl font-semibold text-gray-500 leading-snugish">
          {address}
        </h3>
      </section>
      {/* Initials Block */}
      <motion.section
        drag
        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
        dragElastic={1}
        className="justify-between px-3 mt-0 mb-5 text-4xl font-black leading-none text-white bg-gray-700 initials-container print:bg-black z-100"
        style={{ paddingBottom: '1.5rem', paddingTop: '1.5rem' }}
      >
        {stackArray.map((stackArr, index) => (
          <section key={index} className="text-center initial">
            {stackArr}
          </section>
        ))}
      </motion.section>
    </header>
  );
}
