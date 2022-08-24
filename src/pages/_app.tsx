import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout';
import { Provider } from 'react-redux';
import store from '@/stores/store';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { usePageLoading } from '@/hooks/usePreloading';
import Loading from '@/components/Loading';

function MyApp({ Component, pageProps }: AppProps) {
  const isPageLoading = usePageLoading();

  return (
    <Provider store={store}>
      <Layout>
        {isPageLoading && <Loading />}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
