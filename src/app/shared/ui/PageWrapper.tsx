import { PropsWithChildren } from "react";

interface IProps {
  className?: string;
}
export function PageWrapper({
  children,
  className,
}: PropsWithChildren<IProps>) {
  return (
    <div
      className={`flex w-full min-h-screen min-w-[375px] flex-col lg:flex-row px-3 py-2 bg-gray-light-background  ${className || ""}`}
    >
      {children}
    </div>
  );
}
