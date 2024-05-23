'use client';
import React, { useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import AnimatedCursor from 'react-animated-cursor';
import { AnimatePresence } from 'framer-motion';
import { usePrintModeStore, useUserLoggedIn } from '@/store';
import PersonalInformation from './PersonalInformation';
import ContactInformation from './ContactInformation';
import Summary from './Summary';
import Education from './Education';
import Experiences from './Experiences';
import Skills from './Skills';
import Header from './Header';
import { notifySuccess } from '../Common/Notify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProtectedToken } from '@/app/hooks/useVerification';

export default function ResumeBuilder() {
  const containerRef = useRef();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isPrintMode } = usePrintModeStore(state => state);
  const { loginMessage, isLogin } = useUserLoggedIn(state => state);
  const authenticationToken = useProtectedToken();
  const { tokenIsProtected } = queryClient.getQueryData('protected');

  useEffect(() => {
    if (isLogin) {
      notifySuccess(loginMessage);
    }
    if (!tokenIsProtected) {
      router.push('/login');
    }
  }, []);

  return (
    <AnimatePresence>
      <>
        <ToastContainer
          autoClose={2000}
          closeButton={true}
          style={{ width: '400px' }}
        />
        {!isPrintMode && (
          <AnimatedCursor
            innerSize={8}
            outerSize={8}
            color="193, 11, 111"
            outerAlpha={0.2}
            innerScale={0.7}
            outerScale={10}
            clickables={[
              'h1',
              {
                target: '.custom',
                options: {
                  innerSize: 12,
                  outerSize: 12,
                  color: '255, 255, 255',
                  outerAlpha: 0.3,
                  innerScale: 0.7,
                  outerScale: 5,
                },
              },
            ]}
          />
        )}
        <Header containerRef={containerRef} />
        <section
          ref={containerRef}
          className="p-3 my-auto mx-auto max-w-3xl bg-gray-100 rounded-2xl border-4 border-gray-700 sm:p-9 md:p-16 lg:mt-6 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:max-w-letter md:h-letter lg:h-letter"
        >
          {/* Name */}
          <PersonalInformation />

          {/* Column */}
          <section className="col-gap-8 print:col-count-2 print:h-letter-col-full col-fill-balance md:col-count-2 md:h-letter-col-full">
            {/* Contact Information */}
            <ContactInformation />
            {/* Summary */}
            <Summary />
            {/* Education */}
            <Education />
            {/* Experience */}
            <Experiences />
            {/* Skills */}
            <Skills />
          </section>
        </section>
      </>
    </AnimatePresence>
  );
}
