import Link from "next/link";
import { Cog } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { BookOpenCheck } from "lucide-react";


type NavbarProps = {
  className?: string;
}


// export const Navbar = ({className}: NavbarProps) => {
//   return (
//     <section className="flex  justify-center">
//     <ul className="flex lg:mr-8 lg:flex-col  mb-[20px] ">
//       <li className=" flex px-[5px]  py-[5px] mb-2 mr-1 lg:w-[260px] lg:pl-[40px] lg:pr-[120px] items-center bg-navbar-button transition-colors duration-500 hover:bg-navbar-button-hover rounded-sm shadow-sm">
//         <CalendarDays size={20} />
//         <Link className="ml-3 text-main" href="/">
//           Calendar
//         </Link>
//       </li>
//       <li className=" flex px-[5px]  py-[5px] mb-2 mr-1 lg:w-[260px] lg:pl-[40px] lg:pr-[120px] items-center bg-navbar-button transition-colors duration-500 hover:bg-navbar-button-hover rounded-sm shadow-sm">
//         <BookOpenCheck size={20} />
//         <Link className="ml-3 text-main" href="/task">
//           Your Task
//         </Link>
//       </li>
//       <li className=" flex px-[5px]  py-[5px] mb-2 mr-1 lg:w-[260px] lg:pl-[40px] lg:pr-[120px] items-center bg-navbar-button  transition-colors duration-500 hover:bg-navbar-button-hover rounded-sm  shadow-sm">
//         <Cog size={20} />
//         <Link className="ml-3 text-main" href="/settings">
//           Settings
//         </Link>
//       </li>
//     </ul>
//     </section>
//   );
// };
// export default Navbar;





export const Navbar = ({ className }: NavbarProps) => {
  return (
    <section className={`flex justify-center ${className}`}>
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