import React, { useState } from 'react';

export default function PasswordInput(props) {
  const { title, placeholder, value, setValue, isLoginPage = false } = props;
  const [password, setPassword] = useState(value);
  const handleChange = event => {
    setValue({ password: { link: event.target.value } });
    setPassword(event.target.value);
  };

  const validatePassword = password => {
    // You can define your password validation logic here
    return password.length >= 8; // Example: at least 8 characters
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
        type="password"
        value={password}
        onChange={handleChange}
        id={title.replace(/[A-Z]/g, match => '_' + match.toLowerCase())}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={isLoginPage}
      />
      {!validatePassword(password) && (
        <p className="text-sm text-red-500 mt-1">
          Please enter a password with at least 8 characters.
        </p>
      )}
    </div>
  );
}
