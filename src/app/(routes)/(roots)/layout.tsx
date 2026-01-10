"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect } from "react";
import { fetchEventsApi } from "../../api/eventsApi";
import { fetchTodosApi } from "../../api/todoApi";
import { useScreenType } from "../../hooks/useScreenType";
import { LayoutContent } from "./LayoutContent";


const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, status } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (status === "succeeded" && isAuthenticated) {
      dispatch(fetchEventsApi());
      dispatch(fetchTodosApi());
    }
  }, [status, isAuthenticated, dispatch]);

  return <>{children}</>;
};

export default function PrivateLayout({
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
