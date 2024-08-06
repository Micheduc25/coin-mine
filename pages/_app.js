import Layout from "../components/layout";
import "../styles/index.css";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import React, { useRef } from "react";

import { NotificationProvider } from "@/contexts/NotificationContext";

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <NotificationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </Provider>
  );
}

export default MyApp;
