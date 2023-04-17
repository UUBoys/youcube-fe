/* eslint-disable import/no-unresolved */
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "@/modules/common/components/NavBar";
import SidePanel from "@/modules/common/components/SidePanel";
import "@/modules/common/styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const DynamicUserSessionContextProvider = dynamic(
  () =>
    import("@/modules/contexts/userContext").then(
      (mod) => mod.UserSessionContextProvider
    ),
  { ssr: false }
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicUserSessionContextProvider>
        <NavBar />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex flex-row md:ml-64">
          <SidePanel />
          <Component {...pageProps} />
        </div>
      </DynamicUserSessionContextProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
