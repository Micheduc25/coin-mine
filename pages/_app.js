import Layout from "../components/layout";
import "../styles/index.css";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
