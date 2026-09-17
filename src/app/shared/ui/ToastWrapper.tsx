import { ReactNode } from "react";

interface ToastWrapperProps {
  children: ReactNode;
}

export default function ToastWrapper({ children }: ToastWrapperProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10">
      <div
        className="
          w-[350px]
          rounded-xl
          bg-white
          p-5
          shadow-xl
          animate-[toastIn_0.25s_ease-out]
        "
      >
        {children}
      </div>
    </div>
  );
}
