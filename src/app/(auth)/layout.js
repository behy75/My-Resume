// app/layout.js
'use client';

export default function RootLayout({ children }) {
  return (
    <div className="flex justify-center items-center h-[100vh]">{children}</div>
  );
}
