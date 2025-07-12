import "@/styles/global/globals.css";
import { useEffect, useState } from "react";
import Router from "next/router";
import Loading from "@/components/global/Loading";
import { Provider } from "react-redux";
import store from "@/store/Store";

function App({ Component, pageProps }) {
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
      {loading ? <Loading /> : <Component {...pageProps} />}
    </Provider>
  );
}

export default App;
