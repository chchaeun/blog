import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>개발새발</title>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico"></link>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
