import React, { useEffect, useRef, useState } from 'react';

export default function TextInputForSkill(props) {
  const inputRef = useRef(null);
  const { title, placeholder, value, setValue } = props;
  const [skill, setSkill] = useState('');

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = () => {
    if (!!skill) {
      setValue(skill);
      setSkill('');
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="absolute left-5 bottom-5 flex">
      <input
        ref={inputRef}
        autoFocus
        type="text"
        value={skill}
        onChange={event => setSkill(event.target.value)}
        id={title.replace(/[A-Z]/g, match => '_' + match.toLowerCase())}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleClick}
        data-modal-hide="default-modal"
        type="button"
        className={`ml-3 w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-20`}
      >
        {title}
      </button>
    </div>
  );
}
