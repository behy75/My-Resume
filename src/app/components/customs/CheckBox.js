import React from 'react';

export default function CheckBox(props) {
  const { title, value, setValue } = props;
  return (
    <div className="flex items-center">
      <input
        id="link-checkbox"
        type="checkbox"
        value={value}
        onChange={event => setValue(event.target.checked)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for="link-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {title}
      </label>
    </div>
  );
}
