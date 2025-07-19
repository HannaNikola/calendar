import Image from "next/image";
import { LogOut } from "lucide-react";

export default function Header() {
  
  return (
    <section className="w-full  bg-header-background">
    <div className="h-[70px] sm:h-[100px] flex  py-5 px-5 shadow-sm">
      <div className="flex ml-auto items-center  ">
        <div className="flex w-[30px] h-[30px] mr-4 border-[1] border-grey-border rounded-[50px] overflow-hidden ">
          <Image
            src="/woman.jpg"
            width={30}
            height={30}
            alt=""
            className="flex object-cover"
          />
        </div>
        <p className=" flex mr-20 text-main ">autor@gmail.com</p>

        <button className="flex items-center transition-colors duration-500 text-main   hover:text-sky-hover">
          Log out
          <LogOut size={15} className="ml-3" />
        </button>
      </div>
    </div>
    </section>
  );
}
