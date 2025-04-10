import Link from "next/link";
import { Cog } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { BookOpenCheck } from "lucide-react";

export const Navbar = () => {
  return (
    <ul className="mr-15 flex flex-col">
      <li className=" flex w-[220px] px-[40px] py-[5px] bg-sky-100 transition-colors duration-500 hover:bg-sky-200 rounded-sm mb-2 items-center shadow-sm">
        <CalendarDays size={20} />
        <Link className="ml-2" href="/">
          Calendar
        </Link>
      </li>
      <li className=" flex w-[220px] px-[40px] py-[5px] bg-sky-100 transition-colors duration-500 hover:bg-sky-200 rounded-sm mb-2 items-center shadow-sm">
        <BookOpenCheck size={20} />
        <Link className="ml-2" href="/todo">
          Your Task
        </Link>
      </li>
      <li className=" flex bg-sky-100 w-[220px] px-[40px] py-[5px] transition-colors duration-500 hover:bg-sky-200 rounded-sm items-center shadow-sm">
        <Cog size={20} />
        <Link className="ml-2" href="/todo">
          Settings
        </Link>
      </li>
    </ul>
  );
};
export default Navbar;
