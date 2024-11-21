import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import useStore from "@/helpers/store";
import { useEffect } from "react";
import Header from "@/components/dom/Header";
import Dom from "@/components/layout/dom";
import dynamic from "next/dynamic";
import "@/styles/index.css";
import AppWrapper from "@/components/dom/AppWrapper";

const Canvas = dynamic(() => import("@/components/layout/canvas"), {
  ssr: false,
});

function App({ Component, pageProps = { title: "index" } }: AppProps) {
  const router = useRouter();
  const { setRouter } = useStore();

  useEffect(() => {
    setRouter(router);
  }, [setRouter, router]);

  // Get the children from each page so we can split them
  //@ts-ignore
  const children = Component(pageProps).props.children;

  return (
    <AppWrapper>
      <Header title={pageProps.title} />
      <Dom>{children}</Dom>
    </AppWrapper>
  );
}

export default App;
