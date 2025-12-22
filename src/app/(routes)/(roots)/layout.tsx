"use client";

import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "@/app/store/store";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { fetchEventsApi } from "../../api/eventsApi";
import { fetchTodosApi } from "../../api/todoApi";
import { useScreenType } from "../../hooks/useScreenType";
import { LayoutContent } from "./LayoutContent";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEventsApi());
    dispatch(fetchTodosApi());
  }, [dispatch]);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const screenType = useScreenType();

  return (
    <Provider store={store}>
      <Toaster
        duration={1200}
        position="top-center"
        toastOptions={{ className: "sonner-center" }}
      />
      <LayoutWrapper>
        <LayoutContent screenType={screenType}>{children}</LayoutContent>
      </LayoutWrapper>
    </Provider>
  );
}
