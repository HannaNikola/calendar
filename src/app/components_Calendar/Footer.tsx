
import { AdaptiveProps } from "../types/typesAdaptive";
import Navbar from "./Navbar";
import { useScreenType } from "../hooks/useScreenType";

export default function Footer  ({ onSettingsClick }: AdaptiveProps)  {
  const screenType = useScreenType();


 return (
    <>
    
      {(screenType === "mobail" || screenType === "tablet") && (
        <footer className="w-full fixed bottom-0 left-0 right-0 h-[80px] bg-header-background z-10 shadow-sm">
          <section>
      <div className="  flex items-center justify-between py-3 px-3  ">
        <Navbar type={screenType}  onSettingsClick={onSettingsClick} />
      </div>
      </section>
    </footer >
      )}
    </>
  );
};


