import React from 'react';
import Link from 'next/link';

export default function Experience(props) {
  const { role, link, from, to, nameOfCompany, toDoList = [] } = props;
  return (
    <section className="mb-6 break-inside-avoid">
      <header>
        <h3 className="font-semibold text-gray-800 text-md leading-snugish">
          {role}{' '}
          {link && (
            <>
              |{' '}
              <Link target="_blank" href={link}>
                Link
              </Link>
            </>
          )}
        </h3>
        <p className="text-sm leading-normal text-gray-500">
          {from} &ndash; {to} | {nameOfCompany}
        </p>
      </header>
      <ul className="mt-2 list-disc list-inside text-gray-800 text-md">
        {toDoList.map((achievement, index) => (
          <li key={index} className="pt-1 text-justify">
            {achievement}
          </li>
        ))}
      </ul>
    </section>
  );
}
