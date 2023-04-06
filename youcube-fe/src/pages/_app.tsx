/* eslint-disable import/no-unresolved */
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import "@/modules/common/styles/globals.css";
import SidePanel from "@/modules/common/components/SidePanel";
import NavBar from "@/modules/common/components/NavBar";
import { UserSessionContextProvider } from "@/modules/contexts/userContext";
import dynamic from "next/dynamic";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const DynamicUserSessionContextProvider = dynamic(
  () => import("@/modules/contexts/userContext").then((mod) => mod.UserSessionContextProvider),
  { ssr: false }
);


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicUserSessionContextProvider>
        <NavBar />
        <div className="flex flex-row md:ml-64">
          <SidePanel />
          <Component {...pageProps} />
        </div>
      </DynamicUserSessionContextProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
