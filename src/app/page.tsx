"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1>Do you have account?</h1>
      <div className="flex gap-4">
        <button onClick={() => router.push("/login")}>Login</button>
        <button onClick={() => router.push("/register")}>Register</button>
      </div>
    </div>
  );
}
