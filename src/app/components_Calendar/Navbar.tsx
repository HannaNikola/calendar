import Link from "next/link";
import { Cog } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { BookOpenCheck } from "lucide-react";


type NavbarProps = {
  className?: string;
}
export const Navbar = ({className}: NavbarProps) => {
  return (
    <section className="flex justify-center">
    <ul className=" lg:mr-15 flex  flex-col  w-[260px] mb-[40px] ">
      <li className=" flex  px-[40px] py-[5px] bg-sky-100 transition-colors duration-500 hover:bg-sky-200 rounded-sm mb-2 items-center shadow-sm">
        <CalendarDays size={20} />
        <Link className="ml-3" href="/">
          Calendar
        </Link>
      </li>
      <li className=" flex px-[40px] py-[5px] bg-sky-100 transition-colors duration-500 hover:bg-sky-200 rounded-sm mb-2 items-center shadow-sm">
        <BookOpenCheck size={20} />
        <Link className="ml-3" href="/task">
          Your Task
        </Link>
      </li>
      <li className=" flex  bg-sky-100  px-[40px] py-[5px] transition-colors duration-500 hover:bg-sky-200 rounded-sm items-center shadow-sm">
        <Cog size={20} />
        <Link className="ml-3" href="/task">
          Settings
        </Link>
      </li>
    </ul>
    </section>
  );
};
export default Navbar;
