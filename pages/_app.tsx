import "../styles/global.scss";
import type { AppProps } from "next/app";
import AuthUpdate from "../sys/firebase/components/AuthUpdater";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthUpdate />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
