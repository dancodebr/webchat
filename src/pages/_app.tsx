//app.tsx
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ContextProvider } from "@/Context/Context";


declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ContextProvider>
        <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </ContextProvider>
   
  );
}