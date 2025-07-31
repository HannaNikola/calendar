import Image from "next/image";
import { LogOut } from "lucide-react";
import Filter from "./Filter";

export default function Header() {
  
  return (
  <section className="w-full  bg-header-background">
    <div className="h-[60px] sm:h-[80px] flex  py-3 px-3 sm:py-5 sm:px-5 shadow-sm w-full">
      <div className="flex ml-auto items-center justify-center w-full ">
        < Filter/>
        <div className="flex w-[30px] h-[30px] mx-6 border-[1] border-grey-border rounded-[50px] overflow-hidden ">
          <Image
            src="/woman.jpg"
            width={30}
            height={30}
            alt=""
            className="flex object-cover"
          />
        </div>
        <p className=" flex mr-4 text-main ">autor@gmail.com</p>

        <button className="flex items-center w-[80px] whitespace-nowrap  transition-colors duration-500 text-main   hover:text-sky-hover">
          Log out
          <LogOut size={15} className="ml-3" />
        </button>
      </div>
    </div>
    </section>
  );
}
