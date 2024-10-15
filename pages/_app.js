import TokyoState from '@/src/Context.js';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <TokyoState>
      <Component {...pageProps} />
    </TokyoState>
  );
}
