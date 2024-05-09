import React from 'react';

export default function Textarea(props) {
  const { title, value, setValue } = props;

  return (
    <div className="col-span-2">
      <label for={title} className="block mb-2 text-sm font-medium text-white">
        {title}
      </label>
      <textarea
        id={title}
        value={value}
        onChange={event => setValue(event.target.value)}
        rows="4"
        className="block p-2.5 w-full h-40 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}
