
import { TodoCompleted } from "@/app/components_Task/TodoCompleted";
import { BookOpenCheck, CircleCheck, Star } from "lucide-react";
import Link from "next/link";

export default function Completed() {
  return (
    <div className="w-full">
      <div className="flex justify-center gap-5 mt-2 ">
        <Link href="/task/favorite">
          <Star size={20} className="fill-amber-300"/>
        </Link>
        <Link href="/task/completed">
          <CircleCheck size={20} />
        </Link>
        <Link href="/task">
          <BookOpenCheck size={20} />
        </Link>
      </div>

      <div className="  flex w-full  flex-col items-center  py-10">
        <TodoCompleted />
      </div>
    </div>
  );
}
