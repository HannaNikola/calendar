"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthRedirectListener() {
  const router = useRouter();

  useEffect(() => {
    const handleLoginRequired = () => {
      router.push("/login");
    };

    window.addEventListener("auth:login-required", handleLoginRequired);

    return () => {
      window.removeEventListener("auth:login-required", handleLoginRequired);
    };
  }, [router]);

  return null;
}
