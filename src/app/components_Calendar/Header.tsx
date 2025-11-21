import Filter from "./Filter";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { usePathname } from "next/navigation";
import { useScreenType } from "../hooks/useScreenType";
import Navbar from "./Navbar";
import { AdaptiveProps } from "../types/typesAdaptive";

export default function Header({ onSettingsClick }: AdaptiveProps) {
  const query = useSelector((state: RootState) => state.filter.query);
  const isFocused = useSelector((state: RootState) => state.filter.isFocused);
  const screenType = useScreenType();
  const pathname = usePathname();

  const shouldHide = isFocused || query.length > 0;
  return (
    <section className="w-full h-[60px] fixed top-0 left-0  bg-header-background z-50 shadow-sm">
      <div className=" flex  py-3 px-3  ">
        <div className="flex ml-auto items-center justify-center w-full ">
          {(pathname.startsWith("/calendar") ||
            pathname.startsWith("/task")) && <Filter />}
          {!shouldHide && (
            <>
              {screenType === "desktop" && (
                <div className="ml-2">
                  <Navbar type={screenType} onSettingsClick={onSettingsClick} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
