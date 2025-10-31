"use client";
import Link from "next/link";
import { Cog } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import EddEventButton from "./EddEventButton";
import { AdaptiveProps } from "../types/typesAdaptive";
import { FC } from "react";
import { usePathname } from "next/navigation";
import { useScreenType } from "../hooks/useScreenType";


export const Navbar: FC<AdaptiveProps> = () => {
  const pathname = usePathname();
  const screenType = useScreenType();

  return (
    <section className="flex w-full max-lg:flex-row-reverse lg:flex-col lg:max-w-[290px]">
      <div className=" flex  lg:mb-3  ">
        <EddEventButton />
      </div>
      <nav className="flex flex-row w-full sm:gap-2 lg:w-auto lg:flex-col lg:mr-4">
        <Link
          href="/calendar"
          className="flex max-lg:flex-1 items-center px-2 py-2 max-lg:h-[40px] lg:w-[260px] lg:px-4 sm:bg-navbar-button sm:hover:bg-navbar-button-hover lg:rounded-sm sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300"
        >
          <CalendarDays size={18} className="shrink-0 ml-1" />
          <span className="max-sm:hidden ml-2 text-main text-sm whitespace-nowrap">
            Calendar
          </span>
        </Link>

        <Link
          href="/task"
          className="flex max-lg:flex-1 items-center px-2 py-2 max-lg:h-[40px] lg:w-[260px] lg:px-4 sm:bg-navbar-button sm:hover:bg-navbar-button-hover lg:rounded-sm sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300"
        >
          <BookOpenCheck size={18} className="shrink-0 ml-1" />
          <span className=" max-sm:hidden ml-2 text-main text-sm whitespace-nowrap ">
            Your Task
          </span>
        </Link>

        <Link
          href="/settings"
          className="flex max-lg:flex-1 items-center px-2 py-2 max-lg:h-[40px] lg:w-[260px]  lg:px-4 sm:bg-navbar-button sm:hover:bg-navbar-button-hover lg:rounded-sm  sm:rounded-4xl sm:shadow-sm sm:transition-colors sm:duration-300"
        >
          <Cog size={18} className="shrink-0 ml-1" />
          <span className="max-sm:hidden ml-2 text-main text-sm whitespace-nowrap ">
            Settings
          </span>
        </Link>
      </nav>
     
    </section>
  );
};

export default Navbar;





