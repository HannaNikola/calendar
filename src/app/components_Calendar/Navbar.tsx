import Link from "next/link";
import { Cog } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import EddEventButton from "./EddEventButton";




export const Navbar = () => {
  return (
    <section className="flex flex-col-reverse  lg:flex-col ">
      <div className="w-full flex max-lg:justify-center max-lg:items-center mb-3 ">
        <EddEventButton />
      </div>
     <ul className="flex flex-row lg:flex-col w-full lg:w-auto mb-[20px] gap-2 lg:mr-4">
  <Link href="/" className="flex max-lg:flex-1 items-center lg:w-[260px] lg:px-4 bg-navbar-button hover:bg-navbar-button-hover rounded-sm shadow-sm transition-colors duration-300">
    <CalendarDays size={18} className="shrink-0 ml-2" />
    <span className="ml-2 text-main text-sm whitespace-nowrap truncate px-2 py-2">Calendar</span>
  </Link>
  
  <Link href="/task" className="flex max-lg:flex-1 items-center lg:w-[260px] lg:px-4 bg-navbar-button hover:bg-navbar-button-hover rounded-sm shadow-sm transition-colors duration-300">
    <BookOpenCheck size={18} className="shrink-0 ml-2" />
    <span className="ml-2 text-main text-sm whitespace-nowrap truncate px-2 py-2">Your Task</span>
  </Link>
  
  <Link href="/settings" className="flex max-lg:flex-1 items-center px-2 py-2 lg:w-[260px] lg:px-4 bg-navbar-button hover:bg-navbar-button-hover rounded-sm shadow-sm transition-colors duration-300">
    <Cog size={18} className="shrink-0 ml-2" />
    <span className="ml-2 text-main text-sm whitespace-nowrap truncate">Settings</span>
  </Link>
</ul>
    </section>
  );
};

export default Navbar;
