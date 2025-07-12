import "@/styles/global/globals.css";
import { useEffect, useState } from "react";
import Router from "next/router";
import Loading from "@/components/global/Loading";
import { Provider } from "react-redux";
import store from "@/store/Store";
import { CategoryProvider } from "@/components/CategoryContext";

function MyApp({ Component, pageProps, categories }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    setLoading(false);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <Provider store={store}>
      <CategoryProvider initialCategories={categories}>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </CategoryProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps =
    (await appContext.Component.getInitialProps?.(appContext.ctx)) || {};

  const res = await fetch("https://abazarak.ir/api/categories/");
  const categories = await res.json();

  return { ...appProps, categories };
};

export default MyApp;
