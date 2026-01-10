"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect } from "react";
import { fetchEventsApi } from "../../api/eventsApi";
import { fetchTodosApi } from "../../api/todoApi";
import { useScreenType } from "../../hooks/useScreenType";
import { LayoutContent } from "./LayoutContent";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const screenType = useScreenType();
  const { isAuthenticated, status } = useSelector(
    (state: RootState) => state.auth
  );

  // 🔐 Guard
  useEffect(() => {
    if (status === "succeeded" && !isAuthenticated) {
      router.replace("/login");
    }
  }, [status, isAuthenticated, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <LayoutWrapper>
      <LayoutContent screenType={screenType}>{children}</LayoutContent>
    </LayoutWrapper>
  );
}
