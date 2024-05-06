import React from 'react';

function createArray(num) {
  return Array.from({ length: num }, (_, index) => index);
}

export default function SelectPageInput(props) {
  const { title, placeholder, value, setValue } = props;
  const items = createArray(value.lengthOfPages);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <select
      id="countries"
      className="absolute left-5 bottom-5 w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
      value={value.pageNumber} // Set the value of the select element
      onChange={handleChange} // Handle changes
    >
      {items.map(item => (
        <option className="p-2" key={item} value={item}>
          {item + 1}
        </option>
      ))}
      <option value="new" className="p-2">
        New
      </option>
    </select>
  );
}
