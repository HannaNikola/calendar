"use client";
import { AddTodoButton } from "@/app/components_Task/AddTaskButton";
import { TaskList } from "@/app/components_Task/TaskList";
import { TooltipDesktop } from "@/app/shared/ui/Tooltip";
import { CircleCheck, Star } from "lucide-react";
import Link from "next/link";

export default function Task() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row gap-5 mb-4 justify-center">
        <TooltipDesktop content="All your favorite task">
          <Link
            href="/task/favorite"
            className="inline-flex hover:animate-pulse"
          >
            <Star size={20} className="fill-amber-300" />
          </Link>
        </TooltipDesktop>
        <TooltipDesktop content="All your completed task">
          <Link
            href="/task/completed"
            className="inline-flex hover:animate-pulse"
          >
            <CircleCheck size={20} />
          </Link>
        </TooltipDesktop>
      </div>

      <div className="flex w-full flex-col ml-3">
        <AddTodoButton />
        <TaskList />
      </div>
    </div>
  );
}
