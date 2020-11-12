import "../styles/globals.scss";
import "../styles/antd.custom.less";
import "../styles/rsuite.custom.less";
// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";

import ApolloProvider from "../context/apollo/ApolloProvider"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
