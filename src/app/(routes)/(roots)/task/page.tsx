"use client";
import { AddTodoButton } from "@/app/components_Task/AddTaskButton";
import { TaskList } from "@/app/components_Task/TaskList";
import TaskNavigation from "@/app/components_Task/TaskNavigation";

export default function Task() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row gap-5 mb-4 justify-center">
        <TaskNavigation />
      </div>

      <div className="flex w-full flex-col px-2">
        <AddTodoButton />
        <TaskList />
      </div>
    </div>
  );
}
