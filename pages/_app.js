import TokyoState from "@/src/Context.js";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { AdminAuthProvider } from "../src/contexts/AdminAuthContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <AdminAuthProvider>
        <Component {...pageProps} />
      </AdminAuthProvider>
    );
  }

  return (
    <TokyoState>
      <Component {...pageProps} />
      <Analytics />
      <Toaster position="bottom-center" />
    </TokyoState>
  );
}
