/* eslint-disable import/no-unresolved */
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import "@/modules/common/styles/globals.css";
import { UserSessionContextProvider } from "@/modules/contexts/userContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSessionContextProvider>
        <Component {...pageProps} />
      </UserSessionContextProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
