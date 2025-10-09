"use client";
import { TodoImportant } from "@/app/components_Task/TodoImportant";
import { TooltipDesktop } from "@/app/shared/ui/Tooltip";
import { BookOpenCheck, CircleCheck, Star } from "lucide-react";
import Link from "next/link";
import tippy from "tippy.js";

export default function Favorite() {
  return (
    <div className="w-full ">
      <div className="flex  gap-5 mt-2 justify-center">
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
        <TooltipDesktop content="All your task">
          <Link href="/task" className="inline-flex hover:animate-pulse">
            <BookOpenCheck size={20} />
          </Link>
        </TooltipDesktop>
      </div>

      <div className="  flex  flex-col items-center justify-center py-10">
        <TodoImportant />
      </div>
    </div>
  );
}
