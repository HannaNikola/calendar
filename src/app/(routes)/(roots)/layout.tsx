"use client";

import { useDispatch } from "react-redux";
import { AppDispatch, store } from "@/app/store/store";
import { useEffect } from "react";
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
    <LayoutWrapper>
      <LayoutContent screenType={screenType}>{children}</LayoutContent>
    </LayoutWrapper>
  );
}
