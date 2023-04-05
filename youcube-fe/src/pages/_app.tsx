/* eslint-disable import/no-unresolved */
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import "@/modules/common/styles/globals.css";
import SidePanel from "@/modules/common/components/SidePanel";
import NavBar from "@/modules/common/components/NavBar";

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
      <NavBar />
      <div className="flex flex-row ml-64">
        <SidePanel />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
};

export default MyApp;
