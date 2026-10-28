"use client";

import EddEventButton from "./EddEventButton";
import { useScreenType } from "../hooks/useScreenType";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TooltipDesktop } from "../shared/ui/Tooltip";

type SmallCalendarProps = {
  mode: "calendar" | "task";
};

export default function SmallCalendar({ mode }: SmallCalendarProps) {
  const screenType = useScreenType();
  const { events } = useSelector((state: RootState) => state.eventData);
  const { todos } = useSelector((state: RootState) => state.todo);

  const renderDayContents = (day: number, date?: Date) => {
    if (!date) return <span>{day}</span>;

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const dayItems =
      mode === "calendar"
        ? events.filter((event) => {
            if (!event.start || !event.end) return false;
            const startDate = new Date(event.start as string | Date);
            return startDate >= dayStart && startDate <= dayEnd;
          })
        : todos.filter((todo) => {
            if (!todo.end) return false;
            const deadline = new Date(todo.end);
            return deadline >= dayStart && deadline <= dayEnd;
          });

    if (dayItems.length === 0) return <span>{day}</span>;

    const cellColor = mode === "task" ? "bg-[#DDF2D1]" : "bg-[#FFE4CC]";

    const dayContent = (
      <div
        className={`flex h-full w-full items-center justify-center rounded-md ${cellColor}`}
      >
        <span>{day}</span>
      </div>
    );

    if (mode === "task") {
      const tooltipContent = dayItems
        .map((todo) => {
          const deadline = todo.end
            ? new Date(todo.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return `<strong>${todo.title}</strong>${
            deadline ? `<br>Дедлайн: ${deadline}` : ""
          }`;
        })
        .join(
          "<hr style='border:none;border-top:1px solid #ddd;margin:4px 0' />",
        );

      return (
        <TooltipDesktop content={tooltipContent}>
          <div className="flex h-full w-full cursor-pointer items-center justify-center">
            {dayContent}
          </div>
        </TooltipDesktop>
      );
    }

    const tooltipContent = dayItems
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
        "<hr style='border:none;border-top:1px solid #ddd;margin:4px 0' />",
      );

    return (
      <TooltipDesktop content={tooltipContent}>
        <div className="flex h-full w-full cursor-pointer items-center justify-center">
          {dayContent}
        </div>
      </TooltipDesktop>
    );
    // );
  };

  return (
    <section className="flex w-full max-lg:flex-row-reverse lg:flex-col lg:max-w-[290px]">
      {screenType === "desktop" && (
        <div className=" flex mb-3 ">
          <EddEventButton />
        </div>
      )}

      {screenType === "desktop" && (
        <div className="w-[260px] h-[400px]">
          <DatePicker
            renderDayContents={renderDayContents}
            monthsShown={2}
            calendarClassName="mini-calendar"
            inline
          />
        </div>
      )}
    </section>
  );
}
