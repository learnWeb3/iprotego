import { NextPage } from "next";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ComponentType, ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

export type MyAppProps = AppProps & {
  Component: Page;
};

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
