"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { useScreenType } from "../hooks/useScreenType";
import { LayoutContent } from "./LayoutContent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const screenType = useScreenType();

  return (
    <html lang="en" className="h-full w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="h-full w-full overflow-x-hidden flex flex-col">
        <Provider store={store}>
          <LayoutContent screenType={screenType}>{children}</LayoutContent>
        </Provider>
      </body>
    </html>
  );
}
