import Image from "next/image";
import { LogOut } from "lucide-react";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";




export default function Header() {
  const query = useSelector((state: RootState) => state.filter.query);
  const isFocused = useSelector((state: RootState) => state.filter.isFocused);

  const shouldHide = isFocused || query.length > 0;
  return (
     <section className="w-full h-[60px] fixed top-0 left-0  bg-header-background z-50 shadow-sm"> 
      <div className=" flex  py-3 px-3  ">
         <div className="flex ml-auto items-center justify-center w-full ">
          <Filter />
          {!shouldHide && (
            <>
              <div className="flex w-[40px] h-[30px] mx-2  md:mx-6 border-[1] border-grey-border rounded-[50px] overflow-hidden ">
                <Image
                  src="/woman.jpg"
                  width={30}
                  height={30}
                  alt=""
                  className="flex object-cover"
                />
              </div>
              <p className=" mr-4 text-main hidden  sm:block">
                autor@gmail.com
              </p>

              <button className="flex items-center w-[80px] whitespace-nowrap  transition-colors duration-500 text-main   hover:text-sky-hover">
                Log out
                <LogOut size={15} className="ml-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}






