// app/layout.js
'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <main className="font-jost hyphens-manual">
            {children}
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
