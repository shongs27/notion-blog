import { Provider } from 'react-redux';
import store from '@/stores/store';

import '../styles/globals.scss';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import type { AppProps } from 'next/app';

import { usePageLoading } from '@/hooks/usePreloading';
import Loading from '@/components/Loading';
import Layout from '@/components/layout';

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
