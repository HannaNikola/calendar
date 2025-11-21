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
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TooltipDesktop } from "../shared/ui/Tooltip";


export const Navbar: FC<AdaptiveProps> = () => {
  const pathname = usePathname();
  const screenType = useScreenType();
  const { events } = useSelector((state: RootState) => state.eventData);

  const renderDayContents = (day: number, date?: Date) => {
    if (!date) return <span>{day}</span>;

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const dayEvents = events.filter((e) => {
      if (!e.start || !e.end) return false;

      const startDate = new Date(e.start as string | Date);
      return startDate >= dayStart && startDate <= dayEnd;
    });

    if (dayEvents.length === 0) return <span>{day}</span>;

    const tooltipContent = dayEvents
      .map((e) => {
        const start = e.start
          ? new Date(e.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";
        const end = e.end
          ? new Date(e.end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";
        return `<strong>${e.title}</strong><br>${start}–${end}`;
      })
      .join(
        "<hr style='border:none;border-top:1px solid #ddd;margin:4px 0' />"
      );

    return (
      <TooltipDesktop content={tooltipContent}>
        <div className="relative flex flex-col items-center justify-center cursor-pointer">
          <span>{day}</span>
          <span className="absolute bottom-1 w-1.5 h-1.5 bg-[#3788d8] rounded-full" />
        </div>
      </TooltipDesktop>
    );
  };

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

      </nav>
      {screenType === "desktop" && (
        <div className="w-[260px] mt-4 h-[400px]">
          <DatePicker
            // selected={selectedDate}
            renderDayContents={renderDayContents}
            monthsShown={2}
            calendarClassName="mini-calendar"
            inline
          />
        </div>
      )}
    </section>
  );
};

export default Navbar;









