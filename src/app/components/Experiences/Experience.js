import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DropDownSymbol from '../customs/DropDownSymbol';
import { usePrintModeStore } from '@/store';

export default function Experience(props) {
  const { role, link, from, to, nameOfCompany, toDoList = [] } = props;
  const { isPrintMode } = usePrintModeStore(state => state);
  const [open, setOpen] = useState(false);

  const handleSetOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isPrintMode) {
      setOpen(true);
    }
  }, [isPrintMode]);

  return (
    <section className="mb-6 break-inside-avoid">
      <header>
        <div onClick={handleSetOpen} className="flex items-center">
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
          {!isPrintMode && <DropDownSymbol open={open} setOpen={setOpen} />}
        </div>

        <p className="text-sm leading-normal text-gray-500">
          {from} &ndash; {to} | {nameOfCompany}
        </p>
      </header>

      {open && (
        <ul className="mt-2 list-disc list-inside text-gray-800 text-md">
          {toDoList.map((achievement, index) => (
            <li key={index} className="pt-1 text-justify">
              {achievement}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
