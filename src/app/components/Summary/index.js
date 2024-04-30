import React from 'react';
import IndividualProfile from '../../Individual_profile.json';
import Typical from 'react-typical';
import { usePrintModeStore, useShowFullSummary } from '@/store';
import CheckBox from '../customs/CheckBox';
const { summary } = IndividualProfile;

export default function Summary() {
  const { isPrintMode } = usePrintModeStore(state => state);
  const { showFullSummary, setShowFullSummary } = useShowFullSummary(
    state => state
  );

  const summaryArray = summary.split(/[,.]/);
  var newArray = [];

  for (var i = 0; i < summaryArray.length; i++) {
    newArray.push(summaryArray[i]);
    if (i < summaryArray.length - 1) {
      newArray.push(1000);
    }
  }

  return (
    <section className="pb-2 pb-4 mt-0 border-b-4 border-gray-300 first:mt-0">
      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-bold tracking-widest text-gray-700 print:font-normal">
            SUMMARY
          </h2>
          <div className="pl-8">
            {!isPrintMode && (
              <CheckBox
                title="Full Text"
                value={showFullSummary}
                setValue={setShowFullSummary}
              />
            )}
          </div>
        </div>

        <section className="mb-2 break-inside-avoid">
          <p className="mt-2 leading-normal text-gray-700 text-md text-justify">
            {!isPrintMode && !showFullSummary ? (
              <Typical steps={newArray} loop={Infinity} wrapper="a" />
            ) : (
              summary
            )}
          </p>
        </section>
      </section>
    </section>
  );
}
