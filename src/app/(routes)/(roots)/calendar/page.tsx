"use client";
import { CalendarEl } from "@/app/components_Calendar/Calendar";
import { Tasklistsection } from "@/app/components_Calendar/Tasklistsection";
import { useScreenType } from "@/app/hooks/useScreenType";
import { Suspense } from "react";

export default function Calendar() {
  const screenType = useScreenType();

  return (
    <div className="flex flex-col lg:flex-row  h-full w-full">
      <div className=" flex h-full flex-col overflow-y-auto ">
        <Suspense>
        <CalendarEl />
        </Suspense>
      </div>

      {screenType === "desktop" && (
        <div className="flex h-full w-[260px]  ml-auto flex-shrink-0">
          <Tasklistsection />
        </div>
      )}
    </div>
  );
}


