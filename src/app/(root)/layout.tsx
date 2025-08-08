"use client";

import Header from "@/app/components_Calendar/Header";
import "./globals.css";
import { PageWrapper } from "@/app/shared/PageWrapper";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import Navbar from "../components_Calendar/Navbar";
import Footer from "../components_Calendar/Footer";
import { useScreenType } from "../hooks/useScreenType";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const screenType = useScreenType();

  return (
    <html lang="en" className="h-full w-full">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>

      <body className="h-full w-full overflow-x-hidden flex flex-col ">
        <Provider store={store}>
          {/* <div className="mb-[60px] overflow-x-hidden"> */}
          <div className="mb-[60px]">
          <Header />
          </div>
           <main className="flex-1 overflow-y-auto  max:lg:pb-[80px]"> 
            <PageWrapper>
              {screenType === "desktop" && (
                <div className="max-lg:hidden">
                  <Navbar />
                </div>
              )}
              {children}
            </PageWrapper>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

