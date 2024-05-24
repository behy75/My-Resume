import React from 'react';

export default function LoadingAndError({ title, isError }) {
  return (
    <section className="mb-2 break-inside-avoid">
      <p
        className={`mt-2 leading-normal text-md text-justify ${
          isError ? 'text-red-700' : 'text-gray-700'
        }`}
      >
        {isError ? `${title}` : `${title} Is Loading ...`}
      </p>
    </section>
  );
}
