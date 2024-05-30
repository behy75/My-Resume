import Loading from '@/components/Common/LoadingAndError/Loading';

export function convertEpochToFormattedDate(epoch) {
  const date = new Date(epoch);
  const options = { year: 'numeric', month: 'short' };
  return date.toLocaleString('en-US', options);
}

export function parseMonthYearToEpoch(dateStr) {
  // Split the input string by space to get month and year
  const [month, year] = dateStr.split(' ');
  // Create a new Date object with the first day of the given month and year
  const date = new Date(`${month} 1, ${year}`);
  // Convert the Date object to an epoch timestamp
  return date.getTime();
}

export const ConfirmationToast = ({
  message,
  onConfirm,
  onCancel,
  deleteCollegeIsLoading,
}) => (
  <div
    id="toast-interactive"
    className="w-full text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400"
    role="alert"
  >
    <div className="flex">
      <div className="ms-3 text-sm font-normal">
        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
          {message}
        </span>
        {/* <div className="mb-2 text-sm font-normal">
          A new software version is available for download.
        </div> */}
        <div className="flex">
          <div
            onClick={onCancel}
            style={{ margin: '6px' }}
            className="inline-flex justify-center w-full px-2 mx-1 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            {deleteCollegeIsLoading ? <Loading /> : 'Not now'}
          </div>
          <div
            onClick={onConfirm}
            style={{ backgroundColor: 'blue', margin: '6px' }}
            className="inline-flex justify-center w-full px-2 mx-1 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            {deleteCollegeIsLoading ? <Loading /> : 'Remove'}
          </div>
        </div>
      </div>
    </div>
  </div>
);
