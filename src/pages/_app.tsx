import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Layout from "@/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`font-sans ${inter.variable}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
};

export default api.withTRPC(MyApp);
