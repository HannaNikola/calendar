"use client";

import Header from "@/app/components_Calendar/Header";
import "./globals.css";
import { PageWrapper } from "@/app/shared/PageWrapper";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import Navbar from "../components_Calendar/Navbar";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header/>
          <PageWrapper>
            <Navbar/>
            {children}
          </PageWrapper>
        </Provider>
      </body>
    </html>
  );
}


