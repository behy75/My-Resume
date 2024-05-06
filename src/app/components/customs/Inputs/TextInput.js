import React from 'react';

export default function TextInput(props) {
  const { title, placeholder, value, setValue } = props;

  return (
    <div>
      <label
        for={title.replace(/[A-Z]/g, match => '_' + match.toLowerCase())}
        class="block mb-2 text-sm font-medium text-white"
      >
        {title}
      </label>
      <input
        type="text"
        value={value}
        onChange={event => setValue(event.target.value)}
        id={title.replace(/[A-Z]/g, match => '_' + match.toLowerCase())}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
