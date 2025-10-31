"use client";

import "./globals.css";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "@/app/store/store";
import { useScreenType } from "../hooks/useScreenType";
import { LayoutContent } from "./LayoutContent";
import { useEffect } from "react";
import { fetchEventsApi } from "../api/eventsApi";
import { fetchTodosApi } from "../api/todoApi";



const LayoutWrapper =({children}: {children: React.ReactNode})=>{
  const dispatch = useDispatch<AppDispatch>();

useEffect(()=>{
  dispatch(fetchEventsApi())
  dispatch(fetchTodosApi());
},[dispatch])

return  <>{children}</>
}


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
         <LayoutWrapper>
          <LayoutContent screenType={screenType}>{children}</LayoutContent>
          </LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}

