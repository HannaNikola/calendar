"use client";

import "./globals.css";
import "../app/api/interceptors";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthRedirectListener from "./components_auth/AuthRedirectListener";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full ">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="h-full w-full overflow-x-hidden flex flex-col items-center justify-center">
        <Provider store={store}>
          <AuthRedirectListener />
          <Toaster
            position="bottom-right"
            gutter={12}
            containerStyle={{
              bottom: 24,
              right: 24,
            }}
          />

          {children}
        </Provider>
      </body>
    </html>
  );
}
