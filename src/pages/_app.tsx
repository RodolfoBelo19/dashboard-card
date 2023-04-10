import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import RequireAuth from "@/components/RequireAuth";
// import { AuthUserProvider } from '@/context/AuthUserContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <RequireAuth>
      <Component {...pageProps} />
    </RequireAuth>
  );
}

export default appWithTranslation(App);
