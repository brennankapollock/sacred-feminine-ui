import TokyoState from '@/src/Context';
import PreLoader from '@/src/layout/PreLoader';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <TokyoState>
      <Component {...pageProps} />
    </TokyoState>
  );
}
