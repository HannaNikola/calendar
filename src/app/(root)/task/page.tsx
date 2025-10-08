"use client";
import { TaskList } from "@/app/components_Task/TaskList";
import { CircleCheck, Star } from "lucide-react";
import Link from "next/link";
import tippy from "tippy.js";

export default function Task() {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-row gap-5 mb-3 justify-center">
        <Link
          href="/task/favorite"
          ref={(el) => {
            if (el)
              tippy(el, {
                content: "All your favorite task",
                theme: "gray",
                arrow: false,
                inertia: true,
                duration: 200,
                animation: "fade",
              });
          }}
          className="inline-flex hover:animate-pulse"
        >
          <Star size={20} className="fill-amber-300" />
        </Link>
        <Link
          href="/task/completed"
          ref={(el) => {
            if (el)
              tippy(el, {
                content: "All your completed task",
                theme: "gray",
                arrow: false,
                inertia: true,
                duration: 200,
                animation: "fade",
              });
          }}
          className="inline-flex hover:animate-pulse"
        >
          <CircleCheck size={20} />
        </Link>
      </div>
      <div className="flex w-full flex-col lg:flex-row">
        <TaskList />
      </div>
    </div>
  );
}
