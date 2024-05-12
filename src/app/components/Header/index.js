import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { usePrintModeStore } from '@/store';
import { usePersonalInformation } from '@/store/usePersonalInformation';

export default function Header(props) {
  const { firstName } = usePersonalInformation(state => state);
  const { setIsPrintMode } = usePrintModeStore(state => state);
  const { containerRef } = props;

  const handleReactToPrint = useReactToPrint({
    content: () => containerRef?.current,
    documentTitle: firstName,
    copyStyles: true,
  });

  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      handleReactToPrint();
    }, 600);
    setTimeout(() => {
      setIsPrintMode(false);
    }, 700);
  };

  return (
    <div className="flex justify-center items-center my-5">
      <button
        type="button"
        onClick={handlePrint}
        className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Print
      </button>
    </div>
  );
}
