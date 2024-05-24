import React, { useState } from 'react';
import { validateEmail } from './validateEmail';

export default function EmailInput(props) {
  const { title, placeholder, value, setValue, isLoginPage = false } = props;
  const [email, setEmail] = useState(value);
  const handleChange = event => {
    setValue({ email: { link: event.target.value } });
    setEmail(event.target.value);
  };

  return (
    <div>
      <label
        htmlFor={title.replace(/[A-Z]/g, match => '_' + match.toLowerCase())}
        className={`block mb-2 font-medium text-white ${
          isLoginPage ? 'text-lg' : 'text-sm'
        }`}
      >
        {title}
      </label>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        id={title.replace(/[A-Z]/g, match => '_' + match.toLowerCase())}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={isLoginPage}
      />
      {!validateEmail(email) && (
        <p className="text-sm text-red-500 mt-1">
          Please enter a valid email address.
        </p>
      )}
    </div>
  );
}
