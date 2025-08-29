
import { TodoImportant } from "@/app/components_Task/TodoImportant";
import { BookOpenCheck, CircleCheck, Star } from "lucide-react";
import Link from "next/link";

export default function Favorite() {
  return (
    <div className="w-full ">
      <div className="flex  gap-5 mt-2 justify-center">
        <Link href="/task/favorit">
          <Star size={20} />
        </Link>
        <Link href="/task/completed">
          <CircleCheck size={20} />
        </Link>
        <Link href="/task">
          <BookOpenCheck size={20} />
        </Link>
      </div>

      <div className="  flex  flex-col items-center justify-center py-10">
        <TodoImportant />
      </div>
    </div>
  );
}
