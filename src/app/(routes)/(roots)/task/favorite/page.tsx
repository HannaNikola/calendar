"use client";
import TaskNavigation from "@/app/components_Task/TaskNavigation";
import { TodoImportant } from "@/app/components_Task/TodoImportant";

export default function Favorite() {
  return (
    <div className="w-full ">
      <div className="flex gap-5 mt-2 justify-center">
        <TaskNavigation />
      </div>

      <div className="  flex  flex-col items-center justify-center py-10 px-2">
        <TodoImportant />
      </div>
    </div>
  );
}
