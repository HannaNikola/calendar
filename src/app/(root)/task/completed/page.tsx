"use client";
import { TodoCompleted } from "@/app/components_Task/TodoCompleted";
import { BookOpenCheck, CircleCheck, Star } from "lucide-react";
import Link from "next/link";
import tippy from "tippy.js";

export default function Completed() {
  return (
    <div className="w-full">
      <div className="flex justify-center gap-5 mt-2 ">
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
        <Link
          href="/task"
          ref={(el) => {
            if (el)
              tippy(el, {
                content: "All your task",
                theme: "gray",
                arrow: false,
                inertia: true,
                duration: 200,
                animation: "fade",
              });
          }}
          className="inline-flex hover:animate-pulse"
        >
          <BookOpenCheck size={20} />
        </Link>
      </div>

      <div className="  flex w-full  flex-col items-center  py-10">
        <TodoCompleted />
      </div>
    </div>
  );
}
