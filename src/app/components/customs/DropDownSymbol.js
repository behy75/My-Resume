import React from 'react';

export default function DropDownSymbol(props) {
  const { open, setOpen } = props;
  const handleSetOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="cursor" onClick={handleSetOpen}>
      <svg
        class="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
        transform={open && 'rotate(180)'}
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </div>
  );
}