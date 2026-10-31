"use client";

import { DateContent } from "@/app/components_Task/DateContent";
import TaskNavigation from "@/app/components_Task/TaskNavigation";


export default function Date() {
  return (
    <div className="w-full">
      <div className="flex justify-center gap-5 mt-2 ">
        <TaskNavigation />
      </div>
      <div className="flex w-full  flex-col items-center py-10 px-2">
        <DateContent />
      </div>
    </div>
  );
}
