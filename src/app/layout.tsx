"use client";

import "./globals.css";
import "../app/api/interceptors";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "sonner";
import AuthInitializer from "./providers/AuthInitializer";

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
          <AuthInitializer>
          <Toaster
            duration={1200}
            position="top-center"
            toastOptions={{ className: "sonner-center" }}
          />
          {children}
          </AuthInitializer>
        </Provider>
      </body>
    </html>
  );
}





