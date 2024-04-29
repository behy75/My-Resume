import React from 'react';
import Link from 'next/link';

export default function SocialNetwork(props) {
  const { name, socialNetworkLink, displayName } = props;
  return (
    <li className="mt-1 leading-normal text-black text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md print:">
      <div className="group">
        <span className="mr-2 text-lg font-semibold text-gray-700 leading-snugish">
          {name}:
        </span>
        <Link target="_blank" href={socialNetworkLink}>
          {displayName}
        </Link>
        <span className="inline-block font-normal text-black text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black print:">
          ↗
        </span>
      </div>
    </li>
  );
}
