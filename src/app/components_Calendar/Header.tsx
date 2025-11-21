"use client";
import { Cog, LogOut } from "lucide-react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { usePathname } from "next/navigation";
import { useScreenType } from "../hooks/useScreenType";
import { TooltipDesktop } from "../shared/ui/Tooltip";




export default function Header ({ onSettingsClick }: { onSettingsClick: () => void }) {
  const query = useSelector((state: RootState) => state.filter.query);
  const isFocused = useSelector((state: RootState) => state.filter.isFocused);
  const screenType = useScreenType();
  const pathname = usePathname();

  const shouldHide = isFocused || query.length > 0;
  return (
    <section className="w-full h-[60px] fixed top-0 left-0  bg-header-background z-50 shadow-sm">
      <div className=" flex  py-3 px-3  ">
        <div className="flex ml-auto items-center justify-center w-full ">
          {(pathname.startsWith("/calendar") ||
            pathname.startsWith("/task")) && <Filter />}
          {!shouldHide && (
            <>
              {screenType === "desktop" && (
                <p className=" mr-4 ml-3 text-main hidden sm:block">
                  author@gmail.com
                </p>
              )}
              <TooltipDesktop content="Settings">
                <button onClick={onSettingsClick}>
                  <Cog size={18} className="shrink-0 mr-3" />
                </button>
              </TooltipDesktop>
              <button className="flex items-center w-[80px] whitespace-nowrap  transition-colors duration-500 text-main   hover:text-sky-hover">
                Log out
                <LogOut size={15} className="ml-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

