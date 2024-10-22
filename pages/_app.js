import TokyoState from '@/src/Context.js';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <TokyoState>
      <Component {...pageProps} />
      <Analytics />
    </TokyoState>
  );
}
