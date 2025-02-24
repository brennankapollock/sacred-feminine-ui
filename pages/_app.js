import TokyoState from '@/src/Context.js';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <TokyoState>
      <Component {...pageProps} />
      <Analytics />
      <Toaster position="bottom-center" />
    </TokyoState>
  );
}
