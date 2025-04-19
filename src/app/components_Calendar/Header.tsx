import Image from "next/image";
import { LogOut } from "lucide-react";

export default function Header() {
  return (
    <div className=" h-[100px] flex w-full  bg-sky-200  py-5 px-5 shadow-sm">
      <div className="flex ml-auto items-center  ">
        <div className="flex w-[30px] h-[30px] mr-4 border-[1] border-gray-500  rounded-[50px] overflow-hidden ">
          <Image
            src="/woman.jpg"
            width={30}
            height={30}
            alt=""
            className="flex object-cover"
          />
        </div>
        <p className=" flex mr-20">autor@gmail.com</p>

        <button className="flex items-center transition-colors duration-500 hover:text-sky-400">
          Log out
          <LogOut size={15} className="ml-3" />
        </button>
      </div>
    </div>
  );
}
