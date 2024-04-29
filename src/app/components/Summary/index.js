import React from 'react';
import IndividualProfile from '../../Individual_profile.json';
import Typical from 'react-typical';
const { summary } = IndividualProfile;

export default function Summary() {
  const summaryArray = summary.split(/[,.]/);
  var newArray = [];

  for (var i = 0; i < summaryArray.length; i++) {
    newArray.push(summaryArray[i]);
    if (i < summaryArray.length - 1) {
      newArray.push(1000);
    }
  }

  return (
    <section className="pb-2 pb-4 mt-0 border-b-4 border-gray-300 first:mt-0">
      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <h2 className="mb-2 text-xl font-bold tracking-widest text-gray-700 print:font-normal">
          SUMMARY
        </h2>
        <section className="mb-2 break-inside-avoid">
          <p className="mt-2 leading-normal text-gray-700 text-md text-justify">
            <Typical steps={newArray} loop={Infinity} wrapper="a" />
          </p>
        </section>
      </section>
    </section>
  );
}
