import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Head>
          <title>FairShift</title>
          <meta name="description" content="FairShift" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="main">
          <div className="container">
            <Component {...pageProps} />
          </div>
        </main>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
