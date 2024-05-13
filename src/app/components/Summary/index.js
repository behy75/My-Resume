import React, { useEffect, useMemo } from 'react';
import Typical from 'react-typical';
import { usePrintModeStore, useShowFullSummary } from '@/store';
import CheckBox from '../Common/CheckBox';
import SummaryModal from './SummaryModal';
import { useFetchData } from '@/app/hooks/useFetchData';
import LoadingAndError from '../Common/LoadingAndError';

function modifySummary(summary) {
  const summaryArray = summary.split(/[,.]/);
  var newArray = [];

  for (var i = 0; i < summaryArray.length; i++) {
    newArray.push(summaryArray[i]);
    newArray.push(1000);
  }

  return newArray;
}

function DisPlaySection({
  summary,
  isPrintMode,
  showFullSummary,
  isLoading,
  error,
  isError,
}) {
  const newArray = modifySummary(summary);

  if (isLoading) {
    return <LoadingAndError title="Summary" isError={false} />;
  }

  if (isError) {
    return <LoadingAndError title={error.message} isError={isError} />;
  }

  return (
    <section className="mb-2 break-inside-avoid">
      <p className="mt-2 leading-normal text-gray-700 text-md text-justify">
        {!isPrintMode && !showFullSummary ? (
          <Typical steps={newArray} loop={Infinity} wrapper="a" />
        ) : (
          summary
        )}
      </p>
    </section>
  );
}

export default function Summary() {
  const { isPrintMode } = usePrintModeStore(state => state);
  const { showFullSummary, setShowFullSummary } = useShowFullSummary(
    state => state
  );
  const {
    data: summary = '',
    isLoading,
    error,
    isError,
    isFetching,
    refetch,
  } = useFetchData('summary');

  const showSummary = useMemo(() => {
    return !!summary && !isPrintMode;
  }, [summary, isPrintMode]);

  useEffect(() => {
    setShowFullSummary(true);
    setTimeout(() => setShowFullSummary(false));
  }, [summary]);

  return (
    <section className="relative pb-2 pb-4 mt-0 border-b-4 border-gray-300 first:mt-0">
      {showSummary && <SummaryModal title="Summary" />}
      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-bold tracking-widest text-gray-700 print:font-normal">
            SUMMARY
          </h2>
          {showSummary && (
            <div className="pl-8">
              <CheckBox
                title="Full Text"
                value={showFullSummary}
                setValue={setShowFullSummary}
              />
            </div>
          )}
        </div>

        <DisPlaySection
          summary={summary}
          isPrintMode={isPrintMode}
          showFullSummary={showFullSummary}
          isLoading={isLoading}
          error={error}
          isError={isError}
        />
      </section>
    </section>
  );
}
