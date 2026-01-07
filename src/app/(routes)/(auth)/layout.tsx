"use client";

import { PageWrapper } from "@/app/shared/ui/PageWrapper";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";
  const direction = isRegister ? 1 : -1;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };
  const transitionConfig: Transition = {
    type: "tween",
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.6,
  };

  return (
    <PageWrapper>
      <div className=" min-h-[100dvh] flex flex-col w-full px-3  py-2 items-center justify-center bg-gray-light-background">
        <div className="flex justify-between mb-4 w-[370px] shadow-[0_1px_0_rgba(0,0,0,0.1)]">
          <Link
            className={`flex text-h1 p-3 transition-all duration-300 ${isLogin ? "border-b-2 border-sky-200 text-sky-medium " : "border-none"}`}
            href="/login"
          >
            Login
          </Link>
          <Link
            className={` flex text-h1 p-3 transition-all duration-300 ${isRegister ? "border-b-2 border-sky-200 text-sky-medium " : "border-none"}`}
            href="register"
          >
            Register
          </Link>
        </div>
        <div className="relative  overflow-hidden w-[370px] ">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={pathname}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transitionConfig}
              className="flex items-center justify-center w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
