import { useEffect, useState } from "react";
import { TypesAdaptive } from "../types/typesAdaptive";

export const useScreenType = (): TypesAdaptive => {
  const [screenType, setScreenType] = useState<TypesAdaptive>("desktop");

  useEffect(() => {
    const updateScreenType = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenType("mobail");
      } else if (width < 768) {
        return setScreenType("tablet");
      } else if (width < 1024) {
        setScreenType("tabletWide");
      } else {
        setScreenType("desktop");
      }
    };
    updateScreenType();
    window.addEventListener("resize", updateScreenType);

    return () => window.removeEventListener("resize", updateScreenType);
  }, []);
  return screenType;
};
