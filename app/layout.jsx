"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

import { Open_Sans } from "next/font/google";

import Header from "./(pages)/(root)/_components/Header/Header";
import Footer from "./(pages)/(root)/_components/Footer";
import Providers from "./providers";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { ToastContainer } from "react-toastify";
import { metadata } from "./config/metadata";
import ProgressBar from "./_components/ProgressBar";

const sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={`${sans.variable} font-sans antialiased`}>
          <Providers>
            <Header />
            <ToastContainer />
            <ProgressBar />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
