import React, { useEffect } from 'react';
import Typical from 'react-typical';
import { usePrintModeStore, useShowFullSummary } from '@/store';
import CheckBox from '../customs/CheckBox';
import SummaryModal from './SummaryModal';

export default function Summary() {
  const { isPrintMode } = usePrintModeStore(state => state);
  const { showFullSummary, setShowFullSummary, summary } = useShowFullSummary(
    state => state
  );

  const summaryArray = summary.split(/[,.]/);
  var newArray = [];

  for (var i = 0; i < summaryArray.length; i++) {
    newArray.push(summaryArray[i]);
    newArray.push(1000);
  }

  useEffect(() => {
    setShowFullSummary(true);
    setTimeout(() => setShowFullSummary(false));
  }, [summary]);

  return (
    <section className="relative pb-2 pb-4 mt-0 border-b-4 border-gray-300 first:mt-0">
      {!isPrintMode && <SummaryModal title="Summary" />}
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
