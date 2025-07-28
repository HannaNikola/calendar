import { FC } from "react";
import { AdaptiveProps } from "../types/typesAdaptive";
import Navbar from "./Navbar";
import { useScreenType } from "../hooks/useScreenType";

export const Footer: FC<AdaptiveProps> = () => {
  const screenType = useScreenType();

  return (
    <>
      {(screenType === "mobail" || screenType === "tablet") && (
        <section className="w-full fixed bottom-0 left-0 right-0 bg-header-background z-50">
      <div className="h-[80px] w-full flex items-center justify-between py-3 px-3 sm:py-5 sm:px-5 shadow-sm">
        <Navbar type="mobail" />
      </div>
    </section>
      )}
    </>
  );
};

export default Footer;
