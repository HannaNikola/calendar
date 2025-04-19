import Link from "next/link";
import { Cog } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { BookOpenCheck } from "lucide-react";

export const Navbar = () => {
  return (
    <ul className="mr-15 flex flex-col w-[220px] py-[5px] px-[5px] mb-[40px] ">
      <li className=" flex  px-[40px] py-[5px] bg-sky-100 transition-colors duration-500 hover:bg-sky-200 rounded-sm mb-2 items-center shadow-sm">
        <CalendarDays size={20} />
        <Link className="ml-2" href="/">
          Calendar
        </Link>
      </li>
      <li className=" flex px-[40px] py-[5px] bg-sky-100 transition-colors duration-500 hover:bg-sky-200 rounded-sm mb-2 items-center shadow-sm">
        <BookOpenCheck size={20} />
        <Link className="ml-2" href="/task">
          Your Task
        </Link>
      </li>
      <li className=" flex  bg-sky-100  px-[40px] py-[5px] transition-colors duration-500 hover:bg-sky-200 rounded-sm items-center shadow-sm">
        <Cog size={20} />
        <Link className="ml-2" href="/task">
          Settings
        </Link>
      </li>
    </ul>
  );
};
export default Navbar;
