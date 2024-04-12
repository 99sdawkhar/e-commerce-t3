import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Layout from "@/layout";
import { useEffect, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {

  const [mounted, setMounted] = useState(false);// quick fix for hydration issue
  useEffect(() => {
      setMounted(true)
  }, [])

  return mounted && (
    <div className={`font-sans ${inter.variable}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </div>
  );
};

export default api.withTRPC(MyApp);
