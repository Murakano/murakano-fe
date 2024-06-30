import '@/styles/globals.css';
import BaseLayout from './base';

export default function App({ Component, pageProps }) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}
