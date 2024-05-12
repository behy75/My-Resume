import React from 'react';
import { usePrintModeStore } from '@/store';
import { useSkills } from '@/store/useSkills';
import SkillsModal from './SkillsModal';

export default function Skills() {
  const { isPrintMode } = usePrintModeStore(state => state);
  const { skills } = useSkills(state => state);

  return (
    <section className="relative pb-6 mt-0 mb-4 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
      {!isPrintMode && <SkillsModal title="Skills" />}
      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
          SKILLS
        </h2>
        <section className="mb-0 break-inside-avoid">
          <section className="mt-1 last:pb-1">
            <ul className="flex flex-wrap -mb-1 font-bold leading-relaxed text-md -mr-1.6">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="p-1.5 mb-1 leading-relaxed mr-1.6 print:bg-white print:border-inset"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </section>
  );
}
