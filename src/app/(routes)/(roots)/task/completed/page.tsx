"use client";
import TaskNavigation from "@/app/components_Task/TaskNavigation";
import { TodoCompleted } from "@/app/components_Task/TodoCompleted";

export default function Completed() {
  return (
    <div className="w-full">
      <div className="flex justify-center gap-5 mt-2 ">
        <TaskNavigation />
      </div>

      <div className="flex w-full  flex-col items-center py-10 px-2">
        <TodoCompleted />
      </div>
    </div>
  );
}





