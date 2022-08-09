import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { Provider } from "react-redux";
import store from "@/stores/store";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
