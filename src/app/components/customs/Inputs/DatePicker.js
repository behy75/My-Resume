import React, { useEffect, useState } from 'react';

const formattedDateFunc = (month, year) =>
  `${year}-${month.toString().padStart(2, '0')}`;

const currentFormattedDate = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  return formattedDateFunc(currentMonth, currentYear);
};

export default function DatePicker(props) {
  const { title, placeholder, value, setValue } = props;
  const [time, setTime] = useState(null);

  const handleSelectDate = event => {
    const inputValue = event.target.value;
    const formattedDate = new Date(inputValue).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    setTime(inputValue);
    if (currentFormattedDate() == formattedDate) {
      setValue('Present');
    } else {
      setValue(formattedDate);
    }
  };

  useEffect(() => {
    if (value == 'Present') {
      setTime(currentFormattedDate());
      return;
    }
    const dateParts = value.split(' ');
    const year = dateParts[1];
    const month =
      new Date(Date.parse(dateParts[0] + ' 1, 2000')).getMonth() + 1;
    const formattedDate = formattedDateFunc(month, year);

    setTime(formattedDate);
  }, [value]);

  return (
    <div>
      <label
        for={title.replace(/[A-Z]/g, match => '_' + match.toLowerCase())}
        className="block mb-2 text-sm font-medium text-white"
      >
        {title}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          datepicker
          datepicker-autohide
          type="month"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="YYYY-MM"
          value={time}
          onChange={handleSelectDate}
        />
      </div>
    </div>
  );
}
