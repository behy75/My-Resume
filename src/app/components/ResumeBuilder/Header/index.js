import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { useQueryClient } from 'react-query';
import { usePrintModeStore } from '@/store';

export default function Header(props) {
  const queryClient = useQueryClient();
  const personalInformation = queryClient.getQueryData('personal_details');
  const { setIsPrintMode } = usePrintModeStore(state => state);
  const { containerRef } = props;

  const handleReactToPrint = useReactToPrint({
    content: () => containerRef?.current,
    documentTitle: personalInformation?.firstName || '',
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
