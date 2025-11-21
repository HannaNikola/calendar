"use client";

import Link from "next/link";
import { Cog } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import EddEventButton from "./EddEventButton";
import { AdaptiveProps } from "../types/typesAdaptive";
import { usePathname } from "next/navigation";
import { useScreenType } from "../hooks/useScreenType";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TooltipDesktop } from "../shared/ui/Tooltip";

export default function Navbar({
  type,
  position,
  onSettingsClick,
}: AdaptiveProps) {
  const pathname = usePathname();
  const screenType = useScreenType();
  const { events } = useSelector((state: RootState) => state.eventData);



  return (
  
    <div className="flex w-full justify-between gap-2 ">
      <nav className="flex w-full gap-2 ">
        <Link
          href="/calendar"
          className="flex max-xl:flex-1 items-center px-2 py-2 md:h-[40px]  sm:px-4 sm:bg-navbar-button sm:hover:bg-navbar-button-hover  sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300"
        >
          <CalendarDays size={18} className="shrink-0 ml-1" />
          <span className="max-sm:hidden ml-2 text-main text-sm whitespace-nowrap">
            Calendar
          </span>
        </Link>

        <Link
          href="/task"
           className="flex max-xl:flex-1 items-center px-2 py-2 md:h-[40px]  sm:px-4 sm:bg-navbar-button sm:hover:bg-navbar-button-hover sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300"
          
        >
          <BookOpenCheck size={18} className="shrink-0 ml-1" />
          <span className=" max-sm:hidden ml-2 text-main text-sm whitespace-nowrap ">
            Your Task
          </span>
        </Link>
      </nav>
      <TooltipDesktop content="Settings">
        <button
          onClick={onSettingsClick}
          className="flex max-xl:flex-1 items-center px-2 py-2 md:h-[40px]  sm:px-4 sm:bg-navbar-button sm:hover:bg-navbar-button-hover sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300"
        >
          <Cog size={18} />
          <span className=" max-sm:hidden ml-2 text-main text-sm whitespace-nowrap ">
            Settings
          </span>
        </button>
      </TooltipDesktop>
      {(screenType === 'mobail' ||  screenType === 'tablet') && (
         <div  className="flex max-xl:flex-1 items-center px-2 py-2 md:h-[40px]  sm:px-4 sm:bg-grey-button sm:hover:bg-gray-hover sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300">
                <EddEventButton />
              </div>
      )}
    </div>
  );
}
