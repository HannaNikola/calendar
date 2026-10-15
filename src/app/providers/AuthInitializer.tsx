"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchCurrentUser } from "../api/authApi";
import { useRouter, usePathname } from "next/navigation";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/login") return;

    let cancelled = false;

    dispatch(fetchCurrentUser())
      .unwrap()
      .catch(() => {
        if (!cancelled) {
          router.replace("/login");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dispatch, router, pathname]);

  return <>{children}</>;
}
