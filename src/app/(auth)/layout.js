// app/layout.js
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout(props) {
  const { children } = props;
  const pathname = usePathname(); // Get the current route
  const pageIsRegister = pathname.includes('register');

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <section className="max-w-3xl mx-auto bg-gray-100 rounded-2xl border-4 border-gray-700 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:h-letter lg:h-letter">
        <ToastContainer
          autoClose={2000}
          closeButton={true}
          style={{ width: '400px' }}
        />

        <div
          className={`flex bg-gray-700 flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[60vh] 
          ${pageIsRegister ? 'h-[70vh]' : 'h-[60vh]'}`}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
              {`Sign ${pageIsRegister ? 'up' : 'in'} to your account`}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              {children}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
