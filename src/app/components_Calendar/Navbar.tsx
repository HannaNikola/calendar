import Link from "next/link";
import { Cog } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import EddEventButton from "./EddEventButton";


type NavbarProps = {
  className?: string;
}



export const Navbar = ({ className }: NavbarProps) => {
  return (
    <section className="flex flex-col-reverse lg:flex-col ">
      <div className="w-full flex justify-center items-center mb-3 ">
        <EddEventButton/>
        </div>
    <ul className="flex flex-row lg:flex-col w-full lg:w-auto mb-[20px] gap-2 lg:mr-4">
  <li className="flex max-lg:flex-1 items-center px-2 py-2 lg:w-[260px] lg:px-4 bg-navbar-button hover:bg-navbar-button-hover rounded-sm shadow-sm transition-colors duration-300">
    <CalendarDays size={18} className="shrink-0" />
    <Link className="ml-2 text-main text-sm whitespace-nowrap truncate" href="/">
      Calendar
    </Link>
  </li>
  <li className="flex max-lg:flex-1 items-center px-2 py-2 lg:w-[260px] lg:px-4 bg-navbar-button hover:bg-navbar-button-hover rounded-sm shadow-sm transition-colors duration-300">
    <BookOpenCheck size={18} className="shrink-0" />
    <Link className="ml-2 text-main text-sm whitespace-nowrap truncate" href="/task">
      Your Task
    </Link>
  </li>
  <li className="flex max-lg:flex-1  items-center px-2 py-2 lg:w-[260px] lg:px-4 bg-navbar-button hover:bg-navbar-button-hover rounded-sm shadow-sm transition-colors duration-300">
    <Cog size={18} className="shrink-0" />
    <Link className="ml-2 text-main text-sm whitespace-nowrap truncate" href="/settings">
      Settings
    </Link>
  </li>
</ul>
    </section>
  );
};

export default Navbar;