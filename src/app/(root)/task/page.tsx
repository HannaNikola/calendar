import { TaskList } from "@/app/components_Task/TaskList";
import { CircleCheck, Star } from "lucide-react";
import Link from "next/link";

export default function Task() {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-row gap-5 mb-3 justify-center">
        <Link href="/task/favorite">
          <Star className="fill-amber-300" />
        </Link>
        <Link href="/task/completed">
          <CircleCheck />
        </Link>
      </div>
    <div className="flex w-full flex-col lg:flex-row">
      <TaskList/>
      </div>
    </div>
  );
}
