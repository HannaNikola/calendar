"use client";

import Header from "@/app/components_Calendar/Header";
import "./globals.css";
import { PageWrapper } from "@/app/shared/PageWrapper";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <PageWrapper>
          <Provider store={store}>{children}</Provider>
        </PageWrapper>
      </body>
    </html>
  );
}
