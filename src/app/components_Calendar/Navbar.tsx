"use client";

import Link from "next/link";
import { Cog } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import EddEventButton from "./EddEventButton";
import { AdaptiveProps } from "../types/typesAdaptive";
import { useScreenType } from "../hooks/useScreenType";
import { usePathname } from "next/navigation";

export default function Navbar({ onSettingsClick }: AdaptiveProps) {
  const screenType = useScreenType();
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive = pathname.startsWith(href);
    return `flex max-xl:flex-1 items-center px-2 py-2 md:h-[40px]  
       sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300 ${isActive ? "bg-grey-button" : "bg-navbar-button hover:bg-navbar-button-hover"} 
      `;
  };
  return (
    <div className="flex w-full justify-between gap-2">
      <nav className="flex w-full gap-2 ">
        <Link href="/calendar" className={getLinkClass("/calendar")}>
          <CalendarDays size={18} className="shrink-0 ml-1" />
          <span className="max-sm:hidden ml-2 text-main text-sm whitespace-nowrap">
            Calendar
          </span>
        </Link>

        <Link href="/task" className={getLinkClass("/task")}>
          <BookOpenCheck size={18} className="shrink-0 ml-1" />
          <span className=" max-sm:hidden ml-2 text-main text-sm whitespace-nowrap ">
            Your Task
          </span>
        </Link>
      </nav>
      <button
        onClick={onSettingsClick}
        className="flex max-xl:flex-1 items-center px-2 py-2 md:h-[40px] sm:px-4 sm:bg-navbar-button
            sm:hover:bg-navbar-button-hover sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300"
      >
        <Cog size={18} />
        <span className=" max-sm:hidden ml-2 text-main text-sm whitespace-nowrap ">
          Settings
        </span>
      </button>
      {(screenType === "mobail" || screenType === "tablet") && (
        <div className="flex max-xl:flex-1 items-center px-2 py-2 md:h-[40px]  sm:px-4 sm:bg-grey-button sm:hover:bg-gray-hover sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300">
          <EddEventButton />
        </div>
      )}
    </div>
  );
}
