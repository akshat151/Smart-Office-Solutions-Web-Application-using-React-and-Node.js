import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { CircularProgress, CssBaseline } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "../constants/routes";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const AuthWrapper: React.FC = ({ children }) => {
  const router = useRouter();

  let accessToken: string | null = null;
  const isLoginPage = ROUTES.login.includes(router.pathname);

  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("access_token");
  }

  useEffect(() => {
    if (isLoginPage) {
      if (accessToken) {
        localStorage.setItem("access_token", "");
        localStorage.setItem("role", "");
        localStorage.setItem("email", "");
      }
    } else {
      // else we redirect user to login page to reauthenticate
      if (!accessToken) {
        toast.error("Invalid Access. Please login.");
        router.push(ROUTES.login);
      }
    }
  }, [isLoginPage, accessToken, router]);

  // If access-token is present we render the children
  if (accessToken || isLoginPage) {
    return <>{children}</>;
  }

  return <CircularProgress />;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ToastContainer position="top-center" theme="dark" />
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
